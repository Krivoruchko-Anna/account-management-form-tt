import type { Account } from '@/types/form'

const STORAGE_KEY = 'records'

export const loadAccountsFromLS = (): Account[] => {
    try {
        const json = localStorage.getItem(STORAGE_KEY)
        if (!json) return []
        return JSON.parse(json) as Account[]
    } catch (e) {
        console.error('Ошибка при чтении из localStorage', e)
        return []
    }
}

export const saveAccountsToLS = (accounts: Account[]): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
    } catch (e) {
        console.error('Ошибка при записи в localStorage', e)
    }
}
