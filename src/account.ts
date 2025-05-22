export const ACCOUNT_TYPES = {
    LOCAL: 'LOCAL',
    LDAP: 'LDAP'
} as const

export const ACCOUNT_TYPE_OPTIONS = [
    { label: 'Локальная', value: ACCOUNT_TYPES.LOCAL },
    { label: 'LDAP', value: ACCOUNT_TYPES.LDAP }
]
