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
        v-model.lazy="item.brand"
        label="Marka"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="ml-2">
      <v-text-field
        v-model.lazy="item.tread"
        label="Bieżnik"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="ml-2">
      <v-text-field
        v-model.lazy="item.serial"
        label="Nr. fabryczny"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
  </v-row>
</template>
<script>
export default
{
  name: 'TireBrandInfo',
  props: {
    item: Object,
  },
};
</script>
