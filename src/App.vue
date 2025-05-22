<template>
    <n-config-provider>
        <div id="app">
            <AccountsManager />
        </div>
    </n-config-provider>
</template>

<script setup lang="ts">
import AccountsManager from '@/components/AccountsManager.vue'
import { NConfigProvider } from 'naive-ui'
</script>

<style scoped>
#app {
    width: 760px;
    margin: 0 auto;
    padding: 24px;
}
</style>
