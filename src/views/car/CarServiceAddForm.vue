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
                  :rules="[rules.required]"
                  v-model.lazy="item.client.name"
                  label="Imię i Nazwisko"
                  type="input"
                  class="text_ellipsis"
                  hide-details="auto"
                  validate-on-blur
                  />
              </v-col>
              <!-- Phone number -->
              <v-col cols="6" sm="8" md="3" lg="2" class="pl-2">
                <v-combobox
                  :items="api.values"
                  :loading="api.isLoading"
                  :rules="[rules.required]"
                  :search-input.sync="api.searchInput"
                  v-model="item.client.phoneNumber"
                  hide-no-data
                  hide-selected
                  no-filter
                  type="input"
                  label="Telefon kontaktowy"/>
              </v-col>
              <!-- Description -->
              <v-col
                cols="12" md="6" lg="8"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  :rules="[rules.required]"
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
              <v-col cols="12" sm="4" md="3" lg="2">
                <v-text-field
                  :rules="[rules.required]"
                  v-model.lazy="item.vehicle.name"
                  label="Marka pojazdu"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Registration number -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                :class="$vuetify.breakpoint.smAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  :rules="[rules.required]"
                  v-model.lazy="item.vehicle.registrationNumber"
                  label="Numer rejestracyjny"
                  type="input"
                  hide-details="auto"
                  validate-on-blur/>
              </v-col>
              <!-- Vehicle type -->
              <v-col
                cols="6" sm="4" md="3" lg="2"
                class="pl-2"
                :class="$vuetify.breakpoint.smAndUp ? '' : 'mt-2'">
                <v-select
                  :items="vehicleTypeItems"
                  :rules="[rules.required]"
                  v-model="item.vehicle.type"
                  item-value="id"
                  hide-details="auto"
                  label="Typ pojazdu"/>
              </v-col>
              <!-- Mileage -->
              <v-col
                cols="12" md="3" lg="6"
                :class="$vuetify.breakpoint.mdAndUp ? 'pl-2' : 'mt-2'">
                <v-text-field
                  :rules="[rules.integer, rules.required]"
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
                :isValidation="tire.location !== tireLocation.none"
                @change="addArrayObject(tire, item.inspectedTires, 5, {
                  location: tireLocation.none,
                  status: 0,
                  pressure: '',
                  tread: '',
                })"
                />
            </div>
            <v-row class="no-gutters mt-4">
              <!-- Incorrect tire wear -->
              <v-col cols="6" sm="4" md="3" lg="2">
                <v-select
                  :items="axleLocationItems"
                  v-model="item.incorrectTireWearLocation"
                  item-value="id"
                  hide-details="auto"
                  label="Nieprawidłowe zużycie opon"/>
              </v-col>
              <!-- Geometry -->
              <v-col class="pl-2">
                <v-select
                  :items="boolItems"
                  v-model="item.isGeometryRequired"
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
              <tire-brand-info
                :item="tire"
                :isValidation="tire.location !== tireLocation.none || tire.width !== '' || tire.profile !== '' || tire.diameter !== ''"
                @change="addArrayObject(tire, item.installedTires, 4, {
                  location: tireLocation.none,
                  width: '',
                  profile: '',
                  diameter: '',
                  dot: '',
                  brand: '',
                })"
              class="mt-2"/>
            </div>
            <v-row class="no-gutters mt-4">
              <!-- Change -->
              <v-col>
                <v-select
                  :items="tireChangeItems"
                  v-model="item.tireChange"
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
              v-for="(tire, index) in item.depositTires"
              :key="index">
              <tire-info
                :item="tire"
                :isValidation="tire.width !== '' || tire.profile !== '' || tire.diameter !== ''"
                @change="addArrayObject(tire, item.depositTires, 5, {
                  width: '',
                  profile: '',
                  diameter: '',
                  dot: '',
                  brand: '',
                  tread: '',
                  note: '',
                }); isDepositLocationCardVisible = true;"
                class="mt-2"/>
            </div>
            <v-row class="no-gutters mt-4">
              <v-col cols="12" sm="auto">
                <v-checkbox
                  v-model="item.deposit.isTires"
                  label="Opony"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isAlloys"
                  label="Koła alu"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isSteels"
                  label="Koła stalowe"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isScrews"
                  label="Śruby"
                  hide-details
                  class="shrink mt-0"/>
              </v-col>
              <v-col cols="12" sm="auto">
                <v-checkbox
                  :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : ''"
                  v-model="item.deposit.isHubcups"
                  label="Kołpaki"
                  hide-details
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
                  v-model.lazy="item.depositTiresNote"/>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
      <!-- Location -->
      <v-card
        v-if="isDepositLocationCardVisible"
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
                  hide-details="auto"
                  validate-on-blur/>
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
                <visual-inspection :item="item.visualInspection.brakePads.front"/>
                <visual-inspection :item="item.visualInspection.brakePads.rear"/>
                <visual-inspection :item="item.visualInspection.brakeDiscs.front"/>
                <visual-inspection :item="item.visualInspection.brakeDiscs.rear"/>
                <visual-inspection :item="item.visualInspection.shockAbsorbers"/>
                <visual-inspection :item="item.visualInspection.suspension"/>
                <visual-inspection :item="item.visualInspection.airco"/>
              </v-col>
              <v-col cols="12" md="6" lg="4">
                <visual-inspection :item="item.visualInspection.oil"/>
                <visual-inspection :item="item.visualInspection.lights"/>
                <visual-inspection :item="item.visualInspection.washingFluid"/>
                <visual-inspection :item="item.visualInspection.brakeFluid"/>
                <visual-inspection :item="item.visualInspection.coolingFluid"/>
                <visual-inspection :item="item.visualInspection.wipers"/>
                <visual-inspection :item="item.visualInspection.other">
                  <template v-slot:extra-info>
                    <v-text-field
                      v-model.lazy="item.visualInspection.other.extraInfo"
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
            <service-action :item="item.actions.screwing"/>
            <service-action :item="item.actions.installation"/>
            <service-action :item="item.actions.wheelBalancing">
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
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.wheelBalancing.isAlloy"
                      label="Alu"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.actions.tireRepair"/>
            <service-action :item="item.actions.rimStraightening">
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
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.actions.rimStraightening.isAlloy"
                      label="Alu"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.actions.airValve">
              <template v-slot:extra-info>
                <v-text-field
                  v-model.lazy="item.actions.airValve.extraInfo"
                  hide-details
                  label=""/>
              </template>
            </service-action>
            <service-action :item="item.actions.nitrogenFill"/>
            <service-action :item="item.actions.utilization"/>
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
            <service-action :item="item.fastFit.brakePads">
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
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakePads.isRear"
                      label="Tył"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.fastFit.brakeDiscs">
              <template v-slot:extra-info>
                <v-row
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 130%'"
                  class="no-gutters mr-4"
                  justify="end">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakeDiscs.isFront"
                      label="Przód"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.brakeDiscs.isRear"
                      label="Tył"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.fastFit.shockAbsorbers">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters mr-4"
                  justify="end"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 180%'">
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.shockAbsorbers.isFront"
                      label="Przód"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.fastFit.shockAbsorbers.isRear"
                      label="Tył"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.fastFit.geometry"/>
            <service-action :item="item.fastFit.fuelFilter"/>
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
            <service-action :item="item.inspection.oil"/>
            <service-action :item="item.inspection.oilFilter"/>
            <service-action :item="item.inspection.airFilter"/>
            <service-action :item="item.inspection.interiorFilter"/>
            <service-action :item="item.inspection.airco">
              <template v-slot:extra-info>
                <v-row
                  class="no-gutters"
                  :style="$vuetify.breakpoint.smAndUp ? '' : 'width: 50%'">
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isCleaning"
                      label="Czyszczenie"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isFilter"
                      label="Filtr"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                  <v-col cols="12" sm="auto">
                    <v-checkbox
                      :class="$vuetify.breakpoint.smAndUp ? 'ml-4' : 'ml-2'"
                      v-model="item.inspection.airco.isFilling"
                      label="Napełnianie"
                      hide-details
                      class="shrink mt-4"/>
                  </v-col>
                </v-row>
              </template>
            </service-action>
            <service-action :item="item.inspection.other">
              <template v-slot:extra-info>
                <v-textarea
                  v-model.lazy="item.inspection.other.extraInfo"
                  label=""
                  hide-details="auto"
                  validate-on-blur
                  auto-grow
                  rows="1"/>
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
            <signature-field
              ref="employeeSignature"
              class="mt-2"/>
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
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'"
        v-if="$store.state.isAccountManager"
        flat>
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
      <!-- Apply button -->
      <v-card
        flat
        :class="$vuetify.breakpoint.mdAndUp ? 'mx-4 mt-4 mb-4 pa-4' : 'pa-3 mt-2'">
        <v-row class="no-gutters" justify="end">
          <v-col cols="12" sm="6" md="4" lg="2">
            <v-btn
              @click="save"
              class="save-btn"
              depressed
              block>
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
import rules from '@/misc/rules';
import tireLocation from '@/enums/car/tireLocation';
import axleLocation from '@/enums/axleLocation';
import bool from '@/enums/bool';
import tireChangeType from '@/enums/car/tireChangeType';
import vehicleType from '@/enums/car/vehicleType';
import TireMeasurementInfo from '@/components/car/TireMeasurementInfo.vue';
import TireBrandInfo from '@/components/car/TireBrandInfo.vue';
import TireInfo from '@/components/deposit/TireInfo.vue';
import SignatureField from '@/components/SignatureField.vue';
import VisualInspection from '@/components/car/VisualInspection.vue';
import ServiceAction from '@/components/car/ServiceAction.vue';
import carsService from '@/services/cars';
import clientsService from '@/services/clients';

export default {
  name: 'CarServiceAddForm',
  components: {
    TireMeasurementInfo,
    TireBrandInfo,
    TireInfo,
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
    isDepositLocationCardVisible: false,
    isFormReset: false,
    axleLocationItems: axleLocation.items,
    boolItems: bool.items,
    tireChangeItems: tireChangeType.items,
    tireLocation,
    vehicleTypeItems: vehicleType.items,
    item: null,
    newItem: {
      requestName: 'Nowe zlecenie',
      // date: new Date(),
      client: {
        name: '',
        phoneNumber: '',
      },
      description: '',
      vehicle: {
        name: '',
        registrationNumber: '',
        type: 0,
        mileage: '',
      },
      inspectedTires: [
        {
          location: tireLocation.none,
          status: 0,
          pressure: '',
          tread: '',
        },
      ],
      incorrectTireWearLocation: 0,
      isGeometryRequired: false,
      installedTires: [
        {
          location: tireLocation.none,
          width: '',
          profile: '',
          diameter: '',
          dot: '',
          brand: '',
        },
      ],
      tireChange: tireChangeType.none,
      depositTires: [
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
        isTires: false,
        isAlloys: false,
        isSteels: false,
        isScrews: false,
        isHubcups: false,
      },
      depositTiresNote: '',
      depositTiresLocation: '',
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
          isSteel: false,
          isAlloy: false,
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
          isSteel: false,
          isAlloy: false,
        },
        airValve: {
          isChecked: false,
          text: 'Zawór do felg',
          count: '',
          price: '',
          extraInfo: '',
        },
        nitrogenFill: {
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
          isFront: false,
          isRear: false,
        },
        brakeDiscs: {
          isChecked: false,
          text: 'Montaż tarcz',
          count: '',
          price: '',
          isFront: false,
          isRear: false,
        },
        shockAbsorbers: {
          isChecked: false,
          text: 'Montaż amortyzatorów',
          count: '',
          price: '',
          isFront: false,
          isRear: false,
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
          isCleaning: false,
          isFilter: false,
          isFilling: false,
        },
        other: {
          isChecked: false,
          text: 'Inne',
          count: '',
          price: '',
          extraInfo: '',
        },
      },
      saleDocument: '',
      signature: {
        employee: null,
        client: null,
      },
    },
    rules: {
      required: rules.required,
      integer: rules.integer,
    },
    api: {
      searchInput: null,
      values: [],
      isLoading: false,
    },
  }),
  created() {
    // deep copy
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

        console.log(JSON.stringify(this.item));

        this.item.signature.employee = this.$refs.employeeSignature.getImageData();
        this.item.signature.client = this.$refs.clientSignature.getImageData();

        const response = await carsService.create(this.item);

        if (response.data.result) {
          this.$emit('isProcessing', false);
          this.$emit('showMessage', 'Zlecenie osobowe', 'Zlecenie zapisane');
          this.resetForm();
          this.$vuetify.goTo(0);

          return;
        }

        this.$emit('showMessage', 'Zlecenie osobowe', 'Nieudany zapis');
      }
      catch (error) {
        this.processError(error);
      }

      this.$emit('isProcessing', false);
    },
    processError(error) {
      console.log(error);
      this.$emit('isProcessing', false);

      if (error.response === undefined) {
        this.$emit('showMessage', 'Zlecenie osobowe', 'Brak odpowiedzi z serwera');
        return;
      }

      console.log(error.response.data);
      this.$emit('showMessage', 'Zlecenie osobowe', error.response.data.message);
    },
    sayHi() {
      alert('Hello');
      this.isFormReset = false;
    },
    resetForm() {
      this.isFormReset = true;

      //deep copy
      this.item = JSON.parse(JSON.stringify(this.newItem));

      this.$refs.employeeSignature.resetCanvas();
      this.$refs.clientSignature.resetCanvas();
      this.$refs.form.reset();

      setTimeout(() => { this.isFormReset = false; }, 1000);
    },
    addArrayObject(item, array, maxCount, newItem) {
      if (this.isFormReset === true) {
        return;
      }

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
