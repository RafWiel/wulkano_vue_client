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
            <!-- Tire 1 -->
            <v-row class="no-gutters">
              <v-col>
                <tire-info />
              </v-col>
            </v-row>
            <!-- Tire 2 -->
            <v-row class="no-gutters">
              <v-col>
                <tire-info />
              </v-col>
            </v-row>
            <!-- Tire 3 -->
            <v-row class="no-gutters">
              <v-col>
                <tire-info />
              </v-col>
            </v-row>
            <!-- Tire 4 -->
            <v-row class="no-gutters">
              <v-col>
                <tire-info />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import vehicleType from '@/enums/vehicleType';
import TireInfo from '@/components/TireInfo.vue';

export default {
  name: 'OrderForm',

  components: {
    TireInfo,
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
    },
    rules: {
      required: (value) => !!value || 'Pole wymagane',
    },
  }),
};
</script>
