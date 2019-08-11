<template>
  <div class="table-responsive">
    <table class="table align-items-center table-flush">
      <thead class="thead-light">
        <tr>
          <th scope="col" width="30">No.</th>
          <th scope="col">作成者</th>
          <th scope="col" width="200">エリア</th>
          <th scope="col" width="120" class="text-center">編集権リクエスト</th>
          <th scope="col" width="200">作成者</th>
          <th scope="col" width="200">作成日</th>
        </tr>
      </thead>
      <tbody>
        <TopTableTr v-for="(item, index) in mapList" :key="index" :item="item" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<script lang="js">
import TopTableTr from './TopTableTr.vue'

export default {
  name: 'navbar',
  props: {
    mapList: { type: Array, default: () => [] }
  },
  components: {
    TopTableTr
  },
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
</style>