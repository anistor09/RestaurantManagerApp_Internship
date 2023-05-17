import { SubCategory } from './SubCategory';

export interface Category {
    id: number;
    name: string;
    description: string;
    presentationOrder: number;
    imageUrl: string;
    subCategorySet: SubCategory[];
}