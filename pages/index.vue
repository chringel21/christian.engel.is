<script setup lang="ts">
import slugify from "slugify";

const apiBaseUrl = useRuntimeConfig().public.API_BASE_URL;
const {
  data: statuses,
  pending,
  error,
} = await useFetch<Status[]>(() => `${apiBaseUrl}statuses?orderBy=desc`);
const typeLine = ref("");

const status = statuses.value ? statuses.value[0] : defaultStatus;

const slugifiedStatus = slugify(status.content, { lower: true, strict: true });

navigateTo({ path: `/${slugifiedStatus}` });
</script>
