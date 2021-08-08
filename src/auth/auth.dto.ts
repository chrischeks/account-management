import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, NotEquals } from 'class-validator';
import { ISignIn } from './auth.interface';

export class SignInDTO implements ISignIn {
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
