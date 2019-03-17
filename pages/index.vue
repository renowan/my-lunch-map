<template>
<div>
  <div class="header bg-gradient-primary pt-5 pt-md-7">
    <div class="container-fluid">
      <div class="header-body">
        <!-- Card stats -->

        マップを作ってシェアしましょう<br>
        <small>マップを作るにはログインが必要です</small>

      </div>
    </div>
  </div>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <div class="card shadow">

          <div class="card-header border-0">
            <h3 class="mb-0">マップ一覧</h3>
          </div>

          <TopTable :map-list="mapList" />


          <top-table-footer />


        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'
// import TopTableTr from '~/components/TopTableTr'
import CardStats from '~/components/layout/CardStats'
import TopTable from '~/components/pages/top/TopTable.vue'
import TopTableFooter from '~/components/pages/top/TopTableFooter.vue'

export default {
  async asyncData({ store, app }) {
    const mapList = await store.dispatch('map/getMap')
    return { mapList }
  },
  components: {
    // TopTableTr,
    CardStats,
    TopTable,
    TopTableFooter
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
.header-body {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  padding-bottom: 8rem;
}
</style>
