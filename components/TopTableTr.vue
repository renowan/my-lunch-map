<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td><nuxt-link :to="'/map/' + item.id">{{ item.name }}</nuxt-link></td>
    <td>{{ item.creatorName }}</td>
    <td>{{ myDate }}</td>
    <td>o</td>
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