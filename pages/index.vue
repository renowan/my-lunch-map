<template>
  <div class="container search-results-page">
    <div class="row">

      <div class="col-xs-12 pt20 mb30">
        <div class="content-header mb20">
          <h2> 誰でも編集できる <b class="text-primary">シェアマップ</b></h2>
          <p class="lead" v-if="!isLogin">マップ作成するにはGoogleアカウントでのログインが必要です。</p>
          <p class="lead" v-if="isLogin">マップを作成してシェアしましょう。</p>
        </div>

        <div class="login-btn-box" v-if="!isLogin">
          <a class="btn-login-big" @click="login">ログイン</a>
        </div>

        <div class="login-btn-box" v-if="isLogin">
          <nuxt-link to="/create" class="btn-login-big"><i class="fa fa-plus" /> マップ作成</nuxt-link>
        </div>
      </div>

      <div class="col-md-8 col-md-offset-2">
        <div class="panel">
          <div class="panel-heading">
            <span class="panel-title text-muted hidden-xs">マップ一覧</span>
          </div>
          <div class="panel-body pn">

            <table class="table">
              <thead>
                <tr>
                  <th width="40">No.</th>
                  <th>マップ名</th>
                  <th width="200">作成者</th>
                  <th width="140">作成日</th>
                  <th width="60">編集</th>
                </tr>
              </thead>
              <tbody>
                <top-table-tr v-for="(item, index) in mapList" :key="index" :index="index" :item="item" />
              </tbody>
            </table>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'
import TopTableTr from '~/components/TopTableTr'

export default {
  async asyncData({ store, app }) {
    const mapList = await store.dispatch('map/getMap')
    return { mapList }
  },
  components: {
    TopTableTr
  },
  mixins: [authMixin],
  data() {
    return {
      mapList: []
    }
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
.login-btn-box {
  text-align: center;
}
.btn-login-big {
  background-color: #4a89dc;
  border-radius: 5px;
  color: #ffffff;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 45px;
  text-align: center;
  text-decoration: none;
  width: 155px;
  -webkit-text-size-adjust: none;
}

.search-results-page {
  ul.result-meta {
    list-style: none;
    padding-left: 0;
    margin-left: -5px;
    margin-bottom: 5px;
  }

  .search-result h3, .search-result > a {
      display: block;
      margin-bottom: 5px;
  }
}
</style>
