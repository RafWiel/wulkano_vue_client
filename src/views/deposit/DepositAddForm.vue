<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column flex-nowrap"
    style="height: 100%">
    <v-form
      ref="form"
      lazy-validation
      v-formFocusNextOnEnter>
      <!-- Header -->
      <v-card
        flat
        color="light-blue darken-3"
        :rounded="$vuetify.breakpoint.mdAndUp ? 'md' : '0'"
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-2 mt-0'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters" align="center">
              <v-col
                cols="12"
                md="4"
                :class="$vuetify.breakpoint.mdAndUp ? 'text-left' : 'text-center'">
                <p class="grey--text text--lighten-2 text-h5 ma-0 semibold">
                  Depozyt
                </p>
              </v-col>
              <v-col
                cols="12"
                md="4"
                class="text-center">
                <p class="white--text text-h4 ma-0 semibold">
                  {{ item.requestName }}
                </p>
              </v-col>
              <v-col
                cols="12"
                md="4"
                :class="$vuetify.breakpoint.mdAndUp ? 'text-right' : 'text-center'">
                <p
                  :class="$vuetify.breakpoint.mdAndUp ? 'text-h5' : 'text-h6'"
                  class="grey--text text--lighten-2 ma-0 semibold">
                  {{ date }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Client -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-0'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1" >
                  Dane klienta
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <!-- Name -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-combobox
                  :items="nameApi.values"
                  :loading="nameApi.isLoading"
                  :search-input.sync="nameApi.searchInput"
                  :rules="[rules.required]"
                  @change="getClientByName(item.client.name)"
                  ref="clientName"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="Imię i nazwisko"
                  v-model="item.client.name"/>
              </v-col>
              <!-- Company -->
              <v-col cols="6" sm="4" md="3" lg="2" class="pl-2">
                <v-combobox
                  :items="companyNameApi.values"
                  :loading="companyNameApi.isLoading"
                  :search-input.sync="companyNameApi.searchInput"
                  @change="getClientByCompanyName(item.client.companyName)"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="Firma"
                  v-model="item.client.companyName"/>
              </v-col>
              <!-- Phone number -->
              <v-col
                cols="12" sm="4" md="6" lg="8"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : ''">
                <v-combobox
                  :items="phoneNumberApi.values"
                  :loading="phoneNumberApi.isLoading"
                  :search-input.sync="phoneNumberApi.searchInput"
                  :rules="[rules.required, rules.phoneNumber]"
                  @change="getClientByPhoneNumber(item.client.phoneNumber)"
                  ref="clientPhoneNumber"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="Telefon kontaktowy"
                  v-model="item.client.phoneNumber"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Tires -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1">
                  Opony
                </h3>
              </v-col>
            </v-row>
            <!-- Tires -->
            <div
              v-for="(tire, index) in item.tires"
              :key="index">
              <tire-info
                :item="tire"
                :isValidation="tire.width !== null || tire.profile !== null || tire.diameter !== null"
                class="mt-2"
                @change="addArrayObject(tire, item.tires, 5, {
                  width: null,
                  profile: null,
                  diameter: null,
                  dot: null,
                  brand: null,
                  tread: null,
                  note: null
                })"/>
            </div>
            <v-row class="no-gutters mt-4">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isTires"
                  label="Opony"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isAlloys"
                  label="Koła alu"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isSteels"
                  label="Koła stalowe"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isScrews"
                  label="Śruby"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isHubcups"
                  label="Kołpaki"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-textarea
                  label="Uwagi"
                  hide-details="auto"
                  validate-on-blur
                  auto-grow
                  rows="1"
                  v-model.lazy.trim="item.tiresNote"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Location -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1">
                  Przechowalnia
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy.trim="item.tiresLocation"
                  label="Położenie opon"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Employee signature -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1">
                  Podpis pracownika
                </h3>
              </v-col>
            </v-row>
            <signature-field
              ref="employeeSignature"
              class="mt-2" />
          </v-col>
        </v-row>
      </v-card>
      <!-- Client signature -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1">
                  Podpis klienta
                </h3>
              </v-col>
            </v-row>
            <signature-field
              ref="clientSignature"
              class="mt-2"/>
          </v-col>
        </v-row>
      </v-card>
      <!-- Apply button -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters" justify="end">
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-btn
              depressed
              block
              class="save-btn"
              @click="save">
              Zapisz
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import debounce from 'lodash.debounce';
import moment from 'moment';
import rules from '@/misc/rules';
import clientsService from '@/services/clients';
import depositsService from '@/services/deposits';
import TireInfo from '@/components/deposit/TireInfo.vue';
import SignatureField from '@/components/SignatureField.vue';
import logger from '@/misc/logger';

export default {
  name: 'DepositAddForm',
  components: {
    TireInfo,
    SignatureField,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    isFormReset: false,
    item: null,
    newItem: {
      requestName: 'Nowe zlecenie',
      // date: new Date(),
      client: {
        name: null,
        companyName: null,
        phoneNumber: null,
        email: null,
      },
      tires: [
        {
          width: null,
          profile: null,
          diameter: null,
          dot: null,
          brand: null,
          tread: null,
          note: null,
        },
      ],
      isTires: false,
      isAlloys: false,
      isSteels: false,
      isScrews: false,
      isHubcups: false,
      tiresNote: null,
      tiresLocation: null,
      signature: {
        employee: null,
        client: null,
      },
    },
    nameApi: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    companyNameApi: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    phoneNumberApi: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    rules: {
      required: rules.required,
      integer: rules.integer,
      phoneNumber: rules.phoneNumber,
    },
  }),
  created() {
    //deep copy
    this.item = JSON.parse(JSON.stringify(this.newItem));
  },
  methods: {
    async save() {
      //validation
      const v1 = this.$refs.form.validate();
      const v2 = this.$refs.employeeSignature.validate();
      const v3 = this.$refs.clientSignature.validate();
      if (!v1 || !v2 || !v3) {
        this.$nextTick(() => {
          const el = this.$el.querySelector('.v-messages.error--text:first-of-type');

          this.$vuetify.goTo(el, { offset: 60 });
        });

        return;
      }

      try {
        this.$emit('isProcessing', true);

        this.item.signature.employee = this.$refs.employeeSignature.getImageData();
        this.item.signature.client = this.$refs.clientSignature.getImageData();

        // console.log(JSON.stringify(this.item));

        const response = await depositsService.create(this.item);

        if (response.data.result) {
          this.$emit('isProcessing', false);
          this.$emit('showMessage', 'Depozyt', 'Zlecenie zapisane');
          this.resetForm();
          this.$vuetify.goTo(0);

          return;
        }

        this.$emit('showMessage', 'Depozyt', 'Nieudany zapis');
      }
      catch (error) {
        this.processError(error);
      }

      this.$emit('isProcessing', false);
    },
    addArrayObject(item, array, maxCount, newItem) {
      if (this.isFormReset === true) return;

      //check if last item in array
      const index = array.indexOf(item);
      if (array.length >= maxCount || index < array.length - 1) return;

      //add new item
      array.push(newItem);
    },
    processError(error) {
      logger.error(error);
      this.$emit('isProcessing', false);

      if (error.response === undefined) {
        this.$emit('showMessage', 'Depozyt', 'Brak odpowiedzi z serwera');
        return;
      }

      logger.error(error.response.data);
      this.$emit('showMessage', 'Depozyt', error.response.data.message);
    },
    resetForm() {
      this.isFormReset = true;

      //deep copy
      this.item = JSON.parse(JSON.stringify(this.newItem));

      this.$refs.employeeSignature.resetCanvas();
      this.$refs.clientSignature.resetCanvas();
      this.$refs.form.reset();

      setTimeout(() => {
        this.isFormReset = false;
      }, 1000);
    },
    getClientByName(name) {
      if (this.nameApi.isLoading) return;

      this.nameApi.isLoading = true;

      clientsService.getFirst({ name })
      .then((res) => {
        if (!res.data.id) return;

        if (!this.item.client.companyName && !this.item.client.phoneNumber) {
          const { companyName, phoneNumber } = res.data;

          this.item.client.companyName = companyName;
          this.item.client.phoneNumber = phoneNumber;

          this.$refs.clientPhoneNumber.resetValidation();
        }
      })
      .catch((error) => logger.error(error))
      .finally(() => {
        this.nameApi.isLoading = false;
      });
    },
    getClientByCompanyName(companyName) {
      if (this.companyNameApi.isLoading) return;

      this.companyNameApi.isLoading = true;

      clientsService.getFirst({ 'company-name': companyName })
      .then((res) => {
        if (!res.data.id) return;

        if (!this.item.client.name && !this.item.client.phoneNumber) {
          const { name, phoneNumber } = res.data;

          this.item.client.name = name;
          this.item.client.phoneNumber = phoneNumber;

          this.$refs.clientName.resetValidation();
          this.$refs.clientPhoneNumber.resetValidation();
        }
      })
      .catch((error) => logger.error(error))
      .finally(() => {
        this.companyNameApi.isLoading = false;
      });
    },
    getClientByPhoneNumber(phoneNumber) {
      if (this.phoneNumberApi.isLoading) return;

      this.phoneNumberApi.isLoading = true;

      clientsService.getFirst({ 'phone-number': phoneNumber })
      .then((res) => {
        if (!res.data.id) return;

        if (!this.item.client.name && !this.item.client.companyName) {
          const { name, companyName } = res.data;

          this.item.client.name = name;
          this.item.client.companyName = companyName;

          this.$refs.clientName.resetValidation();
        }
      })
      .catch((error) => logger.error(error))
      .finally(() => {
        this.phoneNumberApi.isLoading = false;
      });
    },
  },
  watch: {
    'nameApi.searchInput': debounce(async function searchInput(val) {
      if (this.nameApi.isLoading) return;

      this.nameApi.isLoading = true;

      clientsService.getNames({ filter: val })
      .then((res) => {
        this.nameApi.values = res.data;
      })
      .catch((error) => logger.error(error))
      .finally(() => {
        this.nameApi.isLoading = false;
      });
    }, 500, { maxWait: 5000 }),
    'companyNameApi.searchInput': debounce(async function searchInput(val) {
      if (this.companyNameApi.isLoading) return;

      this.companyNameApi.isLoading = true;

      clientsService.getCompanyNames({ filter: val })
      .then((res) => {
        this.companyNameApi.values = res.data;
      })
      .catch((error) => logger.error(error))
      .finally(() => {
        this.companyNameApi.isLoading = false;
      });
    }, 500, { maxWait: 5000 }),
    'phoneNumberApi.searchInput': debounce(async function searchInput(val) {
      if (this.phoneNumberApi.isLoading) return;

      this.phoneNumberApi.isLoading = true;

      clientsService.getPhoneNumbers({ filter: val })
      .then((res) => {
        this.phoneNumberApi.values = res.data;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.phoneNumberApi.isLoading = false;
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
