// 从vue中导入类型声明
import type { InjectionKey, Ref } from "vue";

// 定义名称类型，可以是字符串或数字
export type NameType = string | number;

export interface CollapseProps {
    modelValue:NameType[],
    accordion?:boolean,
}


// 定义折叠面板项的接口
export interface CollapseItemProps {
    // 项目的唯一标识
    name: NameType,
    // 可选的标题
    title?: string,
    // 是否禁用
    disabled?: boolean,
}

// 定义折叠面板上下文接口
export interface CollapseContext {
    // 当前激活的面板名称数组
    activeNames: Ref<NameType[]>,
    // 处理面板项点击的方法
    handleItemClick: (name: NameType) => void,
}

export interface CollapseEmits {
    (e: "update:modelValue", value: NameType[]): void,
    (e: "change", value: NameType[]): void,
}

// 定义折叠面板的注入键
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol("collapseContextKey");
