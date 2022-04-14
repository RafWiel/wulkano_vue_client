<template>
  <v-container fluid class="pa-0">
    <v-row class="no-gutters">
      <!-- Kolumna -->
      <v-col
        cols="6">
        <v-select
          v-model="sorting.column"
          :items="columns"
          item-text="text"
          item-value="id"
          hide-details="auto"
          clearable
          label="Sortowanie"
          @click.stop
          @change="emitEvent"/>
      </v-col>
      <!-- Kolejnosc -->
      <v-col
        cols="6"
        class="pl-2">
        <v-select
          v-model="sorting.order"
          :items="orders"
          item-text="value"
          item-value="id"
          hide-details="auto"
          label="Kolejność"
          @click.stop
          @change="emitEvent"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import sortOrder from '@/enums/sortOrder';

export default {
  name: 'RequestsMobileSorting',
  props: { columns: Array },
  data: () => ({
    sorting: {
      column: null,
      order: 0,
    },
    orders: [
      { id: 0, value: 'Rosnąco' },
      { id: 1, value: 'Malejąco' },
    ],
    sortOrderItems: sortOrder.items,
  }),
  methods: {
    emitEvent() {
      this.$emit('sort', this.sorting);
    },
  },
};
</script>
