export interface ICustomer {
  _id?: string;
  name: string;
  password: string;
  pin: string;
  account?: { accountType: string; accountNumber: string; balance: number; denomination: string }[];
  email: string;
}
