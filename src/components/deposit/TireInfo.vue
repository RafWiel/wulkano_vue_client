<template>
  <v-row class="no-gutters">
    <v-col md="1">
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
    <v-col md="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.required] : []"
        v-model.lazy.trim="item.dot"
        label="DOT"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col md="2" lg="1" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.required] : []"
        v-model.lazy.trim="item.brand"
        label="Marka"
        type="input"
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col lg="1" md="2" class="pl-2">
      <v-text-field
        :readonly="isReadonly"
        :rules="isValidation ? [rules.float, rules.required] : []"
        v-model.number.lazy.trim="item.tread"
        label="Bieżnik [mm]"
        type="number"
        hide-spin-buttons
        hide-details="auto"
        validate-on-blur/>
    </v-col>
    <v-col class="pl-2">
      <v-textarea
        :readonly="isReadonly"
        label="Uwagi"
        hide-details="auto"
        validate-on-blur
        auto-grow
        rows="1"
        v-model.lazy="item.note"/>
    </v-col>
  </v-row>
</template>
<script>
import rules from '@/misc/rules';

export default
{
  name: 'TireInfo',
  props: {
    item: Object,
    isReadonly: Boolean,
    isValidation: Boolean,
  },
  data: () => ({
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
