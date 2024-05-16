<template>
  <h2>New Status</h2>
  <form @submit.prevent="updateStatus">
    <label for="content">Content</label>
    <input type="text" id="content" name="content" v-model="content" />
    <label for="emoji">Emoji</label>
    <input type="text" id="emoji" name="emoji" v-model="emoji" />

    <input type="submit" />
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const apiBaseUrl = useRuntimeConfig().public.API_BASE_URL;
const content = ref("");
const emoji = ref("");
const body = computed(() => {
  return { emoji: emoji.value, content: content.value };
});
const token = useCookie("auth.token").value;

async function updateStatus() {
  const response = await $fetch<Response>(apiBaseUrl + "statuses", {
    method: "POST",
    body: body.value,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    navigateTo("/");
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
