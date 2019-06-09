<template>
  <div class="card-body">
    <TextInput v-model="userName" label="作成者名" placeholder="作成者名" :max="30" :disabled="true" />
    <TextInput v-model="title" label="タイトル・店名" placeholder="すごい寿司屋" required :showError="isNoTitle" :max="30" />
    <!-- <p v-if="isNoTitle" class="pt-1 text-danger text-sm">タイトルを入力してください。</p> -->

    <TextInput v-model="description" label="コメント" placeholder="おいしい" type="textarea" :max="200" />
    <button type="button" class="btn btn-primary btn-block mb-2" @click="pushMarker">作成</button>
    <button type="button" class="btn btn-secondary btn-block mb-2" @click="addMarkerCancel">キャンセル</button>
    <p v-if="isError" class="pt-3 text-danger text-xs">{{ errorMsg }}</p>
  </div>
</template>

<script lang="js">
import TextInput from '~/components/form/TextInput.vue'

export default {
  name: 'new-marker-form',
  props: {
    userName: { type: String, default: () => '' },
    newMarker: { type: Array, default: () => [] },
    isLogin: { type: Boolean, default: () => false }
  },
  components: {
    TextInput
  },
  computed: {},
  watch: {},
  data () {
    return {
      isError: false,
      isNoTitle: false,
      errorMsg: '',
      noMarkerError: false,
      title: '',
      description: '',
    }
  },
  created () {},
  methods: {
    pushMarker() {
      console.log('this.newMarker.length', this.newMarker.length)
      if (this.newMarker.length < 1) {
        this.isError = true
        this.errorMsg = 'マップにマーカーを設置してください。'
      }
      if (!this.isLogin) {
        this.isError = true
        this.errorMsg = 'ログインしてください。'
      }
      if (!this.title) {
        this.isNoTitle = true
      }
      if (this.isError || this.isNoTitle) {
        return
      }
      this.isError = false
      this.isNoTitle = false
      this.$emit('push-marker', {
        title: this.title,
        description: this.description
      })
    },
    addMarkerCancel() {
      this.$emit('add-marker-cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>