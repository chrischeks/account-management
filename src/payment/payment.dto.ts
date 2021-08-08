import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { ITransfer } from './payment.interface';

export class TransferDTO implements ITransfer {
  @IsNumber()
  amount: number;

  @IsString()
  @Length(4, 4)
  readonly pin: string;

  @IsString()
  @IsNotEmpty()
  readonly debitAccount: string;

  @IsString()
  @IsNotEmpty()
  readonly creditAccount: string;

  @IsString()
  @IsOptional()
  narration: string;
}
