<template>
    <i class="ui-icon" :class="{
        [`ui-icon--${type}`]:type,
    }"
        :style="customStyles"
        v-bind="$attrs"
    >
        <font-awesome-icon v-bind="filteredProps" />
    </i>
</template>
<script setup lang="ts">
import { omit } from 'lodash-es';
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';
defineOptions({
    name:'ui-icon',
    inheritAttrs: false,
})
const props = defineProps<IconProps>()
const filteredProps = computed(()=>{
    return omit(props,['type','color'])
})
const customStyles = computed(()=>{
    return props.color?{color:props.color}:{}
})
</script>