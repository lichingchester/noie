<template>
  <div class="mb-10">
    <div class="mb-4">
      <a :href="`#${slugify($slots.title[0].text)}`" class="text-2xl">
        <slot name="title" />
      </a>
    </div>

    <slot />
  </div>
</template>

<script>
import slugify from "slugify";

export default {
  methods: {
    slugify(value) {
      return slugify(value, {
        lower: true,
      });
    },
  },
};
</script>
