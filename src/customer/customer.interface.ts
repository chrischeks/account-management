interface IEmail {
  email: string;
}

export interface ICustomer extends IEmail {
  _id?: string;
  name: string;
  password: string;
  pin: string;
  account?: { accountType: string; accountNumber: string; balance: number; denomination: string }[];
}

export interface IAccountOpen {
  accountType: string;
}

export interface ISignIn extends IEmail {
  password: string;
}
