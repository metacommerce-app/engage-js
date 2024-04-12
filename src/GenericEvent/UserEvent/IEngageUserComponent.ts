export interface IEngageUserComponent {
  signIn(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signOut(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signingUp(data: { userId?: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signedUp(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  activity(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;
}
