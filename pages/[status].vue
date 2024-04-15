<script setup lang="ts">
const {
  data: statuses,
  pending,
  error,
} = await useFetch<Status[]>(
  () => `https://api.chringel.dev/statuses?orderBy=desc`
);
const typeLine = ref("");

const status = statuses.value ? statuses.value[0] : defaultStatus;

const typeEffect = () => {
  if (typeLine.value.length < status.contentAndEmoji.length) {
    if (typeLine.value.length === 0) {
      typeLine.value += status.contentAndEmoji
        .charAt(typeLine.value.length)
        .toLowerCase();
    } else {
      typeLine.value += status.contentAndEmoji.charAt(typeLine.value.length);
    }
    setTimeout(typeEffect, 60);
  }
};
setTimeout(() => typeEffect(), 1000);

useHead({
  title: "Christian Engel is " + status.content,
  meta: [
    { name: "description", content: "Christian Engel is " + status.content },
  ],
  link: [
    {
      rel: "icon",
      href: `"data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${status.emoji}</text></svg>"`,
    },
  ],
});
</script>

<template>
  <h1>
    Christian Engel is
    <span class="status">{{ typeLine }}</span>
  </h1>
  <div class="info">
    <p>{{ status.relativeTime }}</p>
  </div>
</template>

<style>
.status {
  color: var(--primary-color);
  font-weight: 700;
}

.status::after {
  content: "|";
  animation: blink 1s 4s infinite;
}

@keyframes blink {
  0%,
  45% {
    color: transparent;
  }
  50%,
  100% {
    color: var(--primary-color);
  }
}
</style>
