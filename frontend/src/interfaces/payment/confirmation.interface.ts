import { ConfirmationType } from './confirmation.type.ts';

export interface IConfirmation {
	type: ConfirmationType;
	locale?: string;
	confirmation_token?: string;
	confirmation_data?: string;
	confirmation_url?: string;
	enforce?: boolean;
	return_url?: string;
}
