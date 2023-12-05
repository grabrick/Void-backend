import { Controller, Post, Body, Param, Patch, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/login')
  login(@Body() loginhDto: LoginDto) {
    return this.authService.login(loginhDto);
  }

  @Post('/login/access-token')
  getNewTokens(@Body() data: RefreshTokenDto) {
    return this.authService.getNewTokens(data);
  }

  @Patch('/changeRole/:id')
  changeRole(@Param('id') id: string, @Body('role') role: string) {
    return this.authService.changeUserRole(id, role);
  }

  @Get('/getUser/:id')
  getUser(@Param('id') id: string) {
    return this.authService.findUser(id);
  }
}
