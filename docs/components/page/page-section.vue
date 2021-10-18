<template>
  <div>
    <link :href="`#${slugify($slots.title[0].text)}`">
      <slot name="title" />
    </link>

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
