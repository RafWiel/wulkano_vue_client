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
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
          <!-- Content column -->
          <v-col cols="12" class="pa-0">
            <!-- Title -->
            <v-row class="no-gutters">
              <v-col>
                <h3 class="primary--text text--darken-1">
                  Zlecenie warsztatowe
                </h3>
              </v-col>
            </v-row>
            <!-- Number -->
            <v-row class="no-gutters">
              <v-col>
                <v-text-field
                  v-model.lazy="item.orderNumber"
                  label="Numer (todo: wyeksponuj)"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Date -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy="item.date"
                  label="Data (todo: wyeksponuj)"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Company -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.companyName"
                  label="Firma"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- City -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy="item.city"
                  label="Miasto"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Description -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy="item.description"
                  label="Opis"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <signature-field />
          </v-col>
        </v-row>
      </v-card>
      <!-- Vehicle -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <v-col>
                <v-text-field
                  v-model.lazy="item.vehicleName"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Registration number -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy="item.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Mileage -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-text-field
                  v-model.lazy="item.mileage"
                  label="Przebieg"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
            </v-row>
            <!-- Vehicle type -->
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-select
                  v-model="item.vehicleType"
                  :items="vehicleTypeItems"
                  item-value="id"
                  hide-details="auto"
                  label="Typ pojazdu"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Tires size -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <tire-measurement-info :item="tire"/>
            </div>
            <!-- Diagnostics -->
            <v-textarea
              label="Diagnostyka / zalecenia"
              hide-details="auto"
              validate-on-blur
              auto-grow
              rows="4"
              v-model.lazy="item.tireDiagnostics"/>
          </v-col>
        </v-row>
      </v-card>
      <!-- Actions -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelUnscrewing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelUnscrewing.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.tireInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.tireInstallation.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelBalancing">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelBalancing.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.wheelWeights">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.wheelWeights.extraInfo"
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
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.valveChange">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.valveChange.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.extensionInstallation">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.extensionInstallation.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.deepening">
              <template v-slot:extra-info>
                <v-row class="no-gutters">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.F"
                      label="F"
                      hide-details
                      class="shrink ml-4 mt-0"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.D"
                      label="D"
                      hide-details
                      class="shrink ml-4 mt-0"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.deepening.T"
                      label="T"
                      hide-details
                      class="shrink ml-4 mt-0"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="actions.coldHotRepair">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.coldHotRepair.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.utilization">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.utilization.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.drive">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.drive.extraInfo"
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.other">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.other.extraInfo"
                  label=""/>
              </template>
            </service-action>
          </v-col>
        </v-row>
      </v-card>
      <!-- Installed tires -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <tire-brand-info :item="tire"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Other materials -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <tire-brand-info :item="tire"/>
            </div>
          </v-col>
        </v-row>
      </v-card>
      <!-- Recommendations -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <v-col cols="auto">
                <v-checkbox
                  v-model="item.recommendations.geometry"
                  label="Geometria"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="auto">
                <v-checkbox
                  v-model="item.recommendations.shockAbsorbers"
                  label="Amortyzatory"
                  hide-details
                  class="shrink ml-4 mt-0"/>
              </v-col>
              <v-col cols="auto">
                <v-checkbox
                  v-model="item.recommendations.brakes"
                  label="Hamulce"
                  hide-details
                  class="shrink ml-4 mt-0"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Next visit -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              <v-col>
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
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
              class="no-gutters">
              <v-col>
                <v-text-field
                  v-model.lazy="mechanic.name"
                  type="input"
                  label="Nazwisko"
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
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
            <signature-field />
          </v-col>
        </v-row>
      </v-card>
      <!-- Client signature -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-0 mt-2'">
        <v-row class="no-gutters" style="height:100%">
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
                <p class="text-body-2 grey--text text--darken-1">
                  Opony zdemontowane i pozostawione, po upływie 14 dni zostaną zutylizowane
                </p>
              </v-col>
            </v-row>
            <signature-field />
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import vehicleType from '@/enums/vehicleType';
import TireMeasurementInfo from '@/components/TireMeasurementInfo.vue';
import ServiceAction from '@/components/ServiceAction.vue';
import TireBrandInfo from '@/components/TireBrandInfo.vue';
import SignatureField from '@/components/SignatureField.vue';

export default {
  name: 'OrderForm',

  components: {
    TireMeasurementInfo,
    ServiceAction,
    TireBrandInfo,
    SignatureField,
  },
  data: () => ({
    isFormValid: false,
    vehicleTypeItems: vehicleType.items,
    item: {
      id: 1,
      orderNumber: '1/2/2022',
      date: new Date(),
      companyName: '',
      city: '',
      vehicleName: '',
      registrationNumber: '',
      mileage: 0,
      description: '',
      tires: [
        {
          size: '315/80/R22,5',
          pressure: 3.0,
          tread: 4.5,
        },
        {
          size: '315/80/R22,5',
          pressure: 3.0,
          tread: 4.5,
        },
        {
          size: '335/80/R22,5',
          pressure: 3.0,
          tread: 4.5,
        },
        {
          size: '335/80/R22,5',
          pressure: 3.0,
          tread: 4.5,
        },
      ],
      tireDiagnostics: '',
      installedTires: [
        {
          size: '315/80/R22,5',
          name: 'Hankook',
          tread: 'DH31',
          serial: '1234567890',
        },
        {
          size: '315/80/R22,5',
          name: 'Hankook',
          tread: 'DH31',
          serial: '1234567890',
        },
      ],
      materials: [
        {
          item: 'Płyn do spryskiwawczy 10l',
        },
      ],
      deinstalledTires: [
        {
          size: '315/80/R22,5',
          name: 'Hankook',
          tread: 'DH31',
          serial: '1234567890',
        },
        {
          size: '315/80/R22,5',
          name: 'Hankook',
          tread: 'DH31',
          serial: '1234567890',
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
        { name: 'Nowak' },
        { name: 'Kowalski' },
      ],
    },
    actions: {
      tireInspection: {
        isChecked: false,
        text: 'Inspekcja stany ogumienia',
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
      required: (value) => !!value || 'Pole wymagane',
    },
  }),
};
</script>
