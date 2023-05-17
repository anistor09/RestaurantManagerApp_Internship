import { Choice } from './Choice';

export interface Option {
    id: number;
    mandatory: boolean;
    name: string;
    description: string;
    choiceSet: Choice[];
}