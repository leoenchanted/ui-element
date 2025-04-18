<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Button from './components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue';
import Item from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
const buttonRef =ref(null)
const openValue = ref(['b'])
const trigger = ref('click')
const tooltipRef = ref<any>(null)
const open = () => {
  tooltipRef.value.show()
}
const close = () => {
  tooltipRef.value.hide()
}
onMounted(()=>{ 
  console.log(buttonRef.value)
})
</script>

<template>
  <div>
    <header>
      Tooltip
      <Tooltip  placement="right" :trigger="trigger" manual ref="tooltipRef">
        <img src="./assets/logo.svg" alt="" width="125">
        <template #content>
          LLLEo
        </template>
      </Tooltip>
    </header>
    <div>    Leoenchanted
    <Button type="primary" ref="buttonRef" @click="open">test</Button>
    <Button plain  @click="close">Plain Button</Button>
    <Button circle>Circle</Button>
    <Button disabled>disabled</Button>
    <Button>Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <Button plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
    <Button size="small">small</Button>
    <Button size="large">Large</Button>
    <br>
    <Button size="large" icon="arrow-up">Iconnn</Button>
    <Button size="large" loading>Loading</Button>
    </div>
    <div>
      <Collapse v-model="openValue" accordion>
        <Item name="a">
          <template #title>
            <h1>nice</h1>
          </template>
          <div>Content leoencahnted</div>
        </Item>
        <Item name="b" title="leoleoleo">
          <div>Content leoencahnted</div>
        </Item>
        <Item name="c" title="sdlfjnsodi oifjnsdoif" disabled>
          <div>Content leoencahnted</div>
        </Item>
      </Collapse>
    </div>
    <div>
      <Icon icon="arrow-up" size="2xl" spin type="danger" color="#000"></Icon>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
