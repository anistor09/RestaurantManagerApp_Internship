import { Category } from './Category';
import { SubCategory } from './SubCategory';
import { Option } from './Option';

export interface Item {
    id: number;
    name: string;
    description: string;
    presentationOrder: number;
    imageUrl: string;
    price: number;
    category: Category;
    subCategory: SubCategory;
    sideItemSet: Item[];
    optionSet: Option[];
}