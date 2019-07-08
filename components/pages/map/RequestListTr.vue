<template>
  <tr>
    <td>{{ item.name }}</td>
    <td>{{ item.requestComment }}</td>
    <td class="text-center">
      <template v-if="!item.check">
        <button type="button" class="btn btn-success btn-sm" @click="approval">承認</button>
        <button type="button" class="btn btn-secondary btn-sm" @click="reject">保留</button>
      </template>
      <template v-else>
        <span v-if="item.approve"><i class="ni ni-check-bold"></i> 承認</span>
        <span v-else><i class="ni ni-fat-remove"></i> 保留</span>
      </template>
    </td>
  </tr>
</template>

<script lang="js">
export default {
  name: 'request-list-tr',
  props: {
    item: { type: Object, required: true }
  },
  components: {},
  computed: {},
  watch: {},
  data () {
    return {}
  },
  created () {},
  methods: {
    approval() {
      const item = this.item
      this.$emit('decree', {
        requestId: item.requestId,
        mapid: item.mapid,
        approve: true
      })
    },
    reject() {
      const item = this.item
      this.$emit('decree', {
        requestId: item.requestId,
        mapid: item.mapid,
        approve: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>