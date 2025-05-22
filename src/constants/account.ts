export const ACCOUNT_TYPES = {
    LOCAL: 'LOCAL',
    LDAP: 'LDAP'
} as const

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES]

export const ACCOUNT_TYPE_OPTIONS = [
    { label: 'Локальная', value: ACCOUNT_TYPES.LOCAL },
    { label: 'LDAP', value: ACCOUNT_TYPES.LDAP }
]
