<template>
  <v-row class="no-gutters">
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
    <v-col md="2" class="pl-2">
      <v-text-field
        v-model.lazy="item.brand"
        label="Marka"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col md="2" lg="1" class="pl-2">
      <v-text-field
        v-model.lazy="item.tread"
        label="Bieżnik"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col md="5" lg="6" class="pl-2">
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
  data: () => ({
    rules: {
        required: (value) => !!value || 'Pole wymagane',
        integer: (value) => !Number.isNaN(parseInt(value, 10)) || 'Wymagana wartość liczbowa',
        float: (value) => !Number.isNaN(parseFloat(value, 10)) || 'Wymagana wartość liczbowa',
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
