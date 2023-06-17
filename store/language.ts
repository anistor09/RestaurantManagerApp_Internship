import { defineStore } from 'pinia'

const map = (s : String) => {
    if (s == 'English')
        return 0
    else if (s == 'Romanian')
        return 1
    else 
        return -1
}

interface LanguageState {
    language: String,
}
export const useLanguageStore = defineStore({
    id: 'language-store',
    state: (): LanguageState => ({
        language: 'English',
    }), 
    persist: {
        key: 'language',
        storage: persistedState.localStorage,
    },
    getters: {
        languageGetter: state => state,
        idGetter: state => map(state.language)
    },
})