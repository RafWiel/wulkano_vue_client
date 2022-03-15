<template>
  <v-row class="no-gutters mt-2">
    <v-col>
      <v-text-field
        v-model.number="item.name"
        label="Nazwisko"
        type="input"
        hide-details="auto"
        validate-on-blur
        :rules="[rules.required]"/>
    </v-col>
  </v-row>
</template>
<script>
export default
{
  name: 'Mechanic',
  props: {
    item: Object,
  },
  data: () => ({
    rules: {
        required: (value) => !!value || 'Pole wymagane',
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
