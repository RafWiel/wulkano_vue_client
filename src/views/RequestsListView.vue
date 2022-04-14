<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column flex-nowrap"
    style="height: 100%">
    <!-- Filter -->
    <requests-filter
      :class="$vuetify.breakpoint.mdAndUp ? 'px-4 pt-4' : 'px-3 py-2'"
      @filter="filterData"/>
    <!-- Portrait sorting -->
    <requests-mobile-sorting
      v-if="$vuetify.breakpoint.xs"
      class="px-3 py-2"
      :columns="portraitColumns"
      @sort="sortData"/>
    <v-card
      flat
      class="grow"
      :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'px-3 py-2'">
      <data-grid
        :columns="columns"
        :items="items"
        :portraitCols="4"
        @itemClick="goToItem"
        @sort="sortData"/>
    </v-card>
  </v-container>
</template>

<script>

import moment from 'moment';
import rules from '@/misc/rules';
import requestsService from '@/services/requestsService';
import sortOrder from '@/enums/sortOrder';
import DataGrid from '@/components/DataGrid.vue';
import requestType from '@/enums/requestType';
import RequestsMobileSorting from '@/components/requests/RequestsMobileSorting.vue';
import RequestsFilter from '@/components/requests/RequestsFilter.vue';

export default {
  name: 'RequestsListView',
  components: {
    DataGrid,
    RequestsMobileSorting,
    RequestsFilter,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
    portraitColumns() {
      // filter headers for mobile portrait view
      return this.columns.filter((item) => item.limitedWidth !== undefined);
    },
  },
  data: () => ({
    items: [],
    currentPage: 1,
    sorting: {
      column: null,
      order: sortOrder.ascending,
    },
    columns: [
      {
        id: 0,
        text: 'Data',
        value: 'date',
        limitedWidth: 20,
        fullWidth: 15,
      },
      {
        id: 1,
        text: 'Numer zlecenia',
        value: 'requestName',
        limitedWidth: 14,
        fullWidth: 15,
      },
      {
        id: 2,
        text: 'Osoba',
        value: 'clientName',
        limitedWidth: 26,
        fullWidth: 15,
      },
      {
        id: 3,
        text: 'Firma',
        value: 'companyName',
        limitedWidth: 20,
        fullWidth: 15,
      },
      {
        id: 4,
        text: 'Telefon',
        value: 'phoneNumber',
        fullWidth: 15,
      },
      {
        id: 5,
        text: 'Typ zlecenia',
        value: 'requestType',
        limitedWidth: 14,
        fullWidth: 15,
      },
    ],
    api: {
      descriptionLimit: 60,
      phoneNumberSearch: null,
      phoneNumbers: [],
      isLoading: false,
    },

    rules: {
      required: rules.required,
      integer: rules.integer,
    },
  }),
  mounted() {
    if (Object.keys(this.$route.query).length === 0) {
      console.log('MOUNTED fetch');
      this.fetch();
    }
  },
  methods: {
    fetch() {
      console.log('fetch');
      // set loading icon
      this.$emit('isProcessing', true);

      requestsService.get({
        page: this.currentPage,
        'sort-column': this.sorting.column !== null ? this.sorting.column : null,
        'sort-order': this.sorting.column !== null ? this.sorting.order : null,
      })
      .then((response) => {
        this.$emit('isProcessing', false);

        console.log('currentPage', this.currentPage);
        console.log(response.data);

        if (response.data.requests.length) {
          // format values
          response.data.requests.forEach((element) => {
            const item = element;
            item.date = moment(item.date, 'YYYY-MM-DD hh:mm:ss.SSS Z').format('YYYY-MM-DD HH:mm');
            item.requestType = requestType.getText(item.requestType);
            //item.submitType = requestSubmitType.getText(item.submitType);
            //item.status = requestStatus.getText(item.status, this.$vuetify.breakpoint.xs);
            this.items.push(item);
          });
          // increment page number for next fetch
          this.currentPage += 1;
        }
      })
      .catch((error) => {
        console.log(error);
        this.$emit('isProcessing', false);

        if (error.response === undefined) {
          this.$emit('showMessage', 'Zlecenia serwisowe', 'Brak odpowiedzi z serwera');
          return;
        }

        console.log(error.response.data);
        this.$emit('showMessage', 'Zlecenia serwisowe', error.response.data.message);
      });
    },
    showError(error) {
      console.log(error);
      this.$emit('isProcessing', false);

      if (error.response === undefined) {
        this.$emit('showMessage', 'Depozyt', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Depozyt', error.response.data.message);
    },
    sortData(sorting) {
      this.items = [];
      this.currentPage = 1;
      this.sorting.column = sorting.column;
      this.sorting.order = sorting.order;

      // refresh with new sorting
      this.fetch();
    },
  },
};
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:330,400,600,800');

  .semibold {
    font-family: 'Montserrat' !important;
    font-weight: 600;
  }

  .text_ellipsis {
    //overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
