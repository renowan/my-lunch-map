<template>
  <div>

    <div class="container" v-if="mapDetail">
      <div class="row pt20 mb30">
        <div class="col-xs-9">

          <h4>{{ mapDetail.name }}<small class="ml10"> 作成者: {{ mapDetail.creatorName }}</small></h4>
          <p class="text-muted">{{ mapDetail.comment || 'コメントなし' }}</p>

        </div>
        <div class="col-xs-3 text-right">
          <span class="label label-primary" v-if="permissionLabel === 1"><i class="fa fa-certificate"></i> マップオーナー</span>
          <span class="label label-default" v-if="permissionLabel === 2"><i class="fa fa-lock"></i> 編集不可</span>
          <span class="label label-primary" v-if="permissionLabel === 3"><i class="fa fa-pencil"></i> 誰でも編集できる</span>
        </div>
      </div>
    </div>

    <div class="mapplic-element" v-if="mapDetail">
      <div class="mapplic-container">1</div>
      <div class="mapplic-sidebar">
        <div class="mapplic-list-container">
          sss
        </div>
      </div>
    </div>

    <div class="container" v-if="noFind">
      <div class="col-xs-12 pt40 error-box">
        <h2 class="mb30">マップデータがありません</h2>
        <nuxt-link to="/">Topに戻る</nuxt-link>
      </div>
    </div>
    <div class="container" v-if="error">
      <div class="col-xs-12 pt40 error-box">
        <h2 class="mb30">エラー</h2>
        <nuxt-link to="/">Topに戻る</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default {
  name: 'map-page',
  async asyncData({ store, app, params }) {
    const mapid = params.id
    if (!mapid) {
      return { error: true }
    }
    const mapDetail = await store.dispatch('map/getMapDetail', mapid)
    if (!mapDetail.name) {
      return { noFind: true }
    }
    console.log('mapDetail', mapDetail)
    return { mapDetail }
  },
  components: {},
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
      permissionLabel() {
        const mapDetail = this.mapDetail
        const user = this.user
        if (!mapDetail) {
          return 0
        }

        if (!user) {
          return 2
        }

        // Owner
        if (mapDetail.user.user_id === user.user_id) {
          return 1
        }

        // 2 = 編集不可, 3 = 誰でも
        return mapDetail.permission === 0 ? 2 : 3
      }
    }
  ),
  watch: {},
  data () {
    return {
      mapDetail: null,
      noFind: false,
      error: false
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.error-box {
  margin-top: 120px;
  text-align: center;
}

.mapplic-element {
  background-color: #f8f8f8;
  overflow: hidden;
  height: 600px;
  .mapplic-container {
    background-color: #f8f8f8;
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: 70%;
    height: 100%;
    border-left: 1px solid #e5e5e5;
  }
  .mapplic-sidebar {
    background-color: #fafafa;
    width: 30%;
    height: 100%;
    float: left;
    position: relative;
  }
  .mapplic-list-container {
    padding: 25px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
  }
}
</style>