<template>
  <v-row class="no-gutters">
    <v-col cols="9" md="6" lg="4">
      <div class="inline" >
        <v-checkbox
          :readonly="isReadonly"
          v-model="item.isChecked"
          hide-details
          class="shrink"/>
        <p class="mr-2 mt-5 text_ellipsis" >
          {{ item.text }}
        </p>
        <slot name="extra-info"/>
      </div>
    </v-col>
    <v-col cols="1">
      <v-text-field
        :readonly="isReadonly"
        v-model.lazy.trim="item.count"
        label="Ilość"
        type="number"
        hide-spin-buttons
        hide-details
        class="ml-2"/>
    </v-col>
    <v-col cols="2" md="5" lg="7">
      <v-text-field
        :readonly="isReadonly"
        v-model.lazy.trim="item.info"
        label="Info"
        hide-details
        class="ml-2"/>
    </v-col>
  </v-row>
</template>

<script>
export default
{
  name: 'ServiceAction',
  props: {
    item: Object,
    isReadonly: Boolean,
  },
};
</script>

<style lang="scss" scoped>
  .inline {
    display: flex;
    width: 100%;
  }

  .text_ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
</style>
