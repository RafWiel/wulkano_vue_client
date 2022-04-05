<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column flex-nowrap"
    style="height: 100%">
    <v-form
      lazy-validation
      v-model="isFormValid"
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
                  {{ item.orderNumber }}
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
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.client.name"
                  label="Imię i Nazwisko"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Company -->
              <v-col cols="6" sm="4" md="3" lg="2" class="pl-2">
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.client.companyName"
                  label="Firma"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Phone number -->
              <v-col
                cols="12" sm="4" md="6" lg="8"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : ''">
                <v-text-field
                  v-model.lazy="item.client.phoneNumber"
                  label="Telefon kontaktowy"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
                <v-autocomplete
                  v-model="model"
                  :items="phoneNumbers"
                  :loading="api.isLoading"
                  :search-input.sync="api.phoneNumberSearch"
                  hide-no-data
                  hide-selected
                  item-text="Description"
                  item-value="API"
                  label="Telefon kontaktowy"
                  return-object
                  :rules="[rules.required]"/>
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
                class="mt-2"
                @change="addArrayObject(tire, item.tires, 5, {
                  width: '',
                  profile: '',
                  diameter: '',
                  dot: '',
                  brand: '',
                  tread: '',
                  note: ''
                })"/>
            </div>
            <v-row class="no-gutters mt-4">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.tires"
                  label="Opony"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.alloys"
                  label="Koła alu"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.steels"
                  label="Koła stalowe"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.screws"
                  label="Śruby"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.hubcups"
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
                  v-model.lazy="item.tiresNote"/>
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
                  ref="firstControl"
                  v-model.lazy="item.tiresLocation"
                  label="Położenie opon"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur/>
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
            <signature-field class="mt-2" />
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
            <signature-field class="mt-2"/>
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
              color="primary">
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
import TireInfo from '@/components/deposit/TireInfo.vue';
import SignatureField from '@/components/SignatureField.vue';

export default {
  name: 'DepositForm',
  components: {
    TireInfo,
    SignatureField,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map((key) => ({
        key,
        value: this.model[key] || 'n/a',
      }));
    },
    phoneNumbers() {
      return this.api.phoneNumbers.map((entry) => {
        const Description = entry.Description.length > this.api.descriptionLimit
          ? `${entry.Description.slice(0, this.api.descriptionLimit)}...`
          : entry.Description;

        return Object.assign(entry, { ...Description });
      });
    },
  },
  data: () => ({
    isFormValid: false,
    item: {
      id: 1,
      orderNumber: `D/${moment(new Date()).format('1/M/YYYY')}`,
      date: new Date(),
      client: {
        name: '',
        companyName: '',
        phoneNumber: '',
      },
      vehicle: {
        name: '',
        type: '',
        registrationNumber: '',
        mileage: '',
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
    },
    model: null,
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
    addArrayObject(item, array, maxCount, newItem) {
      //check if last item in array
      const index = array.indexOf(item);
      if (array.length >= maxCount || index < array.length - 1) {
        return;
      }

      //add new item
      array.push(newItem);
    },
  },
  watch: {
    'api.phoneNumberSearch': debounce(async function phoneNumberSearch(val) {
      console.log(val);
      // Items have already been loaded
      if (this.api.phoneNumbers.length > 0) return;

      // Items have already been requested
      if (this.api.isLoading) return;

      this.api.isLoading = true;

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
      .then((res) => res.json())
      .then((res) => {
        const { count, entries } = res;
        this.count = count;
        this.api.phoneNumbers = entries;
      })
      .catch((err) => {
        console.log(err);
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
