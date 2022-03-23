<template>
  <v-container
    fluid
    class="pa-0 d-flex flex-column flex-nowrap"
    style="height: 100%">
    <v-form
      lazy-validation
      v-model="isFormValid"
      v-formFocusFirstOnLoad="true"
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
              <!-- Company -->
              <v-col cols="6" md="3" lg="2">
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.companyName"
                  label="Firma"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- City -->
              <v-col cols="6" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy="item.city"
                  label="Miasto"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Description -->
              <v-col
                cols="12" md="6" lg="8"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.lazy="item.description"
                  label="Cel wizyty"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
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
              <v-col cols="6" md="3" lg="2">
                <v-text-field
                  v-model.lazy="item.vehicleName"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Registration number -->
              <v-col cols="6" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy="item.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" md="3" lg="2"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-select
                  v-model="item.vehicleType"
                  :items="vehicleTypeItems"
                  item-value="id"
                  hide-details="auto"
                  label="Typ pojazdu"/>
              </v-col>
              <!-- Mileage -->
              <v-col
                cols="6" md="3" lg="6"
                class="pl-2"
                :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-2'">
                <v-text-field
                  v-model.number="item.mileage"
                  label="Przebieg"
                  type="number"
                  hide-spin-buttons
                  single-line
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.integer, rules.required]"/>
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
              v-for="(tire, index) in item.tires"
              :key="index">
              <tire-measurement-info :item="tire" @change="addArrayObject(tire, item.tires, 18, {
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
              class="mt-2"
              rows="4"
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
                  Czynności wykonane
                </h3>
              </v-col>
            </v-row>
            <!-- Actions -->
            <service-action :item="actions.tireInspection"/>
            <service-action :item="actions.pressureRegulation"/>
            <service-action :item="actions.wheelWashing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelWashing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelUnscrewing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelUnscrewing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.tireInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.tireInstallation.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelBalancing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelBalancing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelWeights">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelWeights.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelCentering"/>
            <service-action :item="actions.pinsCleaning"/>
            <service-action :item="actions.tighteningWithTorqueWrench"/>
            <service-action :item="actions.handingOverTighteningCard"/>
            <service-action :item="actions.pumping">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.pumping.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.valveChange">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.valveChange.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.extensionInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.extensionInstallation.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.deepening">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.F"
                      label="F"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.D"
                      label="D"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.T"
                      label="T"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="actions.coldHotRepair">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.coldHotRepair.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.utilization">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.utilization.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.drive">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.drive.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.other">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.other.extraInfo"
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
              <tire-brand-info :item="tire" @change="addArrayObject(tire, item.installedTires, 18, {
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
            <div
              v-for="(material, index) in item.materials"
              :key="index">
              <v-row class="no-gutters mt-n4">
                <v-col>
                  <v-text-field
                    v-model.lazy="material.item"
                    type="input"
                    hide-details="auto"
                    validate-on-blur/>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Deinstalled tires -->
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
              v-for="(tire, index) in item.deinstalledTires"
              :key="index">
              <tire-brand-info :item="tire" @change="addArrayObject(tire, item.deinstalledTires, 18, {
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
                  v-model.lazy="item.nextVisit.purpose"
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
            <v-row class="no-gutters">
              <v-col>
                <p class="text-body-2 grey--text text--darken-1 ma-0 mt-1 pa-0">
                  UWAGA: Opony zdemontowane i pozostawione, po upływie 14 dni zostaną zutylizowane
                </p>
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
import moment from 'moment';
import rules from '@/misc/rules';
import vehicleType from '@/enums/vehicleType';
import tireLocation from '@/enums/tireLocation';
import TireMeasurementInfo from '@/components/TireMeasurementInfo.vue';
import ServiceAction from '@/components/ServiceAction.vue';
import TireBrandInfo from '@/components/TireBrandInfo.vue';
import SignatureField from '@/components/SignatureField.vue';
import Mechanic from '@/components/Mechanic.vue';

export default {
  name: 'OrderForm',
  components: {
    TireMeasurementInfo,
    ServiceAction,
    TireBrandInfo,
    SignatureField,
    Mechanic,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    isFormValid: false,
    vehicleTypeItems: vehicleType.items,
    item: {
      id: 1,
      orderNumber: moment(new Date()).format('1/M/YYYY'),
      date: new Date(),
      companyName: '',
      city: '',
      vehicleName: '',
      registrationNumber: '',
      mileage: 0,
      description: '',
      tires: [
        {
          location: tireLocation.leftAxle1,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.rightAxle1,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.leftOutsideAxle2,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.rightOutsideAxle2,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
        },
      ],
      tireDiagnostics: '',
      installedTires: [
        {
          width: '',
          profile: '',
          diameter: '',
          brand: '',
          tread: '',
          serial: '',
        },
      ],
      materials: [
        {
          item: '',
        },
      ],
      deinstalledTires: [
        {
          width: '',
          profile: '',
          diameter: '',
          brand: '',
          tread: '',
          serial: '',
        },
      ],
      recommendations: {
        geometry: false,
        shockAbsorbers: false,
        brakes: false,
      },
      nextVisit: {
        isDatePickerVisible: false,
        date: '',
        purpose: '',
      },
      mechanics: [
        { name: '' },
      ],
    },
    actions: {
      tireInspection: {
        isChecked: false,
        text: 'Inspekcja stanu ogumienia',
        count: 0,
        info: '',
      },
      pressureRegulation: {
        isChecked: false,
        text: 'Regulacja ciśnienia',
        count: 0,
        info: '',
      },
      wheelWashing: {
        isChecked: false,
        text: 'Mycie koła',
        count: 0,
        info: '',
        extraInfo: '',
      },
      wheelUnscrewing: {
        isChecked: false,
        text: 'Odkręcanie koła',
        count: 0,
        info: '',
        extraInfo: '',
      },
      tireInstallation: {
        isChecked: false,
        text: 'Demontaż / montaż opony',
        count: 0,
        info: '',
        extraInfo: '',
      },
      wheelBalancing: {
        isChecked: false,
        text: 'Wyważanie',
        count: 0,
        info: '',
        extraInfo: '',
      },
      wheelWeights: {
        isChecked: false,
        text: 'Ciężarki',
        count: 0,
        info: '',
        extraInfo: '',
      },
      wheelCentering: {
        isChecked: false,
        text: 'Centrowanie koła',
        count: 0,
        info: '',
      },
      pinsCleaning: {
        isChecked: false,
        text: 'Czyszczenie / smarowanie szpilek',
        count: 0,
        info: '',
      },
      tighteningWithTorqueWrench: {
        isChecked: false,
        text: 'Dokręcanie kluczem dynamometrycznym',
        count: 0,
        info: '',
      },
      handingOverTighteningCard: {
        isChecked: false,
        text: 'Przekazanie karty dokręceń',
        count: 0,
        info: '',
      },
      pumping: {
        isChecked: false,
        text: 'Pompowanie',
        count: 0,
        info: '',
        extraInfo: '',
      },
      valveChange: {
        isChecked: false,
        text: 'Montaż / wymiana zaworu',
        count: 0,
        info: '',
        extraInfo: '',
      },
      extensionInstallation: {
        isChecked: false,
        text: 'Montaż przedłużki',
        count: 0,
        info: '',
        extraInfo: '',
      },
      deepening: {
        isChecked: false,
        text: 'Pogłębianie',
        count: 0,
        info: '',
        F: false,
        D: false,
        T: false,
      },
      coldHotRepair: {
        isChecked: false,
        text: 'Naprawa na zimno / gorąco',
        count: 0,
        info: '',
        extraInfo: '',
      },
      utilization: {
        isChecked: false,
        text: 'Utylizacja',
        count: 0,
        info: '',
        extraInfo: '',
      },
      drive: {
        isChecked: false,
        text: 'Dojazd',
        count: 0,
        info: '',
        extraInfo: '',
      },
      other: {
        isChecked: false,
        text: 'Inne',
        count: 0,
        info: '',
        extraInfo: '',
      },
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
