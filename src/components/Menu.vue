<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <t-menu
    :theme="isDark ? 'dark' : 'light'" :default-value="$router.currentRoute.value.path.replace('/', '')" class="min-h-screen shadow-lg"
  >
    <nav text-2xl mt-5>
      <RouterLink class="icon-btn mx-2" to="/" :title="t('button.home')">
        <div i-carbon-campsite />
      </RouterLink>

      <!-- <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <div i="carbon-sun dark:carbon-moon" />
      </button> -->

      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales()">
        <div i-carbon-language />
      </a>

      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/sovlookup" target="_blank" title="GitHub">
        <div i-carbon-logo-github />
      </a>
    </nav>
    <t-divider />
    <t-menu-item value="model_list" @click="$router.push('/model_list')">
      <template #icon>
        <t-icon name="server" />
      </template>
      模型列表
    </t-menu-item>
  </t-menu>
</template>
