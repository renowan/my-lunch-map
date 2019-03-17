<template>
<nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
  <div class="container-fluid">
    <!-- Brand -->
    <nuxt-link class="navbar-brand" to="/">Share Your Map</nuxt-link>
    <!-- <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a href="./pages/dashboards/dashboard.html" class="nav-link">
          <span class="nav-link-inner--text">Dashboard</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="./pages/examples/pricing.html" class="nav-link">
          <span class="nav-link-inner--text">Pricing</span>
        </a>
      </li>
    </ul> -->
    <!-- User -->
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item d-none d-lg-block ml-lg-4">
        <a class="btn btn-neutral btn-icon" v-if="isLogin">
          <span class="btn-inner--icon">
            <i class="ni ni-fat-add"></i>
          </span>
          <span class="nav-link-inner--text">マップ作成</span>
        </a>
        <a class="btn btn-neutral btn-icon" @click="login" v-else>
          <span class="btn-inner--icon">
            <span class="btn-inner--icon"><img src="~/assets/img/icons/common/google.svg"></span>
          </span>
          <span class="nav-link-inner--text">ログイン</span>
        </a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <div class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img alt="Image placeholder" :src="user.picture">
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{ user.name }}</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script lang="js">
import authMixin from '~/mixins/auth'

export default {
  name: 'navbar',
  props: {
    isLogin: { type: Boolean , default: () => false },
    user: { type: Object , required: true }
  },
  components: {},
  mixins: [authMixin],
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
.btn-inner--icon {
  position: relative;
  top: -1px;
}

.navbar-brand {
  font-weight: 700;
  color: #fff;
}
</style>