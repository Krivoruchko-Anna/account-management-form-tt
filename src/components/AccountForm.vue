<template>
    <div class="account-row">
        <n-input
            v-model:value="labelsString"
            placeholder="значение"
            :maxlength="50"
            @blur="onLabelsBlur"
        />

        <n-select
            v-model:value="localAccount.type"
            :options="typeOptions"
            @update:value="onTypeChange"
        />

        <n-input
            v-model:value="localAccount.login"
            placeholder="Логин"
            :class="['login-field', {
                'expand': localAccount.type === ACCOUNT_TYPES.LDAP,
                 'error': localAccount.__invalidLogin
            }]"
            :maxlength="100"
            @blur="validateAndSave"
        />

        <n-input
            v-show="localAccount.type === ACCOUNT_TYPES.LOCAL"
            v-model:value="localAccount.password"
            placeholder="Пароль"
            :class="{ 'error': localAccount.__invalidPassword }"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="on"
            :maxlength="100"
            @blur="validateAndSave"
        >
            <template #suffix>
                <n-icon @click="togglePassword" style="cursor: pointer;">
                    <component :is="showPassword ? EyeOutline : EyeOffOutline" />
                </n-icon>
            </template>
        </n-input>

        <div class="delete-button">
            <n-button size="small" type="error" @click="$emit('remove', localAccount.id)">
                <n-icon><trash-outline /></n-icon>
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { TrashOutline, EyeOutline, EyeOffOutline } from '@vicons/ionicons5'
import { useAccountsStore } from '@/stores/useAccountsStore'
import type { Account } from '@/types/form.ts'
import { ACCOUNT_TYPE_OPTIONS, ACCOUNT_TYPES } from '@/constants/account'
import { validateAccount } from '@/utils/validation'
import { parseLabelsString } from '@/utils/format'

const props = defineProps<
    { account: Account }
>()

defineEmits<{
    (e: 'remove', id: string): void
}>()

const store = useAccountsStore()
const localAccount = ref<Account & { __invalidLogin?: boolean; __invalidPassword?: boolean }>({
    ...props.account,
    __invalidLogin: false,
    __invalidPassword: false
})

const typeOptions = ACCOUNT_TYPE_OPTIONS

const showPassword = ref(false)
const togglePassword = () => {
    showPassword.value = !showPassword.value
}

const labelsString = ref(localAccount.value.labels.map(label => label.text).join('; '))

const onLabelsBlur = () => {
    localAccount.value.labels = parseLabelsString(labelsString.value)
    validateAndSave()
}

const onTypeChange = () => {
    if (localAccount.value.type === ACCOUNT_TYPES.LDAP) {
        localAccount.value.password = null
    }
    validateAndSave()
}

const validateAndSave = () => {
    const result = validateAccount(localAccount.value, labelsString.value)

    localAccount.value.__invalidLogin = !result.isLoginValid
    localAccount.value.__invalidPassword = !result.isPasswordValid

    if (!result.isValid) return

    resetAllErrors()
    store.update(localAccount.value)
}

const resetAllErrors = () => {
    localAccount.value.__invalidLogin = false
    localAccount.value.__invalidPassword = false
}

watch(() => props.account, newVal => {
    localAccount.value = { ...newVal }
})
</script>

<style scoped>
.account-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 40px;
    gap: 12px;
    align-items: center;
}

.delete-button {
    display: flex;
    justify-content: center;
}

.login-field.expand {
    grid-column: span 2;
}

.error {
    border: #f56c6c solid 1px;
}
</style>
