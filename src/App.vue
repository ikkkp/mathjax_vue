<template>
  <div id="mytest">
    <div id="frame">
      <h1>MathJax v3: TeX &amp; MathML to HTML</h1>
      <textarea id="input" rows="15" cols="10" v-model="test" @input="convert()">
            <!--  Enter HTML containing TeX or MathML below -->

            If $a \ne 0$, then $ax^2 + bx + c = 0$ has two solutions, $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</textarea>
      <br />
    </div>

    <div>{{str}}</div>

  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";

const test = ref("");
const str = computed(() => {
  return `$ ${test.value} $`;
});

function convert() {
  // Your convert function logic
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise();
}

// 使用 watch 监听 computed 属性的变化
watch(str, () => {
  convert();
});
</script>

<style lang="less" scoped>
#frame {
  max-width: 40em;
  margin: auto;
}

#input {
  border: 1px solid grey;
  margin: 0 0 0.25em;
  width: 100%;
  box-sizing: border-box;
}

#output {
  margin-top: 0.75em;
  border: 1px solid grey;
  padding: 0.25em;
  min-height: 2em;
}

#output>pre {
  margin-left: 5px;
}

.right {
  float: right;
}
</style>
