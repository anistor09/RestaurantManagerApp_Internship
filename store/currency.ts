import { defineStore } from 'pinia'

interface CurrencyState{
    currency: String,
}
export const useCurrencyStore = defineStore({
    id: 'currency-store',
    state: (): CurrencyState => ({
        currency: '€',
    }), 
    persist: {
        key: 'currency',
        storage: persistedState.localStorage,
    },
    getters: {
        currencyGetter: state => state
    },
    // actions: {
    //     categoryReset() {
    //         this.categories=[]
    //         this.delete=[]
    //     }
    // }
})