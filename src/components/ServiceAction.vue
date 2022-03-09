<template>
  <v-row class="no-gutters" align="center">
    <v-col cols="auto">
      <v-checkbox
        v-model="item.isChecked"
        :label="item.text"
        hide-details
        class="shrink mr-2 mt-0"/>
    </v-col>
    <v-col>
      <slot name="extra-info"/>
    </v-col>
    <v-col cols="1">
      <v-text-field
        v-model.lazy="item.count"
        label="Ilość (todo: przyciski)"
        class="ml-2"/>
    </v-col>
    <v-col cols="2">
      <v-text-field
        v-model.lazy="item.info"
        label="Info"
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
