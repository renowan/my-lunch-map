<template>
  <div class="main-content">
    <navbar :is-login="isLogin" :user="user"></navbar>
    <nuxt />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'
import Navbar from '~/components/layout/Navbar.vue'

export default {
  middleware: [
    'authenticate'
  ],
  mixins: [authMixin],
  components: {
    Navbar
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {}
  )
}
</script>

<style lang="scss" scoped>
</style>