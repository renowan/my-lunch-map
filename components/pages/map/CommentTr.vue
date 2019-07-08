<template>
  <tr>
    <th class="pr-0" width="55">
      <a class="avatar rounded-circle mr-1">
        <img :src="item.picture">
      </a>
    </th>
    <td>
      <div class="row">
        <div class="col-8">
          <h5>{{ item.name }}</h5>
        </div>
        <div class="col-4 text-right">
          {{ createdAt }}
        </div>
        <div class="col-12">
          {{ item.comment }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="js">
export default {
  name: 'comment-tr',
  props: {
    item: { type: Object, required: true }
  },
  components: {},
  computed: {
    createdAt() {
      const seconds = this.item.createdAt.seconds * 1000
      const d = new Date(seconds)
      return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }
  },
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