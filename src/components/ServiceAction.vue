<template>
  <v-row class="no-gutters mt-2" align="center">
    <v-col cols="auto">
      <v-checkbox
        v-model="item.isChecked"
        :label="item.text"
        hide-details
        class="shrink mr-2 mt-3"/>
    </v-col>
    <v-col>
      <slot name="extra-info"/>
    </v-col>
    <v-col cols="1">
      <v-text-field
        v-model.lazy="item.count"
        label="Ilość"
        hide-details
        class="ml-2"/>
    </v-col>
    <v-col cols="2" md="3" lg="4">
      <v-text-field
        v-model.lazy="item.info"
        label="Info"
        hide-details
        class="ml-2"/>
    </v-col>
  </v-row>

</template>
<script>
export default
{
  name: 'ServiceAction',
  props: {
    item: Object,
  },
};
</script>
