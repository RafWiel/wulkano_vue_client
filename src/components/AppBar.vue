<template>
  <v-app-bar
    app
    class="app-bar"
    dense
    flat
    hide-on-scroll>
    <v-btn
      icon
      v-if="$route.meta.isBackButton"
      class="mr-n3"
      @click="$router.push({ name: 'RequestsListView'})">
      <v-icon color="grey lighten-2">mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn
      v-if="!$route.meta.isLoginView"
      icon
      @click="$emit('menuClicked')">
      <v-icon color="grey lighten-2">mdi-menu</v-icon>
    </v-btn>
    <logo />
    <v-app-bar-title class="px-0 grey--text text--lighten-2">
      <span v-if="$vuetify.breakpoint.xs">{{ $route.meta.title }}</span>
      <span v-else>{{ $route.meta.titleLong }}</span>
    </v-app-bar-title>
  </v-app-bar>
</template>
<script>
import Logo from '@/components/Logo.vue';

export default
{
  name: 'AppBar',
  components: { Logo },
};
</script>
<style lang="scss" scoped>
  @import '@/assets/main.scss';

  .app-bar {
    background-color: $app-bar-color !important;
  }

</style>
