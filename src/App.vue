<template>
  <div id="mytest">
    <div id="frame">
      <!-- 实例1: -->
      <h1>MathJax v3: TeX &amp; MathML to HTML</h1>
      <textarea id="input" rows="15" cols="10" v-model="test">
            <!--  Enter HTML containing TeX or MathML below -->

            If $a \ne 0$, then $ax^2 + bx + c = 0$ has two solutions, $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
            </textarea>
      <br />
      <div class="right">
        <input id="render" type="button" value="Render HTML" @click="convert()" />
      </div>
    </div>

    <div>{{str}}</div>

  </div>
</template>

<script setup>

import {computed, nextTick, onMounted, ref} from "vue";
const test = ref("");
const str = computed(() => `$$ ${test.value} $$`);
function convert() {
  MathJax.texReset();
  MathJax.typesetClear();
  MathJax.typesetPromise()
      .catch((err) => {
        //
        //  If there was an internal error, put the message into the output instead
        //
        output.innerHTML = "";
        output
            .appendChild(document.createElement("pre"))
            .appendChild(document.createTextNode(err.message));
      })
      .then(() => {
        //
        //  Error or not, re-enable the render button
        //
        button.disabled = false;
      });
}

onMounted(() => {
  nextTick(() => {
    MathJax.texReset();
    MathJax.typesetClear();
    MathJax.typesetPromise().catch(err => {
      str.value = err.message
    });
  });
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
