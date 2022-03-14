<template>
  <v-row class="no-gutters mt-2">
    <v-col md="1">
      <v-text-field
        v-model.number="item.width"
        label="Szerokość"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur
        :rules="[rules.integer, rules.required]"/>
    </v-col>
    <v-col md="1" class="pl-2">
      <v-text-field
        v-model.number="item.profile"
        label="Profil"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur
        :rules="[rules.integer, rules.required]"/>
    </v-col>
    <v-col md="1" class="pl-2">
      <v-text-field
        v-model.number="item.diameter"
        label="Średnica"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur
        :rules="[rules.float, rules.required]"/>
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
    <v-col lg="8" md="7" class="pl-2">
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
export default
{
  name: 'TireMeasurementInfo',
  props: {
    item: Object,
  },
  data: () => ({
    rules: {
        required: (value) => !!value || 'Pole wymagane',
        integer: (value) => !Number.isNaN(parseInt(value, 10)) || 'Wymagana wartość liczbowa',
        float: (value) => !Number.isNaN(parseFloat(value, 10)) || 'Wymagana wartość liczbowa',
      },
  }),
};
</script>
