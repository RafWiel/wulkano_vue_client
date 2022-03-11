<template>
  <v-app-bar
    app
    dense
    flat
    hide-on-scroll
    color="#385998"    >
    <!-- <v-btn
      icon
      class="mr-n3"
      @click="$router.go(-1)">
      <v-icon color="grey lighten-2">mdi-chevron-left</v-icon>
    </v-btn> -->
    <!-- <v-btn icon @click="$emit('menuClicked')">
      <v-icon color="grey lighten-2">mdi-menu</v-icon>
    </v-btn> -->
    <v-img
      src="@/assets/wulkano.png"
      max-width="120"
      max-height="35"/>
    <v-app-bar-title class="px-0 grey--text text--lighten-2">
      <span v-if="$vuetify.breakpoint.xs">{{ $route.meta.title }}</span>
      <span v-else>{{ $route.meta.titleLong }}</span>
    </v-app-bar-title>
  </v-app-bar>
</template>
<script>
export default { name: 'AppBar' };
</script>
