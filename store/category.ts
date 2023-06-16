import { defineStore } from 'pinia'
import { Category  } from '~/interfaces/Category';

interface CategoryState{
    categories: Category[],
    delete: Number[]
}

export const useCategoryStore = defineStore({
    id: 'category-store',
    state: (): CategoryState => ({
        categories: [],
        delete: []
    }), 
    persist: {
        key: 'category',
        storage: persistedState.localStorage,
    },
    getters: {
        categoryGetter: state => state.categories,
        deleteGetter: state => state.delete,
    },
    actions: {
        categoryReset() {
            this.categories=[]
            this.delete=[]
        }
    }
})