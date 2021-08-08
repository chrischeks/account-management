export interface ISignIn {
  password: string;
  email: string;
}

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: string;
}
