export class RegisterDto {
  readonly _id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly role: string;
  readonly password: string;
}

export class UserDto {
  readonly _id: string;
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly role: string;
  readonly password: string;
}

export class LoginDto {
  readonly email: string;
  readonly password: string;
}

export class RefreshTokenDto {
  readonly refreshToken: string;
}
