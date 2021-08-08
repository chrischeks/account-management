import { IsEnum, NotEquals } from 'class-validator';
import { AccountTypes } from './customer.enum';
import { IAccountOpen } from './customer.interface';
const { monoSavings, ...accountTypesWithoutSavings } = AccountTypes;

export class AccountOpenDTO implements IAccountOpen {
  @IsEnum(AccountTypes, { message: `accountType should be any of ${Object.values(accountTypesWithoutSavings)}` })
  @NotEquals(AccountTypes.monoSavings)
  readonly accountType: AccountTypes;
}
