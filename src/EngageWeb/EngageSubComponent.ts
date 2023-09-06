import { IEngageWalletComponent } from '../GenericEvent/WalletEvent/IEngageWalletComponent';
import { IEngageUserComponent } from '../GenericEvent/UserEvent/IEngageUserComponent';

export interface IEngageSubComponent {
  send(data: { type: string; [param: string]: string }): Promise<void>;

  user: IEngageUserComponent;
  wallet: IEngageWalletComponent;
}
