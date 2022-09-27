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
                  v-model.lazy="item.client.name"
                  label="Imię i Nazwisko"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Phone number -->
              <v-col cols="6" sm="8" md="3" lg="2" class="pl-2">
               <v-text-field
                  v-model="item.client.phoneNumber"
                  label="Telefon kontaktowy"
                  type="input"
                  class="text_ellipsis"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Description -->
              <v-col
                cols="12" md="6" lg="8"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.lazy="item.description"
                  label="Cel wizyty"
                  type="input"
                  hide-details
                  readonly/>
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
                  hide-details
                  readonly/>
              </v-col>
              <!-- Registration number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.lazy="item.vehicle.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                class="pl-2"
                :class="$vuetify.breakpoint.smAndUp ? '' : 'mt-2'">
                <v-text-field
                  v-model="item.vehicle.type"
                  label="Typ pojazdu"
                  type="input"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Mileage -->
              <v-col
                cols="12" md="3" lg="6"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  v-model.number="item.vehicle.mileage"
                  label="Przebieg"
                  type="number"
                  hide-spin-buttons
                  hide-details
                  readonly/>
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
              v-for="(tire, index) in item.inspectedTires"
              :key="index">
              <tire-measurement-info
                :item="tire"
                :isReadonly="true"/>
            </div>
            <v-row class="no-gutters mt-4">
              <!-- Incorrect tire wear -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-text-field
                  v-model="item.incorrectTireWearLocation"
                  label="Nieprawidłowe zużycie opon"
                  type="input"
                  hide-details
                  readonly/>
              </v-col>
              <!-- Geometry -->
              <v-col class="pl-2">
                <v-text-field
                  v-model="item.isGeometryRequired"
                  label="Konieczna geometria"
                  type="input"
                  hide-details
                  readonly/>
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
              <tire-brand-info
                :item="tire"
                :isReadonly="true"
                class="mt-2"/>
            </div>
            <v-row class="no-gutters mt-4">
              <!-- Change -->
              <v-col>
                <v-text-field
                  v-model="item.tireChange"
                  label="Wymiana"
                  type="input"
                  hide-details
                  readonly/>
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
              v-for="(tire, index) in item.depositTires"
              :key="index">
              <tire-info
                :item="tire"
                :isReadonly="true"
                class="mt-2"/>
            </div>
            <v-row class="no-gutters mt-4">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.isTires"
                  label="Opony"
                  class="shrink mt-0"
                  hide-details
                  readonly/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isAlloys"
                  label="Koła alu"
                  class="shrink mt-0"
                  hide-details
                  readonly/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isSteels"
                  label="Koła stalowe"
                  class="shrink mt-0"
                  hide-details
                  readonly/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isScrews"
                  label="Śruby"
                  class="shrink mt-0"
                  hide-details
                  readonly/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isHubcups"
                  label="Kołpaki"
                  class="shrink mt-0"
                  hide-details
                  readonly/>
              </v-col>
            </v-row>
            <v-row class="no-gutters mt-2">
              <v-col>
                <v-textarea
                  v-model.lazy="item.depositTiresNote"
                  label="Uwagi"
                  auto-grow
                  rows="1"
                  hide-details
                  readonly/>
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
                  v-model.lazy="item.depositTiresLocation"
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
      <!-- Visual inspection -->
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
                <visual-inspection
                  :item="item.visualInspection.brakePads.front"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.brakePads.rear"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.brakeDiscs.front"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.brakeDiscs.rear"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.shockAbsorbers"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.suspension"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.airco"
                  :isReadonly="true"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <visual-inspection
                  :item="item.visualInspection.oil"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.lights"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.washingFluid"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.brakeFluid"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.coolingFluid"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.wipers"
                  :isReadonly="true"/>
                <visual-inspection
                  :item="item.visualInspection.other"
                  :isReadonly="true">
                  <template v-slot:extra-info>
                    <v-text-field
                      v-model.lazy="item.visualInspection.other.extraInfo"
                      style="width:80%"
                      label=""
                      hide-details
                      readonly/>
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
            <service-action
              :item="item.actions.screwing"
              :isReadonly="true"/>
            <service-action
              :item="item.actions.installation"
              :isReadonly="true"/>
            <service-action
              :item="item.actions.wheelBalancing"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.wheelBalancing.isSteel"
                      label="Stal"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.wheelBalancing.isAlloy"
                      label="Alu"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.actions.tireRepair"
              :isReadonly="true"/>
            <service-action
              :item="item.actions.rimStraightening"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 110%'">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.rimStraightening.isSteel"
                      label="Stal"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.rimStraightening.isAlloy"
                      label="Alu"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.actions.airValve"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.airValve.extraInfo"
                  label=""
                  hide-details
                  readonly/>
              </template>
            </service-action>
            <service-action
              :item="item.actions.nitrogenFill"
              :isReadonly="true"/>
            <service-action
              :item="item.actions.utilization"
              :isReadonly="true"/>
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
            <service-action
              :item="item.fastFit.brakePads"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 130%'">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakePads.isFront"
                      label="Przód"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakePads.isRear"
                      label="Tył"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.fastFit.brakeDiscs"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 130%'">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakeDiscs.isFront"
                      label="Przód"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakeDiscs.isRear"
                      label="Tył"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.fastFit.shockAbsorbers"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 180%'"
                  class="no-gutters mr-4"
                  justify="end">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.shockAbsorbers.isFront"
                      label="Przód"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.shockAbsorbers.isRear"
                      label="Tył"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.fastFit.geometry"
              :isReadonly="true"/>
            <service-action
              :item="item.fastFit.fuelFilter"
              :isReadonly="true"/>
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
            <service-action
              :item="item.inspection.oil"
              :isReadonly="true"/>
            <service-action
              :item="item.inspection.oilFilter"
              :isReadonly="true"/>
            <service-action
              :item="item.inspection.airFilter"
              :isReadonly="true"/>
            <service-action
              :item="item.inspection.interiorFilter"
              :isReadonly="true"/>
            <service-action
              :item="item.inspection.airco"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 50%'">
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isCleaning"
                      label="Czyszczenie"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isFilter"
                      label="Filtr"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isFilling"
                      label="Napełnianie"
                      class="shrink mt-4"
                      hide-details
                      readonly/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action
              :item="item.inspection.other"
              :isReadonly="true">
              <template v-slot:extra-info>
                <v-textarea
                  v-model.lazy="item.inspection.other.extraInfo"
                  label=""
                  validate-on-blur
                  auto-grow
                  rows="1"
                  hide-details
                  readonly/>
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
                  :readonly="$store.state.isAccountManager !== true"
                  v-model.lazy="item.saleDocument"
                  label="Numer dokumentu"
                  type="input"
                  class="text_ellipsis"
                  hide-details/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Apply button -->
      <v-card
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'"
        v-if="$store.state.isAccountManager"
        flat>
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
import debounce from 'lodash.debounce';
import moment from 'moment';
import axleLocation from '@/enums/axleLocation';
import bool from '@/enums/bool';
import tireChangeType from '@/enums/car/tireChangeType';
import vehicleType from '@/enums/car/vehicleType';
import TireMeasurementInfo from '@/components/car/TireMeasurementInfo.vue';
import TireBrandInfo from '@/components/car/TireBrandInfo.vue';
import TireInfo from '@/components/deposit/TireInfo.vue';
import VisualInspection from '@/components/car/VisualInspection.vue';
import ServiceAction from '@/components/car/ServiceAction.vue';
import carsService from '@/services/cars';
import clientsService from '@/services/clients';
import signaturesService from '@/services/signatures';

export default {
  name: 'CarServiceViewEditForm',
  props: { id: [String, Number] },
  components: {
    TireMeasurementInfo,
    TireBrandInfo,
    TireInfo,
    VisualInspection,
    ServiceAction,
  },
  computed: {
    date() {
      return moment(this.item.date).format('DD-MM-YYYY');
    },
  },
  data: () => ({
    item: {
      client: {},
      vehicle: {},
      deposit: {},
      visualInspection: {
        brakePads: {
          front: {},
          rear: {},
        },
        brakeDiscs: {
          front: {},
          rear: {},
        },
        shockAbsorbers: {},
        suspension: {},
        airco: {},
        oil: {},
        lights: {},
        washingFluid: {},
        brakeFluid: {},
        coolingFluid: {},
        wipers: {},
        other: {},
      },
      actions: {
        screwing: {},
        installation: {},
        wheelBalancing: {},
        tireRepair: {},
        rimStraightening: {},
        airValve: {},
        nitrogenFill: {},
        utilization: {},
      },
      fastFit: {
        brakePads: {},
        brakeDiscs: {},
        shockAbsorbers: {},
        geometry: {},
        fuelFilter: {},
      },
      inspection: {
        oil: {},
        oilFilter: {},
        airFilter: {},
        interiorFilter: {},
        airco: {},
        other: {},
      },
      signature: {},
    },
    visualInspectionText: {
      brakePads: {
        front: { text: 'Klocki hamulcowe - Przód' },
        rear: { text: 'Klocki hamulcowe - Tył' },
      },
      brakeDiscs: {
        front: { text: 'Tarcze hamulcowe - Przód' },
        rear: { text: 'Tarcze hamulcowe - Tył' },
      },
      shockAbsorbers: { text: 'Amortyzatory' },
      suspension: { text: 'Zawieszenie' },
      airco: { text: 'Klimatyzacja' },
      oil: { text: 'Poziom oleju w silniku' },
      lights: { text: 'Światła' },
      washingFluid: { text: 'Płyn do spryskiwaczy' },
      brakeFluid: { text: 'Płyn hamulcowy' },
      coolingFluid: { text: 'Płyn chłodzący' },
      wipers: { text: 'Pióra wycieraczek' },
      other: { text: 'Inne' },
    },
    actionsText: {
      screwing: { text: 'Odkręcenie / Przykręcenie' },
      installation: { text: 'Montaż / Demontaż' },
      wheelBalancing: { text: 'Wyważanie' },
      tireRepair: { text: 'Naprawa opony' },
      rimStraightening: { text: 'Prostowanie felgi' },
      airValve: { text: 'Zawór do felg' },
      nitrogenFill: { text: 'Napełnianie azotem' },
      utilization: { text: 'Utylizacja opony' },
    },
    fastFitText: {
      brakePads: { text: 'Montaż klocków' },
      brakeDiscs: { text: 'Montaż tarcz' },
      shockAbsorbers: { text: 'Montaż amortyzatorów' },
      geometry: { text: 'Geometria' },
      fuelFilter: { text: 'Wymiana filtra paliwa' },
    },
    inspectionText: {
      oil: { text: 'Wymiana oleju silnikowego' },
      oilFilter: { text: 'Wymiana filtra oleju' },
      airFilter: { text: 'Wymiana filtra powietrza' },
      interiorFilter: { text: 'Wymiana filtra kabiny' },
      airco: { text: 'Klimatyzacja' },
      other: { text: 'Inne' },
    },
    employeeSignature: '',
    clientSignature: '',
  }),
  created() {
    this.copyText();
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      // set loading icon
      this.$emit('isProcessing', true);

      // get item
      carsService.getOne(this.id)
      .then((response) => {
        this.item = response.data.item;

        //console.log(JSON.stringify(this.item));

        this.item.client = this.item.client || {};
        this.item.date = moment(this.item.date, 'YYYY-MM-DD hh:mm:ss.SSS Z').format('YYYY-MM-DD HH:mm');
        this.item.vehicle.type = vehicleType.getText(this.item.vehicle.type);
        this.item.incorrectTireWearLocation = axleLocation.getText(this.item.incorrectTireWearLocation);
        this.item.isGeometryRequired = bool.getText(this.item.isGeometryRequired);
        this.item.tireChange = tireChangeType.getText(this.item.tireChange);
        this.copyText();

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
        this.processError(error);
      });

      this.$emit('isProcessing', false);
    },
    copyText() {
      // copy visual inspection text
      Object.entries(this.visualInspectionText).forEach(([key, value]) => {
        this.item.visualInspection[key].text = value.text;
      });
      Object.entries(this.visualInspectionText.brakePads).forEach(([key, value]) => {
        this.item.visualInspection.brakePads[key].text = value.text;
      });
      Object.entries(this.visualInspectionText.brakeDiscs).forEach(([key, value]) => {
        this.item.visualInspection.brakeDiscs[key].text = value.text;
      });
      // copy actions text
      Object.entries(this.actionsText).forEach(([key, value]) => {
        this.item.actions[key].text = value.text;
      });
      // copy fast fit text
      Object.entries(this.fastFitText).forEach(([key, value]) => {
        this.item.fastFit[key].text = value.text;
      });
      // copy inspection text
      Object.entries(this.inspectionText).forEach(([key, value]) => {
        this.item.inspection[key].text = value.text;
      });
    },
    processError(error) {
      console.log(error);
      this.$emit('isProcessing', false);

      if (error.response.status === 401) {
        this.$router.replace({ name: 'Login' });
        return;
      }

      if (error.response === undefined) {
        this.$emit('showMessage', 'Zlecenie osobowe', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Zlecenie osobowe', error.response.data.message);
    },
  },
  watch: {
    'api.searchInput': debounce(async function searchInput(val) {
      if (this.api.isLoading) return;

      this.api.isLoading = true;

      clientsService.getPhoneNumbers({ filter: val })
      .then((res) => {
        this.api.values = res.data;
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
