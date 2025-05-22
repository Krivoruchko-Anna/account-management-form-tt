import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/form'
import { v4 as uuid } from 'uuid'
import { loadAccountsFromLS, saveAccountsToLS } from '@/composables/useLocalStorageAccounts'

export const useAccountsStore = defineStore('accounts', () => {
    const records = ref<Account[]>([])

    const add = (account: Account): void => {
        records.value.push(account)
        saveAccountsToLS(records.value)
    }

    const update = (updated: Account): void => {
        const index = records.value.findIndex(record => record.id === updated.id)
        if (index !== -1) {
            records.value[index] = updated
            saveAccountsToLS(records.value)
        }
    }

    const remove = (id: string): void => {
        records.value = records.value.filter(r => r.id !== id)
        saveAccountsToLS(records.value)
    }

    const load = (): void => {
        const loaded = loadAccountsFromLS()
        if (loaded.length === 0) {
            records.value = [{
                id: uuid(),
                labels: [],
                type: 'LOCAL',
                login: '',
                password: ''
            }]
        } else {
            records.value = loaded
        }
    }

    load()

    return { records, add, update, remove }
})
