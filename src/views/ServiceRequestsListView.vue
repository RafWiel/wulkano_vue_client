<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column flex-nowrap"
    style="height: 100%">
    <v-card
      flat
      class="grow"
      :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
      <data-grid
        :columns="columns"
        :items="items"
        :portraitCols="2"
        @itemClick="goToItem"
        @sort="sortData"/>
    </v-card>
  </v-container>
</template>

<script>
import debounce from 'lodash.debounce';
import moment from 'moment';
import rules from '@/misc/rules';
import clientService from '@/services/clientService';
import depositService from '@/services/depositService';
import sortOrder from '@/enums/sortOrder';
import DataGrid from '@/components/DataGrid.vue';

export default {
  name: 'ServiceRequestsListView',
  components: {
    DataGrid,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    items: [],
    sorting: {
      column: null,
      order: sortOrder.ascending,
    },
    columns: [
      {
        id: 0,
        text: 'Data',
        value: 'creationDate',
        limitedWidth: 20,
        fullWidth: 14,
      },
      {
        id: 1,
        text: 'Numer',
        value: 'name',
        limitedWidth: 14,
        fullWidth: 10,
      },
      {
        id: 2,
        text: 'Temat',
        value: 'topic',
        limitedWidth: 26,
        fullWidth: 15,
      },
      {
        id: 3,
        text: 'Zgłaszający',
        value: 'customer',
        fullWidth: 11,
      },
      {
        id: 4,
        text: 'Firma',
        value: 'company',
        limitedWidth: 20,
        fullWidth: 12,
      },
      {
        id: 5,
        text: 'Odpowiedzialny',
        value: 'employee',
        fullWidth: 11,
      },
      {
        id: 6,
        text: 'Typ',
        value: 'type',
        fullWidth: 8,
      },
      {
        id: 7,
        text: 'Źródło',
        value: 'submitType',
        fullWidth: 8,
      },
      {
        id: 8,
        text: 'Status',
        value: 'status',
        limitedWidth: 20,
        fullWidth: 11,
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
  methods: {
    async save() {
      const vm = this;

      //validation
      const v1 = vm.$refs.form.validate();
      const v2 = vm.$refs.employeeSignature.validate();
      const v3 = vm.$refs.clientSignature.validate();
      if (!v1 || !v2 || !v3) {
        this.$nextTick(() => {
          const el = this.$el.querySelector('.v-messages.error--text:first-of-type');

          this.$vuetify.goTo(el, { offset: 60 });
        });

        return;
      }

      try {
        vm.$emit('isProcessing', true);

        vm.item.signature.employee = vm.$refs.employeeSignature.getImageData();
        vm.item.signature.client = vm.$refs.clientSignature.getImageData();

        const response = await depositService.create(vm.item);

        if (response.data.result) {
          vm.$emit('isProcessing', false);
          vm.$emit('showMessage', 'Depozyt', 'Zlecenie zapisane');
          vm.resetForm();

          return;
        }

        vm.$emit('showMessage', 'Depozyt', 'Nieudany zapis');
      }
      catch (error) {
        vm.showError(error);
      }

      vm.$emit('isProcessing', false);
    },
    addArrayObject(item, array, maxCount, newItem) {
      //check if last item in array
      const index = array.indexOf(item);
      if (array.length >= maxCount || index < array.length - 1) {
        return;
      }

      //add new item
      array.push(newItem);
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
    resetForm() {
      const vm = this;

      vm.item = {
        id: 1,
        orderNumber: `D/${moment(new Date()).format('1/M/YYYY')}`,
        date: new Date(),
        client: {
          name: '',
          companyName: '',
          phoneNumber: '',
        },
        tires: [
          {
            width: '',
            profile: '',
            diameter: '',
            dot: '',
            brand: '',
            tread: '',
            note: '',
          },
        ],
        deposit: {
          tires: false,
          alloys: false,
          steels: false,
          screws: false,
          hubcups: false,
        },
        tiresNote: '',
        tiresLocation: '',
        signature: {
          employee: null,
          client: null,
        },
      };

      vm.$refs.employeeSignature.resetCanvas();
      vm.$refs.clientSignature.resetCanvas();
      vm.$refs.form.reset();
    },
  },
  watch: {
    'api.phoneNumberSearch': debounce(async function phoneNumberSearch(val) {
      if (this.api.isLoading) return;

      this.api.isLoading = true;

      clientService.getPhoneNumbers({ filter: val })
      .then((res) => {
        this.api.phoneNumbers = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.api.isLoading = false;
      });
    }, 500, { maxWait: 5000 }),
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
