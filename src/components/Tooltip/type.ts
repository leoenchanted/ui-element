import type { Placement , Options } from "@popperjs/core"
export interface TooltipPros {
    content?:string
    trigger?:'hover' | 'click'
    placement?:Placement,
    manual?:boolean
    popperOptions?:Partial<Options>   //Partial让里面的选项全部变成可选的
    transition?:string
    openDelay?:number
    closeDelay?:number
}

export interface TooltipEmits {
    (e:'visible-change',value:boolean):void
}

export interface TooltipInstance {
   show:()=>void
   hide:()=>void 
}