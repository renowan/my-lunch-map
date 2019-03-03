<template>
  <div class="default-layout">
    <div class="navbar navbar-fixed-top">
      <div class="navbar-branding dark">
        <nuxt-link to="/" class="navbar-brand"><b>ランチマップ</b></nuxt-link>
      </div>
      <ul class="nav navbar-nav navbar-right">
        <li v-if="isLogin">
          <nuxt-link to="/create" class="btn btn-create-map"><i class="fa fa-plus" /> マップ作成</nuxt-link>
        </li>
        <li v-if="!isLogin">
          <a class="btn" @click="login"><i class="fa fa-google-plus" /> Google Sign in</a>
        </li>
        <li class="dropdown" v-if="isLogin">
          <a class="dropdown-toggle fw600 p15"><img :src="user.picture" alt="avatar" class="mw30 br64 mr15"> {{ user.name }}
          </a>
        </li>
      </ul>
    </div>
    <section>
      <nuxt />
    </section>

    <vue-element-loading :active="isLoading" spinner="spinner" color="#3078D7" background-color="rgba(255, 255, 255, .6)" no-ssr />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'

export default {
  middleware: [
    'authenticate'
  ],
  mixins: [authMixin],
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

<style lang="scss">
section {
  padding-top: 60px;
  height: 100%;

  & > div {
    height: 100%;
  }
}

.default-layout {
  width: 100%;
  height: 100%;
}

.navbar .nav > li > a.btn-create-map {
  color: #4a89dc;
}
</style>
