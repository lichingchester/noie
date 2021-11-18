<template>
  <div>
    <!-- https://sindresorhus.com/github-markdown-css/ -->
    <div id="markdown" class="markdown-body"></div>
  </div>
</template>

<script>
export default {
  async mounted() {
    const MarkdownIt = require("markdown-it");
    const md = new MarkdownIt();

    const readme = await fetch(
      "https://raw.githubusercontent.com/lichingchester/noie/master/README.md"
    ).then((r) => r.text());

    document.querySelector("#markdown").innerHTML = md.render(readme);
  },
};
</script>

<style>
html,
body {
  margin: 0;
}
/* 

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
} */

body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #0d1117;
  }
}
</style>
