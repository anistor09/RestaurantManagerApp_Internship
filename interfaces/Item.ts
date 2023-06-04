import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { Option } from './Option';

export interface Item {
    id: number;
    name: string;
    description: string;
    longDescription: string;
    presentationOrder: number;
    imageUrl: string;
    price: number;
    category: Category;
    subCategory: SubCategory | null;
    sideItemSet: Item[];
    optionSet: Option[];
    allergen: string;
}