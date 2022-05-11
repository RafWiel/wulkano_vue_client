<template>
  <v-row class="no-gutters">
    <v-col md="1">
      <v-select
        :items="tireLocationItems"
        :readonly="isReadonly"
        :rules="isValidation ? [rules.required] : []"
        v-model="item.location"
        item-value="id"
        hide-details="auto"
        label="Pozycja"/>
    </v-col>
    <v-col md="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.integer, rules.required] : []"
        v-model.number.lazy.trim="item.width"
        label="Szerokość"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur/>
    </v-col>
    <v-col md="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.integer, rules.required] : []"
        v-model.number.lazy.trim="item.profile"
        label="Profil"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur/>
    </v-col>
    <v-col md="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.integer, rules.required] : []"
        v-model.number.lazy.trim="item.diameter"
        label="Średnica"
        type="number"
        hide-details="auto"
        hide-spin-buttons
        validate-on-blur/>
    </v-col>
    <v-col md="2" lg="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        v-model.lazy.trim="item.brand"
        label="Marka"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col md="2" lg="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.float, rules.required] : []"
        v-model.lazy.trim="item.tread"
        label="Bieżnik"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        v-model.lazy.trim="item.serial"
        label="Nr. fabryczny"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
  </v-row>
</template>
<script>
import rules from '@/misc/rules';
import tireLocation from '@/enums/truck/tireLocation';

export default
{
  name: 'TireBrandInfo',
  props: {
    item: Object,
    isReadonly: Boolean,
    isValidation: Boolean,
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
