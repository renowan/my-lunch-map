<template>
  <div>
    <div class="p-3">
      <h5>{{ markerTitle }}</h5>
    </div>
    <div class="comment-box">
      <table class="table table-flush">
        <tbody>
          <comment-tr v-for="(item, index) in commentList" :key="index" :item="item" />
        </tbody>
      </table>
    </div>
    <div class="comment-input-box pt-4 px-4">
      <div class="form-row">
        <div class="col-10">
          <div class="form-group">
            <input class="form-control" :class="{ 'is-invalid': overLength }" :placeholder="myPlaceholder" type="text" v-model="newComment" :disabled="!isLogin">
            <div v-if="overLength" class="text-xs text-danger mt-2">
              コメントは100文字以内に入力してください。（{{ newComment.length }}文字）
            </div>
          </div>
        </div>
        <div class="col-2">
          <button class="btn btn-primary btn-block" type="button" @click="send" :disabled="!newComment">送信</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import CommentTr from './CommentTr.vue'

export default {
  name: 'comment-box',
  props: {
    marker: { type: Object },
    commentList: { type: Array, default: () => [] },
    commentIndex: { type: Number, default: () => -1 },
    isLogin: { type: Boolean, default: () => false }
  },
  components: {
    CommentTr
  },
  computed: {
    canSend() {
      return this.newComment !== '' && !this.overLength
    },
    overLength() {
      return this.newComment.length > 100
    },
    markerTitle() {
      return this.marker ? this.marker.title : ''
    },
    myPlaceholder() {
      return this.isLogin ? 'コメント' : 'コメントするにはログインが必要です。'
    }
  },
  watch: {
    commentIndex() {
      this.newComment = ''
    }
  },
  data () {
    return {
      newComment: ''
    }
  },
  created () {},
  methods: {
    send() {
      if (!this.isLogin) {
        return
      }
      this.$emit('send-comment', this.newComment)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-box {
  height: 400px;
  overflow-y: scroll;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
}
</style>