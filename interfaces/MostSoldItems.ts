import { ItemCount } from '~/interfaces/ItemCount';

export interface MostSoldItems {
	lastYear: ItemCount[];
	last6Months: ItemCount[];
	lastMonth: ItemCount[];
	lastWeek: ItemCount[];
}
