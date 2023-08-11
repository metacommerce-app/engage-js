export interface IEngageWalletComponent {
  mint(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void>;

  activity(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void>;

  transfer(data: { fromWallet: string; toWallet: string; userId?: string; [params: string]: unknown }): Promise<void>;

  transaction(data: { wallet: string; userId?: string; [params: string]: unknown }): Promise<void>;

  balance(data: { wallet: string; balance: bigint; userId?: string; [params: string]: unknown }): Promise<void>;
}
