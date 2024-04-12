export interface IEngageUserComponent {
  signIn(data: { user_id: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signOut(data: { user_id: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signingUp(data: { userId?: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  signedUp(data: { user_id: string; wallet?: string; [params: string]: unknown }): Promise<void>;

  activity(data: { user_id: string; wallet?: string; [params: string]: unknown }): Promise<void>;
}
