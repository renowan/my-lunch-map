<template>
  <div class="form-group">
    <label class="form-control-label">
      <span class="text-danger" v-if="required">*</span> {{ label }}
    </label>
    <input v-if="isInput" type="text" class="form-control" :placeholder="placeholder" v-model="localValue" @input="onInput" :disabled="disabled">
    <textarea v-if="isTextarea" :rows="rows" class="form-control" :placeholder="placeholder" v-model="localValue" @input="onInput" />
    <div v-if="showError && hasError" class="mt-2 help-block text-xs text-danger">
      <i class="fa fa-exclamation-triangle"></i> <span v-if="required">必須項目です。</span>{{ max }}文字までに入れてください。
    </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'input-form',
  props: {
    required: { type: Boolean, default: () => false },
    disabled: { type: Boolean, default: () => false },
    label: { type: String, default: () => 'label' },
    placeholder: { type: String, default: () => '' },
    value: { type: String, default: () => '' },
    max: { type: Number, default: () => 30 },
    rows: { type: Number, default: () => 2 },
    showError: { type: Boolean, default: () => false },
    type: { type: String, default: () => 'input' }
  },
  components: {},
  computed: {
    hasError() {
      const localValue = this.localValue
      const length = this.localValue.length
      if (this.required && localValue === '') {
        return true
      }
      if (length > this.max) {
        return true
      }
      return false
    },
    isInput() {
      return this.type === 'input'
    },
    isTextarea() {
      return this.type === 'textarea'
    }
  },
  watch: {
    value(val) {
      if (val !== this.localValue) {
        this.localValue = val
      }
    }
  },
  data () {
    return {
      localValue: ''
    }
  },
  created () {
    this.localValue = this.value
  },
  methods: {
    onInput(val) {
      this.$emit('input', this.localValue)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>