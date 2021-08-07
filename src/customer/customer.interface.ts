export interface ICustomer {
  _id?: string;
  name: string;
  password: string;
  pin: string;
  email: string;
  account?: { accountType: string; accountNumber: string; balance: number; denomination }[];
}
