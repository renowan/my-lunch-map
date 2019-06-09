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
        <nuxt-link to="/create" class="btn btn-neutral btn-icon" v-if="isLogin">
          <span class="btn-inner--icon">
            <i class="ni ni-fat-add"></i>
          </span>
          <span class="nav-link-inner--text">マップ作成</span>
        </nuxt-link>
        <a class="btn btn-neutral btn-icon" @click="login" v-else>
          <span class="btn-inner--icon">
            <span class="btn-inner--icon"><img src="~/assets/img/icons/common/google.svg"></span>
          </span>
          <span class="nav-link-inner--text">ログイン</span>
        </a>
      </li>
      <user-drop-down v-if="isLogin" :user="user" @logout="logout" />
    </ul>
  </div>
</nav>
</template>

<script lang="js">
import authMixin from '~/mixins/auth'
import UserDropDown from '~/components/layout/UserDropdown.vue'

export default {
  name: 'navbar',
  props: {
    isLogin: { type: Boolean , default: () => false },
    user: { required: true }
  },
  components: {
    UserDropDown
  },
  mixins: [authMixin],
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
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