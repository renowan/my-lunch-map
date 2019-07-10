<template>
  <li class="pin-list" :class="activeCls" @click="onClickMarkList">
    <h4 class="mb-0">
      {{ marker.title }}
    </h4>
    <div class="mb-2">
      <small><i class="ni ni-single-02"></i> {{ marker.user.name }}</small>
      <a v-if="isLogin" class="btn-link float-right ml-3" @click="onClickComment"><i class="fas fa-comments"></i> コメント</a>
      <!-- <a v-if="canEditMarker" class="btn-link float-right ml-3"><i class="fas fa-pen"></i> 編集</a> -->
      <a v-if="canEditMarker" class="btn-link float-right text-danger" @click="removeMarker"><i class="fas fa-times"></i> 削除</a>
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
    index: { type: Number, default: () => -1 },
    userId: { type: String, default: () => undefined },
    isMapOwner: { type: Boolean, default: () => false },
    isLogin: { type: Boolean, default: () => false }
  },
  components: {},
  computed: {
    activeCls() {
      return this.index === this.currentMarkerIndex ? 'active' : ''
    },
    canEditMarker() {
      const isMarkerOwner = this.marker.user.user_id === this.userId
      return this.isMapOwner || isMarkerOwner
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
    },
    onClickComment() {
      this.$emit('on-click-comment', this.marker)
    },
    removeMarker() {
      this.$emit('remove-marker', this.marker)
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
    // background-color: #eee;
    background-color: #f2f1fd;
  }
}
</style>