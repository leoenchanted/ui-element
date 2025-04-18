import Button from "./Button.vue";
import {describe,expect,test} from 'vitest'
import {mount} from '@vue/test-utils'
describe('Button.vue',()=>{
    test('basic button',()=>{
        const wrapper = mount(Button,{
            props:{
                type:'primary'
            },
            slots:{
                default:'Button'
            }
        })
        console.log(wrapper.html())
        expect(wrapper.classes()).toContain('ui-button--primary')
        expect(wrapper.get('button').text()).toBe('Button')
    })
})