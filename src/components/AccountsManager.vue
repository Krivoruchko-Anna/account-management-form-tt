<template>
    <n-space vertical>
        <n-flex align="center">
            <h2>Учетные записи</h2>

            <n-button
                @click="addRecord"
                size="small"
                type="info"
                style="margin-top: 4px;"
            >+</n-button>
        </n-flex>

        <p class="hint">
            <n-icon>
                <HelpCircleOutline />
            </n-icon>
            <span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
        </p>

        <div class="form-header">
            <div>Метка</div>
            <div>Тип записи</div>
            <div>Логин</div>
            <div>Пароль</div>
            <div></div>
        </div>

        <n-space vertical>
            <AccountForm
                v-for="account in store.records"
                :key="account.id"
                :account="account"
                @remove="onRemove"
            />
        </n-space>
    </n-space>
</template>

<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { HelpCircleOutline } from '@vicons/ionicons5'
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/form.ts'
import AccountForm from './AccountForm.vue'
import { ACCOUNT_TYPES } from '@/constants/account'

const store = useAccountsStore()

const addRecord = () => {
    const last = store.records.at(-1)
    if (last && (!last.login || (last.type === ACCOUNT_TYPES.LOCAL && !last.password))) {
        return
    }

    const newAcc: Account = {
        id: uuid(),
        labels: [],
        type: ACCOUNT_TYPES.LOCAL,
        login: '',
        password: ''
    }
    store.add(newAcc)
}

const onRemove = (id: string) => {
    store.remove(id)
}
</script>

<style scoped>
.hint {
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 4px 12px;
    border-radius: 4px;
    font-size: 0.9em;
    background-color: aliceblue;
}

.form-header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 40px;
    gap: 12px;
    font-weight: bold;
    padding: 8px 0;
}
</style>
