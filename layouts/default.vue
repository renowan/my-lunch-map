<template>
  <div class="main-content">
    <navbar :is-login="isLogin" :user="user" @logout="logout"></navbar>
    <nuxt />
    <loading v-if="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'
import Navbar from '~/components/layout/Navbar.vue'
import Loading from '~/components/layout/Loading.vue'

export default {
  middleware: [
    'authenticate'
  ],
  mixins: [authMixin],
  components: {
    Navbar,
    Loading
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