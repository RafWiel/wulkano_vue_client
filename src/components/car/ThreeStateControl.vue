<template>
  <v-row class="no-gutters">
    <v-col>
      <v-row class="no-gutters ma-0 pa-0">
        <v-col>
          <p class="ma-0 pa-0 caption grey--text text--darken-2" >Stan</p>
        </v-col>
      </v-row>
      <v-row class="no-gutters" justify="center" align="center">
        <v-col>
          <v-btn
            :color="localValue == threeState.ok ? 'green lighten-2' : 'grey darken-1'"
            :outlined="localValue != threeState.ok"
            @click="setValue(threeState.ok)"
            class="state-button"
            depressed
            block
            small>
          </v-btn>
        </v-col>
        <v-col class="ml-1">
          <v-btn
            :color="localValue == threeState.avg ? 'yellow darken-1' : 'grey darken-1'"
            :outlined="localValue != threeState.avg"
            @click="setValue(threeState.avg)"
            class="state-button"
            depressed
            block
            small>
          </v-btn>
        </v-col>
        <v-col class="ml-1">
          <v-btn
            :color="localValue == threeState.bad ? 'red darken-1' : 'grey darken-1'"
            :outlined="localValue != threeState.bad"
            @click="setValue(threeState.bad)"
            class="state-button"
            depressed
            block
            small>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import threeState from '@/enums/threeState';

export default {
  name: 'ThreeStateControl',
  props: {
    value: Number,
    isReadonly: Boolean,
  },
  data: () => ({
    threeState,
    localValue: threeState.none,
  }),
  mounted() {
    this.localValue = this.value;
  },
  methods: {
    setValue(value) {
      if (this.isReadonly) return;

      this.localValue = value;
      this.$emit('input', value);
    },
  },
  watch: {
    value(val) {
      //fix, sometimes it doesnt update on mounted
      this.localValue = val;
    },
  },
};

</script>
<style lang="scss" scoped>
  .state-button {
    min-height: 29px !important;
    height:29px !important;
    width:29px !important;
  }
</style>
