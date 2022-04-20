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
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.client.name"
                  label="Imię i Nazwisko"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Company -->
              <v-col cols="6" sm="4" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy="item.client.companyName"
                  label="Firma"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Phone number -->
              <v-col
                cols="12" sm="4" md="6" lg="8"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : ''">
                <v-text-field
                  v-model.lazy="item.client.phoneNumber"
                  label="Telefon kontaktowy"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
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
                isValidation="false"
                isReadonly="true"
                class="mt-2"/>
            </div>
            <v-row class="no-gutters mt-4">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isTires"
                  label="Opony"
                  hide-details
                  readonly
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isAlloys"
                  label="Koła alu"
                  hide-details
                  readonly
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isSteels"
                  label="Koła stalowe"
                  hide-details
                  readonly
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isScrews"
                  label="Śruby"
                  hide-details
                  readonly
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.isHubcups"
                  label="Kołpaki"
                  hide-details
                  readonly
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-textarea
                  label="Uwagi"
                  hide-details
                  validate-on-blur
                  auto-grow
                  rows="1"
                  readonly
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
                  v-model.lazy="item.tiresLocation"
                  label="Położenie opon"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
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
            <v-img
              :src="employeeSignature"
              width="100%"
              height="200px"
              contain
              class="mt-2 signature-image"/>
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
            <v-img
              :src="clientSignature"
              width="100%"
              height="200px"
              contain
              class="mt-2 signature-image"/>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment';
import depositsService from '@/services/depositsService';
import signaturesService from '@/services/signaturesService';
import TireInfo from '@/components/deposit/TireInfo.vue';

export default {
  name: 'DepositViewForm',
  props: { id: [String, Number] },
  components: {
    TireInfo,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    item: {
      client: {},
      tires: [],
    },
    employeeSignature: '',
    clientSignature: '',
    signatureWidth: 0,
  }),
  mounted() {
    this.fetch();

    //adjust image width
    window.addEventListener('resize', this.resize);
    this.resize();
  },
  methods: {
    fetch() {
      // set loading icon
      this.$emit('isProcessing', true);

      // get deposit
      depositsService.getOne(this.id)
      .then((response) => {
        this.item = response.data.deposit;

        //console.log(this.item);

        this.item.client = this.item.client || {};
        this.item.date = moment(this.item.date, 'YYYY-MM-DD hh:mm:ss.SSS Z').format('YYYY-MM-DD HH:mm');

        //get employee signature
        signaturesService.get({
          dir: this.item.directoryId,
          sig: this.item.employeeSignatureFileName,
        })
        .then((res) => {
          this.employeeSignature = `data:image/png;base64,${res.data}`;
        })
        .catch((error) => {
          console.log(error);
        });

        //get client signature
        signaturesService.get({
          dir: this.item.directoryId,
          sig: this.item.clientSignatureFileName,
        })
        .then((res) => {
          this.clientSignature = `data:image/png;base64,${res.data}`;
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        this.showError(error);
      });

      this.$emit('isProcessing', false);
    },
    resize() {
      this.signatureWidth = this.getSignatureWidth();
    },
    getSignatureWidth() {
      return document.documentElement.clientWidth - (this.$vuetify.breakpoint.mdAndUp ? 68 : 0);
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

  .signature-image {
    border: 1px solid #808080;
  }

</style>
