<template>
  <component
    :is="is"
    v-bind="link"
    :target="target"
    :class="{ 'no-link': noLink }"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: "index",
    },
    href: {
      type: String,
      default: "#",
    },
    noLink: Boolean,
    external: Boolean,
  },
  computed: {
    is() {
      if (this.noLink) {
        return "div";
      }

      if (this.href) {
        return "a";
      }

      if (this.to) {
        return "nuxt-link";
      }

      return "a";
    },
    target() {
      return this.external ? "_blank" : "";
    },
    link() {
      if (this.href) {
        return { href: this.href };
      }

      if (this.to) {
        return { href: this.$route(this.to) };
      }

      return {};
    },
  },
};
</script>
