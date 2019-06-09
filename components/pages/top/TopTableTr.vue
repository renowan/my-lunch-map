<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <th>
      <nuxt-link :to="'/map/' + item.id">{{ item.name }}</nuxt-link>
    </th>
    <td>{{ item.address }}</td>
    <td class="text-center">
      <i v-if="item.permission === 1" class="ni ni-check-bold text-primary" />
      <i v-else class="ni ni-fat-remove" />
    </td>
    <td>
      {{ item.creatorName }}
    </td>
    <td>
      {{ myDate }}
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
      },
      // canEdit() {
      //   return this.item.permission === 0 ? '✗'
      // }
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