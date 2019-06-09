<template>
<li class="nav-item dropdown" :class="showCls" v-on-clickaway="close">
  <a @click="toggle" class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <div class="media align-items-center">
      <span class="avatar avatar-sm rounded-circle">
        <img alt="Image placeholder" :src="user.picture">
      </span>
      <div class="media-body ml-2 d-none d-lg-block">
        <span class="mb-0 text-sm  font-weight-bold">{{ user.name }}</span>
      </div>
    </div>
  </a>
  <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right" :class="showCls">
    <div class=" dropdown-header noti-title">
      <h6 class="text-overflow m-0">Welcome!</h6>
    </div>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" @click="logout">
      <i class="ni ni-user-run"></i>
      <span>ログアウト</span>
    </a>
  </div>
</li>
</template>

<script lang="js">
import { mixin as clickaway } from 'vue-clickaway'

export default {
  name: 'user-dropdown',
  mixins: [ clickaway ],
  props: {
    user: { type: Object, required: true }
  },
  components: {},
  computed: {
    showCls() {
      return this.show ? 'show' : ''
    }
  },
  watch: {},
  data () {
    return {
      show: false
    }
  },
  created () {},
  methods: {
    toggle() {
      this.show = !this.show
    },
    close() {
      this.show = false
    },
    logout() {
      this.$emit('logout')
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>