<template>
  <v-row class="no-gutters mt-2">
    <v-col>
      <v-combobox
        :readonly="isReadonly"
        :rules="isValidation ? [rules.required] : []"
        :items="api.values"
        :loading="api.isLoading"
        :search-input.sync="api.searchInput"
        v-model.lazy.trim="item.name"
        hide-details="auto"
        hide-no-data
        hide-selected
        no-filter
        type="input"
        label="Nazwisko"/>
    </v-col>
  </v-row>
</template>
<script>
import debounce from 'lodash.debounce';
import rules from '@/misc/rules';
import mechanicsService from '@/services/mechanics';
import logger from '@/misc/logger';

export default
{
  name: 'Mechanic',
  props: {
    item: Object,
    isReadonly: Boolean,
    isValidation: Boolean,
  },
  data: () => ({
    api: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    rules: {
        required: rules.required,
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
    'api.searchInput': debounce(async function searchInput(val) {
      if (this.api.isLoading) return;

      this.api.isLoading = true;

      mechanicsService.getNames({ filter: val })
      .then((res) => {
        this.api.values = res.data;
      })
      .catch((error) => {
        logger.error(error);
      })
      .finally(() => {
        this.api.isLoading = false;
      });
    }, 500, { maxWait: 5000 }),
  },
};
</script>
