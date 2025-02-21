import { IItem } from './item.interface.ts';

export type IItemWithoutData = Omit<IItem, 'supplier' | 'agent_type'>;
