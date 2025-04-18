<template>
    <div class="uicollapse-item"
         :class="{
            'is-disabled':disabled,
         }"   
    >
    <div class="ui-collapse-item__header" 
         :class="{
            'is-active':isActive,
            'is-disabled':disabled,
         }"
        :id="`item-header-${name}`" @click="handldClick"> 
        <slot name="title">{{ title }}</slot>
        <Icon icon="angle-right" class="header-angle"></Icon>
    </div>
    <Transition name="slide" v-on="transitionEvents">
        <div class="ui-collapse-item__warpper" v-show="isActive">
            <div class="ui-collapse-item__content" :id="`item-content-${name}`" >
                <slot></slot>
            </div>
        </div>
    </Transition>   
    </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { collapseContextKey, type CollapseItemProps } from './types'
import Icon from '../Icon/Icon.vue'
defineOptions({
    name:'ui-collapse-item'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(collapseContextKey)
const isActive = computed(() => {
    return collapseContext?.activeNames.value.includes(props.name)
})
const handldClick = () => {
    if(props.disabled){return}
    collapseContext?.handleItemClick(props.name)
}
const transitionEvents: Record<string,(el:HTMLElement)=>void> = {
    beforeEnter(el) {
        el.style.height = '0px'
        el.style.overflow = 'hidden'
    },
    enter(el) {
        el.style.height = `${el.scrollHeight}px`
    },
    afterEnter(el) {
        el.style.height = ''
        el.style.overflow = ''
    },
    beforeLeave(el) {
        el.style.height = `${el.scrollHeight}px`
        el.style.overflow = 'hidden'
    },
    leave(el) {
        el.style.height = '0px'

    },
    afterLeave(el) {
        el.style.height = ''
        el.style.overflow = ''
    }
}
</script>
<style scoped>

</style>