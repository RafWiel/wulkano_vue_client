<template>
  <v-row class="no-gutters" align="center">
    <three-state-control
        :isReadonly="isReadonly"
        v-model="item.status"/>


    <v-col cols="8" sm="4" md="5" lg="6" class="mt-1">
      <div class="inline" >
        <div class="pt-5 pr-2 text_ellipsis" >
          {{ item.text }}
        </div>
        <slot name="extra-info" />
      </div>
    </v-col>
    <v-col cols="4" sm="3" md="3" lg="3" class="pl-2">
      <three-state-control
        :isReadonly="isReadonly"
        v-model="item.status"/>
    </v-col>
  </v-row>
</template>
<script>
import ThreeStateControl from '@/components/car/ThreeStateControl.vue';

export default
{
  name: 'VisualInspection',
  props: {
    item: Object,
    isReadonly: Boolean,
  },
  components: { ThreeStateControl },
  watch: {
    item: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler() {
        console.log('text', this.item.text);
        console.log('status', this.item.status);
      },
    },
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
