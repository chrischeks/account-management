import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, Matches, NotEquals } from 'class-validator';
import { AccountTypes } from './customer.enum';
import { ICustomer, IAccountOpen, ISignIn } from './customer.interface';
const { monoSavings, ...accountTypesWithoutSavings } = AccountTypes;

export class CreateCustomerDTO implements ICustomer {
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/, {
    message:
      'Enter a password at least 8 characters long with at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
  })
  password: string;

  @IsString()
  @Length(4, 4)
  pin: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;
}

export class AccountOpenDTO implements IAccountOpen {
  @IsEnum(AccountTypes, { message: `accountType should be any of ${Object.values(accountTypesWithoutSavings)}` })
  @NotEquals(AccountTypes.monoSavings)
  readonly accountType: AccountTypes;
}

export class SignInDTO implements ISignIn {
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
