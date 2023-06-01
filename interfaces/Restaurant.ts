import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { Item } from './Item';
import { Choice } from './Choice';
import { Option } from './Option';
import { Carte } from './Carte';
import { Hours } from './Hours';
import { Table } from './Table';

export interface Restaurant {
	id: number;
	name: string;
	imageUrl: string;
	latitude: number | null;
	longitude: number | null;
	rating: number | null;
	category: string;
	backgroundColor: string;
	foregroundColor: string;
	font_color: string;
	description: string;
	logoUrl: string;
	addresse: string;
	phoneNumber: string;
	email: string;
	owner: string;
	averageWaitingTime: number;
	categorySet: Category[];
	subCategorySet: SubCategory[];
	itemSet: Item[];
	choiceSet: Choice[];
	optionSet: Option[];
	carteSet: Carte[];
	hoursSet: Hours[];
	tableRestaurantSet: Table[];
}
