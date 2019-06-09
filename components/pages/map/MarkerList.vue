<template>
  <li class="pin-list" :class="activeCls" @click="onClickMarkList">
    <h4 class="mb-0">
      {{ marker.title }}
    </h4>
    <div class="mb-2">
      <small><i class="ni ni-single-02"></i> {{ marker.user.name }}</small>
      <a class="btn-link float-right"><i class="fas fa-comments"></i> コメント</a>
    </div>
    <p>{{ marker.description }}</p>

  </li>
</template>

<script lang="js">
export default {
  name: 'marker-list',
  props: {
    marker: { type: Object, required: true },
    currentMarkerIndex: { type: Number, default: () => -1 },
    index: { type: Number, default: () => -1 }
  },
  components: {},
  computed: {
    activeCls() {
      return this.index === this.currentMarkerIndex ? 'active' : ''
    }
  },
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    onClickMarkList() {
      this.$emit('on-click-mark-list', this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.pin-list {
  list-style: none;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  min-height: 100px;
  cursor: pointer;

  p {
    font-size: .8rem;
    margin-bottom: 0;
  }

  small {
    color: #949db3;
  }

  .btn-link {
    font-size: 0.8rem;
    color: #5e72e4;
  }

  &.active {
    background-color: #eee;
  }
}
</style>