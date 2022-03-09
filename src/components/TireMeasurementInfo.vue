<template>
  <v-row class="no-gutters">
    <v-col>
      <v-text-field
        v-model.lazy="item.size"
        label="Rozmiar (todo: podziel)"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="ml-2">
      <v-text-field
        v-model.lazy="item.pressure"
        label="Ciśnienie [bar]"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="ml-2">
      <v-text-field
        v-model.lazy="item.tread"
        label="Bieżnik [mm]"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
  </v-row>
</template>
<script>
export default
{
  name: 'TireMeasurementInfo',
  props: {
    item: Object,
  },
};
</script>
