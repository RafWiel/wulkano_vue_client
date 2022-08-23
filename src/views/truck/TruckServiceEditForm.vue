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
                  v-model.lazy.trim="item.company.name"
                  label="Firma"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Tax Id number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                class="pl-2">
                <v-combobox
                  v-model="item.company.taxId"
                  :items="taxIdApi.values"
                  :loading="taxIdApi.isLoading"
                  :search-input.sync="taxIdApi.searchInput"
                  hide-details="auto"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="NIP"
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Phone number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : 'mt-2'">
                <v-combobox
                  v-model="item.company.phoneNumber"
                  :items="phoneApi.values"
                  :loading="phoneApi.isLoading"
                  :search-input.sync="phoneApi.searchInput"
                  hide-details="auto"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="Telefon kontaktowy"
                  :rules="[rules.required]"/>
              </v-col>
              <!-- City -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="companyCityClass">
                <v-text-field
                  v-model.lazy.trim="item.company.city"
                  label="Miasto"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Description -->
              <v-col
                cols="12" sm="8" md="12" lg="4"
                :class="companyDescriptionClass">
                <v-text-field
                  v-model.lazy.trim="item.description"
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
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-text-field
                  v-model.lazy.trim="item.vehicle.name"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Registration number -->
              <v-col cols="6" sm="8" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy.trim="item.vehicle.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-select
                  v-model="item.vehicle.type"
                  :items="vehicleTypeItems"
                  item-value="id"
                  hide-details="auto"
                  label="Typ pojazdu"
                  :rules="[rules.required]"/>
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
              v-for="(tire, index) in item.sizeTires"
              :key="index">
              <tire-measurement-info
                :item="tire"
                :isValidation="item.sizeTires.length == 1 || index < item.sizeTires.length - 1"
                @change="addArrayObject(tire, item.sizeTires, 18, {
                  width: '',
                  profile: '',
                  diameter: '',
                  pressure: '',
                  tread: '' })"
                class="mt-2"/>
            </div>
            <!-- Diagnostics -->
            <v-textarea
              label="Diagnostyka / zalecenia"
              hide-details="auto"
              validate-on-blur
              auto-grow
              class="mt-4"
              rows="1"
              v-model.lazy.trim="item.tireDiagnostics"/>
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
                  v-model.lazy.trim="item.actions.wheelWashing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelUnscrewing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.wheelUnscrewing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.tireInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.tireInstallation.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelBalancing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.wheelBalancing.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.wheelWeights">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.wheelWeights.extraInfo"
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
                  v-model.lazy.trim="item.actions.pumping.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.valveChange">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.valveChange.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.extensionInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.extensionInstallation.extraInfo"
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
                  v-model.lazy.trim="item.actions.coldHotRepair.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.utilization">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.utilization.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.driveToClient">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.driveToClient.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.other">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy.trim="item.actions.other.extraInfo"
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
                :isValidation="item.installedTires.length == 1 || index < item.installedTires.length - 1"
                @change="addArrayObject(tire, item.installedTires, 18, {
                  width: '',
                  profile: '',
                  diameter: '',
                  brand: '',
                  tread: '',
                  serial: ''
                })"
                class="mt-2"/>
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
                  v-model.lazy.trim="item.otherMaterials"/>
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
                :isValidation="item.dismantledTires.length == 1 || index < item.dismantledTires.length - 1"
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
                  v-model.lazy.trim="item.nextVisit.description"
                  type="input"
                  label="Cel"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Mechanics -->
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
                <mechanic
                  :item="mechanic"
                  :isValidation="item.mechanics.length == 1 || index < item.mechanics.length - 1"
                  @change="addArrayObject(mechanic, item.mechanics, 5, {
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
            <v-row class="no-gutters">
              <v-col>
                <p class="text-body-2 grey--text text--darken-1 ma-0 mt-1 pa-0">
                  UWAGA: Opony zdemontowane i pozostawione, po upływie 14 dni zostaną zutylizowane
                </p>
              </v-col>
            </v-row>
            <signature-field
              ref="clientSignature"
              class="mt-2"/>
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
                  v-model.lazy.trim="item.saleDocument"
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
import vehicleType from '@/enums/truck/vehicleType';
//import tireLocation from '@/enums/truck/tireLocation';
import companiesService from '@/services/companies';
import trucksService from '@/services/trucks';
import TireMeasurementInfo from '@/components/truck/TireMeasurementInfo.vue';
import ServiceAction from '@/components/truck/ServiceAction.vue';
import TireBrandInfo from '@/components/truck/TireBrandInfo.vue';
import SignatureField from '@/components/SignatureField.vue';
import Mechanic from '@/components/truck/Mechanic.vue';

export default {
  name: 'TruckServiceEditForm',
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
    vehicleTypeItems: vehicleType.items,
    item: null,
    newItem: {
      requestName: 'Nowe zlecenie',
      date: new Date(),
      company: {
        name: '',
        taxId: '',
        phoneNumber: '',
        city: '',
      },
      vehicle: {
        name: '',
        type: 0,
        registrationNumber: '',
        mileage: '',
      },
      description: 'Opis',
      sizeTires: [
        {
          location: null,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
        },
      ],
      tireDiagnostics: '',
      actions: {
        tiresInspection: {
          isChecked: false,
          text: 'Inspekcja stanu ogumienia',
          count: '',
          info: '',
        },
        pressureRegulation: {
          isChecked: false,
          text: 'Regulacja ciśnienia',
          count: '',
          info: '',
        },
        wheelWashing: {
          isChecked: false,
          text: 'Mycie koła',
          count: '',
          info: '',
          extraInfo: '',
        },
        wheelUnscrewing: {
          isChecked: false,
          text: 'Odkręcanie koła',
          count: '',
          info: '',
          extraInfo: '',
        },
        tireInstallation: {
          isChecked: false,
          text: 'Demontaż / montaż opony',
          count: '',
          info: '',
          extraInfo: '',
        },
        wheelBalancing: {
          isChecked: false,
          text: 'Wyważanie',
          count: '',
          info: '',
          extraInfo: '',
        },
        wheelWeights: {
          isChecked: false,
          text: 'Ciężarki',
          count: '',
          info: '',
          extraInfo: '',
        },
        wheelCentering: {
          isChecked: false,
          text: 'Centrowanie koła',
          count: '',
          info: '',
        },
        pinsCleaning: {
          isChecked: false,
          text: 'Czyszczenie / smarowanie szpilek',
          count: '',
          info: '',
        },
        tighteningWithTorqueWrench: {
          isChecked: false,
          text: 'Dokręcanie kluczem dynamometrycznym',
          count: '',
          info: '',
        },
        handingOverTighteningCard: {
          isChecked: false,
          text: 'Przekazanie karty dokręceń',
          count: '',
          info: '',
        },
        pumping: {
          isChecked: false,
          text: 'Pompowanie',
          count: '',
          info: '',
          extraInfo: '',
        },
        valveChange: {
          isChecked: false,
          text: 'Montaż / wymiana zaworu',
          count: '',
          info: '',
          extraInfo: '',
        },
        extensionInstallation: {
          isChecked: false,
          text: 'Montaż przedłużki',
          count: '',
          info: '',
          extraInfo: '',
        },
        deepening: {
          isChecked: false,
          text: 'Pogłębianie',
          count: '',
          info: '',
          F: false,
          D: false,
          T: false,
        },
        coldHotRepair: {
          isChecked: false,
          text: 'Naprawa na zimno / gorąco',
          count: '',
          info: '',
          extraInfo: '',
        },
        utilization: {
          isChecked: false,
          text: 'Utylizacja',
          count: '',
          info: '',
          extraInfo: '',
        },
        driveToClient: {
          isChecked: false,
          text: 'Dojazd',
          count: '',
          info: '',
          extraInfo: '',
        },
        other: {
          isChecked: false,
          text: 'Inne',
          count: '',
          info: '',
          extraInfo: '',
        },
      },
      installedTires: [
        {
          location: null,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
          brand: '',
          serial: '',
        },
      ],
      otherMaterials: '',
      dismantledTires: [
        {
          location: null,
          width: '',
          profile: '',
          diameter: '',
          pressure: '',
          tread: '',
          brand: '',
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
        description: '',
      },
      mechanics: [
        { name: '' },
      ],
      saleDocument: '',
      signature: {
        employee: null,
        client: null,
      },
    },
    phoneApi: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    taxIdApi: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
    rules: {
      required: rules.required,
      integer: rules.integer,
    },
  }),
  created() {
    //deep copy
    this.item = JSON.parse(JSON.stringify(this.newItem));
  },
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

        const response = await trucksService.create(vm.item);

        if (response.data.result) {
          vm.$emit('isProcessing', false);
          vm.$emit('showMessage', 'Zlecenie ciężarowe', 'Zlecenie zapisane');
          vm.resetForm();
          vm.$vuetify.goTo(0);

          return;
        }

        vm.$emit('showMessage', 'Zlecenie ciężarowe', 'Nieudany zapis');
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
        this.$emit('showMessage', 'Zlecenie ciężarowe', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Zlecenie ciężarowe', error.response.data.message);
    },
    resetForm() {
      const vm = this;

      //deep copy
      this.item = JSON.parse(JSON.stringify(this.newItem));

      vm.$refs.employeeSignature.resetCanvas();
      vm.$refs.clientSignature.resetCanvas();
      vm.$refs.form.reset();
    },
  },
  watch: {
    'phoneApi.searchInput': debounce(async function searchInput(val) {
      if (this.phoneApi.isLoading) return;

      this.phoneApi.isLoading = true;

      companiesService.getPhoneNumbers({ filter: val })
      .then((res) => {
        this.phoneApi.values = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.phoneApi.isLoading = false;
      });
    }, 500, { maxWait: 5000 }),
    'taxIdApi.searchInput': debounce(async function searchInput(val) {
      if (this.taxIdApi.isLoading) return;

      this.taxIdApi.isLoading = true;

      companiesService.getTaxIdNumbers({ filter: val })
      .then((res) => {
        this.taxIdApi.values = res.data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.taxIdApi.isLoading = false;
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
