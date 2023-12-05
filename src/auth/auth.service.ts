import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/auth.schema';
import { compare, genSalt, hash } from 'bcryptjs';
import { Token } from './schemas/token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(Token.name) private TokenModel: Model<Token>,
    private readonly jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return this.UserModel.findOne({ email }).exec();
  }

  async saveAccessToken(userId: string, accessToken: string) {
    const tokenDocument = new this.TokenModel({
      _id: false,
      userId,
      accessToken,
    });

    await tokenDocument.save();
  }

  async validateUser(LoginDto: LoginDto): Promise<User> {
    const user = await this.findByEmail(LoginDto.email);
    if (!user) throw new UnauthorizedException('User not found');

    const isValidPassword = await compare(LoginDto.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async register(registerDto: RegisterDto) {
    const salt = await genSalt(10);
    const newUser = new this.UserModel({
      _id: new mongoose.Types.ObjectId(),
      name: registerDto.name,
      surname: registerDto.surname,
      email: registerDto.email,
      password: await hash(registerDto.password, salt),
      balance: { count: 0, currency: 'dollars' },
      activePresset: { namePresset: null },
    });

    const user = await newUser.save();
    const tokens = await this.issueTokenPair(String(user._id));
    await this.saveAccessToken(user._id, tokens.accessToken);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async changeUserRole(id: string, role: string) {
    const findUser = await this.UserModel.findByIdAndUpdate(
      { _id: id },
      {
        role: role,
      },
      { new: true },
    );
    return {
      user: findUser,
    };
  }

  async findUser(id: string) {
    const findUser = await this.UserModel.findById({ _id: id });
    return {
      user: findUser,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in!');

    const result = await this.jwtService.verifyAsync(refreshToken);

    if (!result) throw new UnauthorizedException('Invalid token or expired!');

    const user = await this.UserModel.findById(result._id);

    const tokens = await this.issueTokenPair(String(user._id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '15d',
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    });

    return { refreshToken, accessToken };
  }

  returnUserFields(UserModel: User) {
    return {
      _id: UserModel._id,
      name: UserModel.name,
      email: UserModel.email,
      role: UserModel.role,
      accepted: false,
    };
  }
}
