import { Item } from './Item';
import { Hours } from './Hours';

export interface Carte {
    id: number;
    name: string;
    description: string;
    version: number;
    active: boolean;
    imageUrl: string;
    itemSet: Item[];
    hoursSet: Hours[];
}