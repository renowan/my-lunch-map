<template>
  <tr>
    <td>1</td>
    <th>
      <nuxt-link :to="'/map/' + item.id">{{ item.name }}</nuxt-link>
    </th>
    <td>{{ item.address }}</td>
    <td>
      <span class="badge badge-dot mr-4">
        {{ item.creatorName }}
      </span>
    </td>
    <td>
      <span class="badge badge-dot mr-4">
        {{ myDate }}
      </span>
    </td>
  </tr>
</template>

<script lang="js">
  export default {
    name: 'TopTableTr',
    props: {
      item: { type: Object, required: true },
      index: { type: Number, default: () => 0 }
    },
    components: {},
    computed: {
      myDate() {
        const seconds = this.item.createdAt.seconds * 1000
        const d = new Date(seconds)
        return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
      }
    },
    watch: {},
    data () {
      return {

      }
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
</style>