import { IPassenger } from './passenger.interface.ts';
import { IPaymentLeg } from './paymentLeg.interface.ts';

export interface IAirline {
	account_id?: string;
	ticket_number?: string;
	booking_reference?: string;
	passengers?: IPassenger[];
	legs?: IPaymentLeg[];
}
