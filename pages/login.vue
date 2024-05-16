<template>
  <form @submit.prevent="handleLogin">
    <label for="email">Email</label>
    <input type="text" id="email" name="email" v-model="email" />
    <label for="password">Password</label>
    <input type="password" id="password" name="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/new",
  },
});

const email = ref("");
const password = ref("");
const { signIn } = useAuth();

async function handleLogin() {
  signIn(
    { email: email.value, password: password.value },
    { redirect: true, callbackUrl: "/new" }
  );
}
</script>

<style scoped></style>
