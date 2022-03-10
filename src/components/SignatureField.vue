<template>
  <div>
    <canvas
      ref="canvas"
      width="500"
      height="200"
      id="drawing-pad"/>
    <img
      ref="img"
      src=""
      id="canvas-img"/>
    <v-row class="no-gutters">
      <v-col cols="2">
        <v-btn
          depressed
          block
          color="primary"
          @click="resetCanvas">
          Wyczyść
        </v-btn>
      </v-col>
      <v-col cols="2" class="ml-2">
        <v-btn
          depressed
          block
          color="primary"
          @click="saveImage">
          Zapisz
        </v-btn>
      </v-col>
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
  }),
  mounted() {
    const vm = this;

    vm.canvas = vm.$refs.canvas;
    vm.context = vm.canvas.getContext('2d');
    vm.canvas.addEventListener('mousedown', vm.mousedown);
    vm.canvas.addEventListener('mousemove', vm.mousemove);
    document.addEventListener('mouseup', vm.mouseup);
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
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 2;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = 'rgba(0,0,0,1)';
        vm.context.stroke();

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

        vm.context.beginPath();
        vm.context.moveTo(startX, startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 2;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = 'rgba(0,0,0,1)';
        vm.context.stroke();
      }

      let index = 1;
      setInterval(() => {
        drawNextPoint(index);
        index += 1;
      }, 10);
    },
  },
};
</script>

<style lang="scss" scoped>
  canvas {
    width: 500px;
    height: 200px;
    z-index: 0;
    border: 1px solid grey;
    cursor: crosshair;
  }

</style>

