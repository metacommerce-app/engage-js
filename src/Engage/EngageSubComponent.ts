export interface IEngageUserComponent {
  login(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;
  logout(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;
  signingUp(data: { userId?: string; wallet?: string; [params: string]: unknown }): Promise<void>;
  signedUp(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;
}

export interface IEngageWalletComponent {
  mint(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void>;
  transfer(data: { fromWallet: string; toWallet: string; userId?: string; [params: string]: unknown }): Promise<void>;
}

export interface IEngageSubComponent {
  send(data: { type: string; [param: string]: string }): Promise<void>;

  user: IEngageUserComponent;
  wallet: IEngageWalletComponent;
}
