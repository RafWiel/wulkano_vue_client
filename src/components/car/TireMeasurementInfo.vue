<template>
  <v-row class="no-gutters mt-2">
    <v-col cols="2" sm="1">
      <v-select
        v-model="item.location"
        :items="tireLocationItems"
        item-value="id"
        hide-details="auto"
        label="Pozycja"/>
    </v-col>
    <v-col cols="4" sm="3" md="2" lg="1" class="mt-0 pl-2">
      <three-state-control
        :value="item.status"/>
    </v-col>
    <v-col lg="1" md="2" class="pl-2">
      <v-text-field
        v-model.number="item.pressure"
        label="Ciśnienie [bar]"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur
        :rules="[rules.float, rules.required]"/>
    </v-col>
    <v-col class="pl-2">
      <v-text-field
        v-model.number="item.tread"
        label="Bieżnik [mm]"
        type="number"
        hide-spin-buttons
        hide-details="auto"
        validate-on-blur
        :rules="[rules.float, rules.required]"/>
    </v-col>
  </v-row>
</template>
<script>
import rules from '@/misc/rules';
import tireLocation from '@/enums/car/tireLocation';
import ThreeStateControl from '@/components/ThreeStateControl.vue';

export default
{
  name: 'TireMeasurementInfo',
  props: {
    item: Object,
  },
  components: {
    ThreeStateControl,
  },
  data: () => ({
    tireLocationItems: tireLocation.items,
    rules: {
        required: rules.required,
        integer: rules.integer,
        float: rules.float,
      },
  }),
  watch: {
    item: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        this.$emit('change', this.item);
      },
    },
  },
};
</script>
