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
                  Zlecenie warsztatowe
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
      <!-- Company -->
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
              <!-- Company -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.company.name"
                  label="Firma"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Tax Id number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                class="pl-2">
                <v-text-field
                  v-model.lazy="item.company.taxId"
                  label="Telefon kontaktowy"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Phone number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : 'mt-2'">
                 <v-text-field
                  v-model.lazy="item.company.phoneNumber"
                  label="Telefon kontaktowy"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- City -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="companyCityClass">
                <v-text-field
                  v-model.lazy="item.company.city"
                  label="Miasto"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Description -->
              <v-col
                cols="12" sm="8" md="12" lg="4"
                :class="companyDescriptionClass">
                <v-text-field
                  v-model.lazy="item.description"
                  label="Cel wizyty"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Vehicle -->
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
                  Pojazd
                </h3>
              </v-col>
            </v-row>
            <!-- Vehicle name -->
            <v-row class="no-gutters">
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-text-field
                  v-model.lazy="item.vehicle.name"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Registration number -->
              <v-col cols="6" sm="8" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy="item.vehicle.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.lazy="item.vehicle.type"
                  label="Typ pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Mileage -->
              <v-col
                cols="6" sm="8" md="3" lg="6"
                class="pl-2"
                :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2'">
                <v-text-field
                  v-model.number="item.vehicle.mileage"
                  label="Przebieg"
                  type="number"
                  hide-spin-buttons
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Tires size -->
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
                  Rozmiar opon
                </h3>
              </v-col>
            </v-row>
            <!-- Tires -->
            <div
              v-for="(tire, index) in item.sizeTires"
              :key="index">
              <tire-measurement-info
                :item="tire"
                class="mt-2"
                @change="addArrayObject(tire, item.sizeTires, 18, {
                width: '',
                profile: '',
                diameter: '',
                pressure: '',
                tread: '' })"/>
            </div>
            <!-- Diagnostics -->
            <v-textarea
              label="Diagnostyka / zalecenia"
              hide-details="auto"
              validate-on-blur
              auto-grow
              class="mt-4"
              rows="1"
              v-model.lazy="item.tireDiagnostics"/>
          </v-col>
        </v-row>
      </v-card>
      <!-- Actions -->
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
                  Wykonane czynności
                </h3>
              </v-col>
            </v-row>
            <!-- Actions -->
            <service-action :item="item.actions.tiresInspection"/>
            <service-action :item="item.actions.pressureRegulation"/>
            <service-action :item="item.actions.wheelWashing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.wheelWashing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelUnscrewing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.wheelUnscrewing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.tireInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.tireInstallation.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelBalancing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.wheelBalancing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelWeights">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.wheelWeights.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelCentering"/>
            <service-action :item="item.actions.pinsCleaning"/>
            <service-action :item="item.actions.tighteningWithTorqueWrench"/>
            <service-action :item="item.actions.handingOverTighteningCard"/>
            <service-action :item="item.actions.pumping">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.pumping.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.valveChange">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.valveChange.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.extensionInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.extensionInstallation.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.deepening">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="item.actions.deepening.f"
                      label="F"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="item.actions.deepening.d"
                      label="D"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="item.actions.deepening.t"
                      label="T"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.actions.coldHotRepair">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.coldHotRepair.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.utilization">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.utilization.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.driveToClient">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.driveToClient.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.other">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.other.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
          </v-col>
        </v-row>
      </v-card>
      <!-- Installed tires -->
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
                  Opony założone
                </h3>
              </v-col>
            </v-row>
            <div
              v-for="(tire, index) in item.installedTires"
              :key="index">
              <tire-brand-info
                :item="tire"
                class="mt-2"
                @change="addArrayObject(tire, item.installedTires, 18, {
                width: '',
                profile: '',
                diameter: '',
                brand: '',
                tread: '',
                serial: ''
              })"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Other materials -->
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
                  Inne materiały
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-n4">
              <v-col>
                <v-textarea
                  label=""
                  hide-details="auto"
                  validate-on-blur
                  auto-grow
                  class="mt-2"
                  rows="1"
                  v-model.lazy="item.otherMaterials"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Dismantled tires -->
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
                  Opony zdemontowane
                </h3>
              </v-col>
            </v-row>
            <div
              v-for="(tire, index) in item.dismantledTires"
              :key="index">
              <tire-brand-info
                :item="tire"
                class="mt-2"
                @change="addArrayObject(tire, item.dismantledTires, 18, {
                width: '',
                profile: '',
                diameter: '',
                brand: '',
                tread: '',
                serial: ''
              })"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Recommendations -->
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
                  Zalecenia dotyczące pojazdu
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.recommendations.geometry"
                  label="Geometria"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.recommendations.shockAbsorbers"
                  label="Amortyzatory"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.recommendations.brakes"
                  label="Hamulce"
                  hide-details
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  class="shrink mt-0"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Next visit -->
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
                  Następna wizyta
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters">
              <v-col cols="3" md="2" lg="1">
                <v-menu
                  v-model="item.nextVisit.isDatePickerVisible"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  class="pa-0"
                  min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="item.nextVisit.date"
                      label="Data"
                      readonly
                      hide-details="auto"
                      v-bind="attrs"
                      v-on="on"/>
                  </template>
                  <v-date-picker
                    v-model="item.nextVisit.date"
                    no-title
                    locale="pl-pl"
                    @input="item.nextVisit.isDatePickerVisible = false"/>
                </v-menu>
              </v-col>
              <v-col class="ml-2">
                <v-text-field
                  v-model.lazy="item.nextVisit.description"
                  type="input"
                  label="Cel"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Mechanic -->
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
                  Mechanik
                </h3>
              </v-col>
            </v-row>
            <v-row
              v-for="(mechanic, index) in item.mechanics"
              :key="index"
              class="no-gutters mt-2">
              <v-col>
                <mechanic :item="mechanic" @change="addArrayObject(mechanic, item.mechanics, 5, {
                  name: '',
                })"/>
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
            <v-row class="no-gutters">
              <v-col>
                <p class="text-body-2 grey--text text--darken-1 ma-0 mt-1 pa-0">
                  UWAGA: Opony zdemontowane i pozostawione, po upływie 14 dni zostaną zutylizowane
                </p>
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
      <!-- Sale document -->
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
                  Dokument sprzedaży
                </h3>
              </v-col>
            </v-row>
            <v-row class="no-gutters">
              <v-col>
                <v-text-field
                  v-model.lazy="item.saleDocument"
                  label="Numer dokumentu"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import moment from 'moment';
import trucksService from '@/services/trucksService';
import signaturesService from '@/services/signaturesService';
import vehicleType from '@/enums/truck/vehicleType';
import TireMeasurementInfo from '@/components/truck/TireMeasurementInfo.vue';
import ServiceAction from '@/components/truck/ServiceAction.vue';
import TireBrandInfo from '@/components/truck/TireBrandInfo.vue';
import Mechanic from '@/components/Mechanic.vue';

export default {
  name: 'TruckServiceViewForm',
  props: { id: [String, Number] },
  components: {
    TireMeasurementInfo,
    ServiceAction,
    TireBrandInfo,
    Mechanic,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
    companyCityClass() {
      if (this.$vuetify.breakpoint.xs) return 'mt-2 pl-2';
      if (this.$vuetify.breakpoint.sm) return 'mt-2';
      if (this.$vuetify.breakpoint.mdAndUp) return 'pl-2';
      return '';
    },
    companyDescriptionClass() {
      if (this.$vuetify.breakpoint.xs) return 'mt-2';
      if (this.$vuetify.breakpoint.sm) return 'mt-2 pl-2';
      if (this.$vuetify.breakpoint.md) return 'mt-2';
      if (this.$vuetify.breakpoint.lgAndUp) return 'pl-2';
      return '';
    },
  },
  data: () => ({
    item: {
      company: {},
      vehicle: {},
      actions: {
        tiresInspection: {},
        pressureRegulation: {},
        wheelWashing: {},
        wheelUnscrewing: {},
        tireInstallation: {},
        wheelBalancing: {},
        wheelWeights: {},
        wheelCentering: {},
        pinsCleaning: {},
        tighteningWithTorqueWrench: {},
        handingOverTighteningCard: {},
        pumping: {},
        valveChange: {},
        extensionInstallation: {},
        deepening: {},
        coldHotRepair: {},
        utilization: {},
        driveToClient: {},
        other: {},
      },
      recommendations: {},
      nextVisit: {},
      signature: {},
    },
    actionsText: {
      tiresInspection: { text: 'Inspekcja stanu ogumienia' },
      pressureRegulation: { text: 'Regulacja ciśnienia' },
      wheelWashing: { text: 'Mycie koła' },
      wheelUnscrewing: { text: 'Odkręcanie koła' },
      tireInstallation: { text: 'Demontaż / montaż opony' },
      wheelBalancing: { text: 'Wyważanie' },
      wheelWeights: { text: 'Ciężarki' },
      wheelCentering: { text: 'Centrowanie koła' },
      pinsCleaning: { text: 'Czyszczenie / smarowanie szpilek' },
      tighteningWithTorqueWrench: { text: 'Dokręcanie kluczem dynamometrycznym' },
      handingOverTighteningCard: { text: 'Przekazanie karty dokręceń' },
      pumping: { text: 'Pompowanie' },
      valveChange: { text: 'Montaż / wymiana zaworu' },
      extensionInstallation: { text: 'Montaż przedłużki' },
      deepening: { text: 'Pogłębianie' },
      coldHotRepair: { text: 'Naprawa na zimno / gorąco' },
      utilization: { text: 'Utylizacja' },
      driveToClient: { text: 'Dojazd' },
      other: { text: 'Inne' },
    },
    employeeSignature: '',
    clientSignature: '',
    signatureWidth: 0,
  }),
  created() {
    // copy actions text
    Object.entries(this.actionsText).forEach(([key, value]) => {
      this.item.actions[key].text = value.text;
    });
  },
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

      // get item
      trucksService.getOne(this.id)
      .then((response) => {
        this.item = response.data.item;

        this.item.company = this.item.company || {};
        this.item.date = moment(this.item.date, 'YYYY-MM-DD hh:mm:ss.SSS Z').format('YYYY-MM-DD HH:mm');
        this.item.nextVisit.date = moment(this.item.nextVisit.date, 'YYYY-MM-DD hh:mm:ss.SSS Z').format('YYYY-MM-DD');
        this.item.vehicle.type = vehicleType.getText(this.item.vehicle.type);

        // copy actions text
        Object.entries(this.actionsText).forEach(([key, value]) => {
          this.item.actions[key].text = value.text;
        });

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
        this.$emit('showMessage', 'Zlecenie ciężarowe', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Zlecenie ciężarowe', error.response.data.message);
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
