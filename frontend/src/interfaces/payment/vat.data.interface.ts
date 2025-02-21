import { IAmount } from './amount.interface.ts';
import { IVatDataType } from './vat.data.type.ts';

export interface IVatData {
	type: IVatDataType;
	amount?: IAmount;
	rate?: string;
}
