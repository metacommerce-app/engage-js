export interface IEngageSubComponent {
  send(data: { type: string; [param: string]: string }): Promise<void>;
}
