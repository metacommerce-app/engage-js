export interface IEngageUserComponent {
  login(data: { userId: string; wallet?: string; [params: string]: unknown }): Promise<void>;
}

export interface IEngageSubComponent {
  send(data: { type: string; [param: string]: string }): Promise<void>;

  user: IEngageUserComponent;
}
