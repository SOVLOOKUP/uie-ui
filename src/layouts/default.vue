<template>
  <main class="text-center text-gray-700 dark:text-gray-200 flex">
    <t-layout>
      <t-aside>
        <Menu />
      </t-aside>

      <t-content class="ma-3">
        <RouterView />
      </t-content>
    </t-layout>
  </main>
</template>
