<template>
  <div class="bg-gray-50 dark:bg-midnight">
    <header class="bg-grey-100 p-5">
      <div class="container">
        <h1 class="text-3xl">NoIE Document</h1>
      </div>
    </header>

    <div class="flex">
      <div class="max-w-xs w-full">
        <sidebar />
      </div>
      <div class="w-full bg-white">
        <nuxt />
      </div>
    </div>
  </div>
</template>
