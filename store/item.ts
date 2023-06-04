import { defineStore } from 'pinia'
import { Item  } from '~/interfaces/Item';

interface ItemState{
    items: Item[],
    delete: Number[]
}

export const useItemStore = defineStore({
    id: 'item-store',
    state: (): ItemState => ({
        items: [],
        delete: [],
    }), 
    persist: {
        key: 'item',
        storage: persistedState.localStorage,
    },
    getters: {
        itemGetter: state => state.items,
        deleteGetter: state => state.delete,
    },
    actions: {
        itemReset() {
            this.items=[]
            this.delete=[]
        }
    }
})