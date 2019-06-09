<template>
<div>
  <div class="header bg-gradient-primary pt-5 pt-md-7">
    <div class="container-fluid">
      <div class="header-body">

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

          <top-table-footer
          :page="page"
          :prev-disabled="prevDisabled"
          :next-disabled="nextDisabled"
          @go-prev="goPrev"
          @go-next="goNext" />

        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import authMixin from '~/mixins/auth'
import CardStats from '~/components/layout/CardStats'
import TopTable from '~/components/pages/top/TopTable.vue'
import TopTableFooter from '~/components/pages/top/TopTableFooter.vue'

const count = 10

export default {
  async asyncData({ store, app }) {
    // const mapList = await store.dispatch('map/getMap', count)
    const params = { count, page: 0 }
    const mapList = await store.dispatch('map/pagnation', params)
    return { mapList }
  },
  components: {
    CardStats,
    TopTable,
    TopTableFooter
  },
  mixins: [authMixin],
  data() {
    return {
      page: 0,
      mapList: []
    }
  },
  computed: Object.assign({},
    mapGetters({
      app: 'app/state',
      user: 'app/user',
      isLoading: 'app/isLoading',
      isLogin: 'app/isLogin'
    }), {
      prevDisabled() {
        return this.page < 1
      },
      nextDisabled() {
        return !this.mapList.length
      }
    }
  ),
  methods: {
    goPrev() {
      if (this.page < 1) {
        return
      }
      this.page -= 1
      this.loadMapList()
    },
    goNext() {
      console.log('goNext')
      this.page += 1
      this.loadMapList()
    },
    loadMapList() {
      const params = { count, page: this.page }
      this.$store.dispatch('map/pagnation', params).then(response => {
        this.mapList = response
      })
    }
  }
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
