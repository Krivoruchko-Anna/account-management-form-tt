import type { Account } from "@/types/form.ts";
import { ACCOUNT_TYPES } from '@/constants/account'
import type { ValidationResult } from '@/types/validation'

export const MAX_LOGIN_LENGTH = 100
export const MAX_PASSWORD_LENGTH = 100
export const MAX_LABELS_STRING_LENGTH = 50

export const isLoginValid = (login: string): boolean => {
    return login.trim().length > 0 && login.length <= MAX_LOGIN_LENGTH
}

export const isPasswordValid = (type: string, password: string | null): boolean => {
    if (type === ACCOUNT_TYPES.LDAP) return true
    const value = password?.trim() ?? ''
    return value.length > 0 && value.length <= MAX_PASSWORD_LENGTH
}

export const isLabelsValid = (labelsString: string): boolean => {
    return labelsString.trim().length <= MAX_LABELS_STRING_LENGTH
}

export const validateAccount = (account: Account, labelsString: string): ValidationResult => {
    const loginValid = isLoginValid(account.login)
    const passwordValid = isPasswordValid(account.type, account.password)
    const labelsValid = isLabelsValid(labelsString)

    return {
        isLoginValid: loginValid,
        isPasswordValid: passwordValid,
        isLabelsValid: labelsValid,
        isValid: loginValid && passwordValid && labelsValid
    }
}
