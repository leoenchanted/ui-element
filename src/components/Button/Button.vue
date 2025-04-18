<template>
  <button
    ref="buttonRef"
    class="ui-button"
    :class="{
      [`ui-button--${type}`]: type,
      [`ui-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading"></Icon>
  <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>
<script lang="ts">
export default {
  name: 'ui-Button',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})
const buttonRef = ref<HTMLButtonElement>()
defineExpose({
  buttonRef,
})
</script>

<style scoped>

</style>
