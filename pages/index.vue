<script setup lang="ts">
import slugify from "slugify";

const {
  data: statuses,
  pending,
  error,
} = await useFetch<Status[]>(() => `https://api.chringel.dev/statuses`);
const typeLine = ref("");

const status = statuses.value ? statuses.value[0] : defaultStatus;

const slugifiedStatus = slugify(status.content, { lower: true, strict: true });

navigateTo({ path: `/${slugifiedStatus}` });
</script>
