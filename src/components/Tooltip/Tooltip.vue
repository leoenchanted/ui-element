<template>
    <div class="ui-tooltip" v-on="outerEvents" ref="popperContainerNode">
        <div class="ui-tooltip__trigger"
        ref="triggerNode"
        v-on="events">
            <slot></slot>
        </div>
        <Transition :name="transition">
            <div v-if="isOpen" class="ui-tooltip__popper" ref="popperNode">
                <slot name="content">{{ content }}</slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </Transition>
    </div>
</template>
<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from 'vue';
import type { TooltipEmits, TooltipInstance, TooltipPros } from './type';
import { createPopper, type Instance } from '@popperjs/core';
import useClickOutside from '@/hooks/useClickOutside';
import { debounce } from 'lodash-es';

const props = withDefaults(defineProps<TooltipPros>(),{
    placement: 'bottom',
    trigger:'hover',
    transition:'fade',
    openDelay:0,
    closeDelay:0,

})
const emits = defineEmits<TooltipEmits>()
let popperInstance:Instance | null = null
let events:Record<string,any> = reactive({})
let outerEvents:Record<string,any> = reactive({})
const popperOptions = computed(()=>{
    return {
        placement:props.placement,
        modifiers:[
            {
                name:'offset',
                options:{
                    offset:[0,9]
                }
            }
        ],
        ...props.popperOptions
    }
})
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

const open = ()=>{
    isOpen.value = true
    emits('visible-change',true)
}
const close = ()=>{
    isOpen.value = false
    emits('visible-change',false)
}
const openDebounce = debounce(open,props.openDelay)
const closeDebounce = debounce(close,props.closeDelay)
const openFinal = ()=>{
    closeDebounce.cancel()
    openDebounce()
}
const closeFinal = ()=>{
    openDebounce.cancel()
    closeDebounce()
}
const togglePopper = () => {
    if(isOpen.value){
      closeFinal() 
    }else{
        openFinal()
    }
}
useClickOutside(popperContainerNode,()=>{
    if(props.trigger === 'click' && isOpen.value && !props.manual){
        closeFinal()
    }
})
const attachEvents=()=>{
    if(props.trigger === 'hover'){
        events['mouseenter'] = open
        outerEvents['mouseleave'] = close
    }else if(props.trigger === 'click'){
        events['click'] = togglePopper
    }
}
if(!props.manual){
    attachEvents()
}
watch(()=>props.manual,(isManual)=>{
    if(isManual){
        events = {}
        outerEvents = {}
    }else{
        attachEvents()
    }
})
watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
   if(newTrigger!==oldTrigger){
    events = {}
    outerEvents = {}
    attachEvents()
   } 
})
watch(()=>isOpen.value,(newValue)=>{
    if(newValue){
       if(triggerNode.value && popperNode.value){
        popperInstance = createPopper(triggerNode.value,popperNode.value,popperOptions.value)
       }else{
        popperInstance?.destroy()
       }
    }
},{
    flush:'post'
}
)
onUnmounted(()=>{
    popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
    'show':openFinal,
   'hide':closeFinal,
})
</script>