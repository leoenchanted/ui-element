<template>
    <div class="ui-collapse">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import { collapseContextKey, type CollapseEmits, type CollapseProps, type NameType } from './types';

defineOptions({
    name:'ui-collapse'
})
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()
const activeNames = ref<NameType[]>(props.modelValue)
watch(()=>props.modelValue,()=>{
    activeNames.value = props.modelValue
})  //处理监听异步？
if(props.accordion && activeNames.value.length > 1) {
    console.warn('Accordion mode can only have one active item')
}
const handleItemClick = (item: NameType) => {
    if(props.accordion) {
        activeNames.value = [activeNames.value[0] === item ? '' : item]
    }else{
        const index = activeNames.value.indexOf(item)
        if (index > -1) {
            activeNames.value.splice(index, 1)
        }else{
            activeNames.value.push(item)
    }
    }

    emits('update:modelValue', activeNames.value)
    emits('change', activeNames.value)
}
provide(collapseContextKey,{
    activeNames,
    handleItemClick
})
</script>
