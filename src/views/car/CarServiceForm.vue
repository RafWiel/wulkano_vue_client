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
              <!-- Name -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-text-field
                  ref="firstControl"
                  v-model.lazy="item.client.name"
                  label="Imię i Nazwisko"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Phone number -->
              <v-col cols="6" sm="8" md="3" lg="2" class="pl-2">
                <v-text-field
                  v-model.lazy="item.client.phoneNumber"
                  label="Telefon kontaktowy"
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
              <v-col cols="12" sm="4" md="3" lg="2">
                <v-text-field
                  v-model.lazy="item.vehicle.name"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Registration number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.lazy="item.vehicle.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur
                  :rules="[rules.required]"/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                class="pl-2"
                :class="$vuetify.breakpoint.smAndUp ? '' : 'mt-2'">
                <v-select
                  v-model="item.vehicle.type"
                  :items="vehicleTypeItems"
                  item-value="id"
                  hide-details="auto"
                  label="Typ pojazdu"/>
              </v-col>
              <!-- Mileage -->
              <v-col
                cols="12" md="3" lg="6"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.number="item.mileage"
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
      <!-- Tires inspection -->
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
                  Ocena stanu opon
                </h3>
              </v-col>
            </v-row>
            <!-- Tires -->
            <div
              v-for="(tire, index) in item.tires"
              :key="index">
              <tire-measurement-info :item="tire" @change="addArrayObject(tire, item.tires, 5, {
                width: '',
                profile: '',
                diameter: '',
                pressure: '',
                tread: '' })"/>
            </div>
            <v-row class="no-gutters mt-2">
              <!-- Incorrect tire wear -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-select
                  v-model="item.incorrectTireWearLocation"
                  :items="axleLocationItems"
                  item-value="id"
                  hide-details="auto"
                  label="Nieprawidłowe zużycie opon"/>
              </v-col>
              <!-- Geometry -->
              <v-col class="pl-2">
                <v-select
                  v-model="item.isGeometryRequired"
                  :items="boolItems"
                  item-value="id"
                  hide-details="auto"
                  label="Konieczna geometria"/>
              </v-col>
            </v-row>
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
              <tire-brand-info :item="tire" @change="addArrayObject(tire, item.installedTires, 4, {
                width: '',
                profile: '',
                diameter: '',
                brand: '',
                tread: '',
                serial: ''
              })"/>
            </div>
            <v-row class="no-gutters mt-4">
              <!-- Change -->
              <v-col>
                <v-select
                  v-model="item.tireChange"
                  :items="tireChangeItems"
                  item-value="id"
                  hide-details="auto"
                  label="Wymiana"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Deposit -->
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
                  Depozyt
                </h3>
              </v-col>
            </v-row>
            <div
              v-for="(tire, index) in item.installedTires"
              :key="index">
              <tire-brand-info :item="tire" @change="addArrayObject(tire, item.installedTires, 4, {
                width: '',
                profile: '',
                diameter: '',
                brand: '',
                tread: '',
                serial: ''
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
          </v-col>
        </v-row>
      </v-card>
      <!-- Visual control -->
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
                  FAST-FIT Kontrola wizualna
                </h3>
              </v-col>
            </v-row>
            <!-- Visual inspection -->
            <v-row class="no-gutters">
              <v-col cols="12" md="6" lg="4">
                <visual-inspection :item="visualInspection.brakePads.front"/>
                <visual-inspection :item="visualInspection.brakePads.rear"/>
                <visual-inspection :item="visualInspection.brakeDiscs.front"/>
                <visual-inspection :item="visualInspection.brakeDiscs.rear"/>
                <visual-inspection :item="visualInspection.shockAbsorbers"/>
                <visual-inspection :item="visualInspection.suspension"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <visual-inspection :item="visualInspection.airco"/>
                <visual-inspection :item="visualInspection.oil"/>
                <visual-inspection :item="visualInspection.lights"/>
                <visual-inspection :item="visualInspection.washingFluid"/>
                <visual-inspection :item="visualInspection.brakeFluid"/>
                <visual-inspection :item="visualInspection.coolingFluid"/>
                <visual-inspection :item="visualInspection.wipers"/>
                <visual-inspection :item="visualInspection.other">
                  <template v-slot:extra-info>
                    <v-text-field
                      v-model.lazy="visualInspection.other.extraInfo"
                      hide-details
                      style="width:80%"
                      label=""/>
                  </template>
                </visual-inspection>
              </v-col>
            </v-row>
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
                  Wykonane usługi
                </h3>
              </v-col>
            </v-row>
            <!-- Actions -->
            <service-action :item="actions.screwing"/>
            <service-action :item="actions.installation"/>
            <service-action :item="actions.wheelBalancing">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.wheelBalancing.steel"
                      label="Stal"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.wheelBalancing.alloy"
                      label="Alu"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="actions.tireRepair"/>
            <service-action :item="actions.rimStraightening">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.rimStraightening.steel"
                      label="Stal"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="actions.rimStraightening.alloy"
                      label="Alu"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="actions.airValve">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="actions.airValve.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="actions.nitrogen"/>
            <service-action :item="actions.utilization"/>
          </v-col>
        </v-row>
      </v-card>
      <!-- Fast-Fit -->
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
                  FAST-FIT
                </h3>
              </v-col>
            </v-row>
            <!-- Actions -->
            <service-action :item="fastFit.brakePads">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 130%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.brakePads.front"
                      label="Przód"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.brakePads.rear"
                      label="Tył"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="fastFit.brakeDiscs">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 130%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.brakeDiscs.front"
                      label="Przód"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.brakeDiscs.rear"
                      label="Tył"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="fastFit.shockAbsorbers">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 180%'">
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.shockAbsorbers.front"
                      label="Przód"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      v-model="fastFit.shockAbsorbers.rear"
                      label="Tył"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="fastFit.geometry"/>
            <service-action :item="fastFit.fuelFilter"/>
          </v-col>
        </v-row>
      </v-card>
      <!-- Periodic inspection -->
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
                  Przegląd okresowy
                </h3>
              </v-col>
            </v-row>
            <!-- Actions -->
            <service-action :item="inspection.oil"/>
            <service-action :item="inspection.oilFilter"/>
            <service-action :item="inspection.airFilter"/>
            <service-action :item="inspection.interiorFilter"/>
            <service-action :item="inspection.airco">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 50%'">
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      v-model="inspection.airco.cleaning"
                      label="Czyszczenie"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      v-model="inspection.airco.filter"
                      label="Filtr"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      v-model="inspection.airco.filling"
                      label="Napełnianie"
                      hide-details
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="inspection.other">
              <template v-slot:extra-info>
                <v-textarea
                  label=""
                  hide-details="auto"
                  validate-on-blur
                  auto-grow
                  rows="1"
                  v-model.lazy="inspection.other.extraInfo"/>
              </template>
            </service-action>
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
    <!-- RODO -->
    <p class="px-4 caption"
      :class="$vuetify.breakpoint.mdAndUp ? '' : 'mt-4'">
      Zgodnie z art.13 rozporządzenia o ochronie danych osobowych z dn. 27.04.16 (Dz.Urz. UE L 119 z 04.05.16) informujemy,
      że administratorem danych osobowych kontrahenta jest WULKANO PERFECT SZABAŁA S.J. , 21-040 Świdnik ul. Piasecka 200 kontakt biuro@wulkanoperfect.pl
      Dane kontrahenta będą przetwarzane w celu realizacji umowy (art.6 ust.1 lit.b) RODO z 27.04.16.
      Odbiorcami danych będą wyłącznie podmioty uprawnione na pods. przepisów prawa. Dane będą przechowywane przez 5 lat.
      Kontrahent ma prawo do żądania od adminitratora dostępu, usunięcia, ograniczenia dostępu do danych osobowych.
      Podanie danych jest dobrowolne, jednakże odmowa może skutkować odmową zawarcia umowy (sprzedaży i wykonania usługi).</p>
  </v-container>
</template>

<script>
import moment from 'moment';
import rules from '@/misc/rules';
import tireLocation from '@/enums/car/tireLocation';
import axleLocation from '@/enums/axleLocation';
import bool from '@/enums/bool';
import tireChangeType from '@/enums/car/tireChangeType';
import vehicleType from '@/enums/car/vehicleType';
import TireMeasurementInfo from '@/components/car/TireMeasurementInfo.vue';
import TireBrandInfo from '@/components/car/TireBrandInfo.vue';
import SignatureField from '@/components/SignatureField.vue';
import VisualInspection from '@/components/car/VisualInspection.vue';
import ServiceAction from '@/components/car/ServiceAction.vue';

export default {
  name: 'OrderForm',
  components: {
    TireMeasurementInfo,
    TireBrandInfo,
    SignatureField,
    VisualInspection,
    ServiceAction,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    isFormValid: false,
    item: {
      id: 1,
      orderNumber: moment(new Date()).format('1/M/YYYY'),
      date: new Date(),
      client: {
        name: '',
        phoneNumber: '',
      },
      vehicle: {
        name: '',
        registrationNumber: '',
        type: 0,
        mileage: '',
      },
      description: '',
      tires: [
        {
          location: tireLocation.leftFront,
          status: 0,
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.rightFront,
          status: 0,
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.leftRear,
          status: 0,
          pressure: '',
          tread: '',
        },
        {
          location: tireLocation.rightRear,
          status: 0,
          pressure: '',
          tread: '',
        },
      ],
      incorrectTireWearLocation: 0,
      isGeometryRequired: false,
      installedTires: [
        {
          width: '',
          profile: '',
          diameter: '',
          dot: '',
          brand: '',
        },
      ],
      deposit: {
        tires: false,
        alloys: false,
        steels: false,
        screws: false,
        hubcups: false,
      },
      tireChange: tireChangeType.none,
    },
    visualInspection: {
      brakePads: {
        front: {
          text: 'Klocki hamulcowe - Przód',
          status: 0,
        },
        rear: {
          text: 'Klocki hamulcowe - Tył',
          status: 0,
        },
      },
      brakeDiscs: {
        front: {
          text: 'Tarcze hamulcowe - Przód',
          status: 0,
        },
        rear: {
          text: 'Tarcze hamulcowe - Tył',
          status: 0,
        },
      },
      shockAbsorbers: {
        text: 'Amortyzatory',
        status: 0,
      },
      suspension: {
        text: 'Zawieszenie',
        status: 0,
      },
      airco: {
        text: 'Klimatyzacja',
        status: 0,
      },
      oil: {
        text: 'Poziom oleju w silniku',
        status: 0,
      },
      lights: {
        text: 'Światła',
        status: 0,
      },
      washingFluid: {
        text: 'Płyn do spryskiwaczy',
        status: 0,
      },
      brakeFluid: {
        text: 'Płyn hamulcowy',
        status: 0,
      },
      coolingFluid: {
        text: 'Płyn chłodzący',
        status: 0,
      },
      wipers: {
        text: 'Pióra wycieraczek',
        status: 0,
      },
      other: {
        text: 'Inne',
        status: 0,
        extraInfo: '',
      },
    },
    actions: {
      screwing: {
        isChecked: false,
        text: 'Odkręcenie / Przykręcenie',
        count: '',
        price: '',
      },
      installation: {
        isChecked: false,
        text: 'Montaż / Demontaż',
        count: '',
        price: '',
      },
      wheelBalancing: {
        isChecked: false,
        text: 'Wyważanie',
        count: '',
        price: '',
        steel: false,
        alloy: false,
      },
      tireRepair: {
        isChecked: false,
        text: 'Naprawa opony',
        count: '',
        price: '',
      },
      rimStraightening: {
        isChecked: false,
        text: 'Prostowanie felgi',
        count: '',
        price: '',
        steel: false,
        alloy: false,
      },
      airValve: {
        isChecked: false,
        text: 'Zawór do felg',
        count: '',
        price: '',
        extraInfo: '',
      },
      nitrogen: {
        isChecked: false,
        text: 'Napełnianie azotem',
        count: '',
        price: '',
      },
      utilization: {
        isChecked: false,
        text: 'Utylizacja opony',
        count: '',
        price: '',
      },
    },
    fastFit: {
      brakePads: {
        isChecked: false,
        text: 'Montaż klocków',
        count: '',
        price: '',
        front: false,
        rear: false,
      },
      brakeDiscs: {
        isChecked: false,
        text: 'Montaż tarcz',
        count: '',
        price: '',
        front: false,
        rear: false,
      },
      shockAbsorbers: {
        isChecked: false,
        text: 'Montaż amortyzatorów',
        count: '',
        price: '',
        front: false,
        rear: false,
      },
      geometry: {
        isChecked: false,
        text: 'Geometria',
        count: '',
        price: '',
      },
      fuelFilter: {
        isChecked: false,
        text: 'Wymiana filtra paliwa',
        count: '',
        price: '',
      },
    },
    inspection: {
      oil: {
        isChecked: false,
        text: 'Wymiana oleju silnikowego',
        count: '',
        price: '',
      },
      oilFilter: {
        isChecked: false,
        text: 'Wymiana filtra oleju',
        count: '',
        price: '',
      },
      airFilter: {
        isChecked: false,
        text: 'Wymiana filtra powietrza',
        count: '',
        price: '',
      },
      interiorFilter: {
        isChecked: false,
        text: 'Wymiana filtra kabiny',
        count: '',
        price: '',
      },
      airco: {
        isChecked: false,
        text: 'Klimatyzacja',
        count: '',
        price: '',
        cleaning: false,
        filter: false,
        filling: false,
      },
      other: {
        isChecked: false,
        text: 'Inne',
        count: '',
        price: '',
        extraInfo: '',
      },
    },
    rules: {
      required: rules.required,
      integer: rules.integer,
    },
    axleLocationItems: axleLocation.items,
    boolItems: bool.items,
    tireChangeItems: tireChangeType.items,
    vehicleTypeItems: vehicleType.items,
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
