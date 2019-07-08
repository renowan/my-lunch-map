<template>
  <div>
    <table class="table align-items-center" v-if="list.length">
      <thead class="thead-light">
        <tr>
          <th width="230">ユーザー名</th>
          <th>コメント</th>
          <th width="150" class="text-right"></th>
        </tr>
      </thead>
      <tbody class="list">
        <request-list-tr v-for="(item, index) in list" :key="index" :item="item" @decree="decree" />
      </tbody>
    </table>
    <div v-else class="pt-4 text-center">
      リクエストがありません
    </div>
  </div>
</template>

<script lang="js">
import RequestListTr from './RequestListTr.vue'

export default {
  name: 'request-list',
  props: {
    list: { type: Array, default: () => [] }
  },
  components: {
    RequestListTr
  },
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    decree(order) {
      this.$emit('decree', order)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>