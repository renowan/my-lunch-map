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
        <a href="https://www.creative-tim.com/product/argon-dashboard-pro" target="_blank" class="btn btn-neutral btn-icon">
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
              <!-- <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg"> -->
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</nav>
</template>

<script lang="js">
export default {
  name: 'navbar',
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
.btn-inner--icon {
  position: relative;
  top: -1px;
}

.navbar-brand {
  font-weight: 700;
  color: #fff;
}
</style>