<template>
  <div>
    <canvas
      ref="canvas"
      :width="canvasWidth"
      height="200px"
      id="drawing-pad"/>
    <!-- <img
      ref="img"
      src=""
      id="canvas-img"/> -->
    <v-slide-y-transition>
      <v-row
        v-if="isError"
        cols="12"
        class="no-gutters mb-2">
        <v-col class="v-messages theme--light error--text" role="alert">Podpis wymagany</v-col>
      </v-row>
    </v-slide-y-transition>
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
    test: '',
    isError: false,
  }),
  mounted() {
    const vm = this;

    vm.canvas = vm.$refs.canvas;
    vm.context = vm.canvas.getContext('2d');
    vm.canvas.addEventListener('mousedown', vm.mousedown);
    vm.canvas.addEventListener('mousemove', vm.mousemove);
    document.addEventListener('mouseup', vm.mouseup);
    vm.canvas.addEventListener('touchstart', vm.touchstart, false);
    vm.canvas.addEventListener('touchmove', vm.touchmove, false);
    document.addEventListener('touchend', vm.mouseup);

    window.addEventListener('resize', vm.resize);

    vm.resize();
  },
  unmounted() {
    const vm = this;

    vm.canvas.removeEventListener('mousedown', vm.mousedown);
    vm.canvas.removeEventListener('mousemove', vm.mousemove);
    document.removeEventListener('mouseup', vm.mouseup);
    vm.canvas.removeEventListener('touchstart', vm.touchstart);
    vm.canvas.removeEventListener('touchmove', vm.touchmove);
    document.removeEventListener('touchend', vm.mouseup);

    window.removeEventListener('resize', vm.resize);
  },
  methods: {
    mousedown(e) {
      const vm = this;

      const rect = vm.canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);

      vm.isDrawing = true;
      vm.startX = x;
      vm.startY = y;
      vm.points.push({
        x,
        y,
      });
    },
    touchstart(e) {
      const vm = this;

      const rect = vm.canvas.getBoundingClientRect();
      let x;
      let y;

      if (e.touches) {
        if (e.touches.length === 1) { // Only deal with one finger
          const touch = e.touches[0]; // Get the information for finger #1
          x = Math.round(touch.clientX - rect.left);
          y = Math.round(touch.clientY - rect.top);
        }
      }

      vm.test = `touch start: ${x}:${y}`;
      vm.isDrawing = true;
      vm.startX = x;
      vm.startY = y;
      vm.points.push({
        x,
        y,
      });

      vm.contextDraw(vm.startX, vm.startY, x, y);
    },
    mousemove(e) {
      const vm = this;

      const rect = vm.canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);

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
    touchmove(e) {
      const vm = this;

      const rect = vm.canvas.getBoundingClientRect();
      let x;
      let y;

      if (e.touches) {
        if (e.touches.length === 1) { // Only deal with one finger
          const touch = e.touches[0]; // Get the information for finger #1
          x = Math.round(touch.clientX - rect.left);
          y = Math.round(touch.clientY - rect.top);
        }
      }

      if (vm.isDrawing) {
        vm.contextDraw(vm.startX, vm.startY, x, y);

        vm.startX = x;
        vm.startY = y;

        vm.points.push({
          x,
          y,
        });
      }

      e.preventDefault();
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

      console.log(dataURL);
    },
    getImageData: function aa() {
      const vm = this;
      return vm.canvas.toDataURL();
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
    validate() {
      const vm = this;

      vm.isError = vm.points.length === 0;
      return !vm.isError;
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

  .error-label {
    color: rgba(255,40,40);
    font-size: .8em;
    line-height: 1.0;
  }

</style>

