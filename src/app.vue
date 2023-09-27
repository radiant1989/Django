<script lang="ts" setup>
import AuthProvider from "./components/providers/AuthProvider.vue";
import UserPreferenceProvider from "./components/providers/UserPreferenceProvider.vue";
import NotificationProvider from "./components/providers/NotificationProvider.vue";
import ThemeProvider from "./components/providers/ThemeProvider.vue";
import LoadingProvider from "./components/providers/LoadingProvider.vue";
import WalletProvider from "~/components/providers/WalletProvider.vue";
import ModalsProvider from "./components/providers/ModalsProvider.vue";
</script>
<template>
  <div id="app">
    <ThemeProvider>
      <LoadingProvider>
        <NotificationProvider>
          <AuthProvider>
            <UserPreferenceProvider>
              <WalletProvider>
                <ModalsProvider>
                  <NuxtLayout>
                    <NuxtPage :level="1" />
                  </NuxtLayout>
                </ModalsProvider>
              </WalletProvider>
            </UserPreferenceProvider>
          </AuthProvider>
        </NotificationProvider>
      </LoadingProvider>
    </ThemeProvider>
  </div>
</template>
