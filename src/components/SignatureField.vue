<template>
  <div>
    <canvas
      ref="canvas"
      :width="canvasWidth"
      height="200"
      id="drawing-pad"/>
    <img
      ref="img"
      src=""
      id="canvas-img"/>
    <v-row class="no-gutters" justify="start">
      <v-col cols="6" sm="3" md="2" lg="1">
        <v-btn
          depressed
          block
          color="primary"
          @click="resetCanvas">
          Wyczyść
        </v-btn>
      </v-col>
      <!-- <v-col cols="2" class="ml-2">
        <v-btn
          depressed
          block
          color="primary"
          @click="saveImage">
          Zapisz
        </v-btn>
      </v-col> -->
      <!-- <v-col class="ml-2">
        <v-btn
          depressed
          block
          color="primary"
          @click="loadFromStorage">
          Odtwórz
        </v-btn>
      </v-col> -->
    </v-row>
  </div>
</template>
<script>
export default
{
  name: 'SignatureField',
  props: {
    item: Object,
  },
  data: () => ({
    canvas: null,
    context: null,
    isDrawing: false,
    startX: 0,
    startY: 0,
    points: [],
    canvasWidth: 0,
  }),
  mounted() {
    const vm = this;

    vm.canvas = vm.$refs.canvas;
    vm.context = vm.canvas.getContext('2d');
    vm.canvas.addEventListener('mousedown', vm.mousedown);
    vm.canvas.addEventListener('mousemove', vm.mousemove);
    document.addEventListener('mouseup', vm.mouseup);
    window.addEventListener('resize', vm.resize);

    vm.resize();
  },
  unmounted() {
    const vm = this;

    vm.canvas.removeEventListener('mousedown', vm.mousedown);
    vm.canvas.removeEventListener('mousemove', vm.mousemove);
    document.removeEventListener('mouseup', vm.mouseup);
    window.removeEventListener('resize', vm.resize);
  },
  methods: {
    mousedown(e) {
      const vm = this;
      const rect = vm.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      vm.isDrawing = true;
      vm.startX = x;
      vm.startY = y;
      vm.points.push({
        x,
        y,
      });
    },
    mousemove(e) {
      const vm = this;
      const rect = vm.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (vm.isDrawing) {
        vm.contextDraw(vm.startX, vm.startY, x, y);

        vm.startX = x;
        vm.startY = y;

        vm.points.push({
          x,
          y,
        });
      }
    },
    mouseup() {
      const vm = this;

      vm.isDrawing = false;

      if (vm.points.length > 0) {
        localStorage.points = JSON.stringify(vm.points);
      }
    },
    resize() {
      const vm = this;

      vm.canvasWidth = vm.getCanvasWidth();
    },
    getCanvasWidth() {
      return document.documentElement.clientWidth - (this.$vuetify.breakpoint.mdAndUp ? 68 : 0);
    },
    resetCanvas() {
      const vm = this;
      const { width } = vm.canvas;

      vm.canvas.width = width;
      vm.points = [];
    },
    saveImage() {
      const vm = this;
      const dataURL = vm.canvas.toDataURL();
      const { img } = vm.$refs;

      img.src = dataURL;

      console.log(vm.points);
    },
    loadFromStorage() {
      const vm = this;
      const { width } = vm.canvas;

      vm.canvas.width = width;
      if (vm.points.length === 0) {
        if (localStorage.points) {
          vm.points = JSON.parse(localStorage.points);
        }
      }

      function drawNextPoint(index) {
        if (index >= vm.points.length) {
          return;
        }

        const startX = vm.points[index - 1].x;
        const startY = vm.points[index - 1].y;
        const { x, y } = vm.points[index];

        vm.contextDraw(startX, startY, x, y);
      }

      let index = 1;
      setInterval(() => {
        drawNextPoint(index);
        index += 1;
      }, 10);
    },
    contextDraw(startX, startY, x, y) {
      const vm = this;

      vm.context.beginPath();
      vm.context.moveTo(startX, startY);
      vm.context.lineTo(x, y);
      vm.context.lineWidth = 2;
      vm.context.lineCap = 'round';
      vm.context.strokeStyle = 'rgba(0,0,0,1)';
      vm.context.stroke();
    },
  },
};
</script>

<style lang="scss" scoped>
  canvas {
    width: 100%;
    height: 200px;
    z-index: 0;
    border: 1px solid grey;
    cursor: crosshair;
  }

</style>

