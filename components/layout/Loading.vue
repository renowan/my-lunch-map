<template>
  <div
    class="velmld-overlay velmld-full-screen"
    style="background-color: rgba(255, 255, 255, 0.6);"
  >
    <div class="velmld-spinner">
      <i class="fas fa-spinner fa-spin"></i>
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'loading',
  components: {},
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.velmld-overlay {
  position: absolute;
  z-index: 3000;
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;
}

.velmld-full-screen {
  position: fixed;
}

.velmld-overlay {
  z-index: 1060 !important;
}

.velmld-spinner {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  text-align: center;

  .fas {
    font-size: 40px;
    color: #5e72e4;
  }
}
</style>