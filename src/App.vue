<template>
  <div id="mytest">
    <div id="frame">
      <!-- 实例1: -->
      <h1>MathJax v3: TeX &amp; MathML to HTML</h1>
      <textarea id="input" rows="15" cols="10">
            <!--  Enter HTML containing TeX or MathML below -->

            If $a \ne 0$, then $ax^2 + bx + c = 0$ has two solutions, $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$

            As MathML:
            <math>
                <mi>a</mi>
                <msup>
                    <mi>x</mi>
                    <mn>2</mn>
                </msup>
                <mo>+</mo>
                <mi>b</mi>
                <mi>x</mi>
                <mo>+</mo>
                <mi>c</mi>
                <mo>=</mo>
                <mn>0</mn>
            </math>.
            </textarea>
      <br />
      <div class="right">
        <input id="render" type="button" value="Render HTML" @click="convert()" />
      </div>
      <br clear="all" />
      <div id="output"></div>
    </div>

    <!-- 示例2: -->
    <div>
      If $a \ne 0$, then $ax^2 + bx + c = 0$ has two solutions, $$x = {-b \pm
      \sqrt{b^2-4ac} \over 2a}.$$
    </div>

    <!-- 示例3: -->
    <div v-html="str"></div>

    <!-- 示例4: -->
    {{ str2 }}

    <!-- 示例5 -->
    $$ {\partial u \over \partial t} = k * ({\partial^2 u \over \partial x^2}+{\partial^2 u \over
    \partial y^2}+{\partial^2 u \over \partial z^2})$$
  </div>
</template>

<script lang="ts" setup>

import {nextTick, onMounted, ref} from "vue";
const str2 = "$$ {\\partial u \\over \\partial t} = k * ({\\partial^2 u \\over \\partial x^2}+{\\partial^2 u \\over \\partial y^2}+{\\partial^2 u \\over \\partial z^2})$$"; // js里需要使用 双反斜杠 mathjax才能识别
const str = ref("$$ {\\partial u \\over \\partial t} = k * ({\\partial^2 u \\over \\partial x^2}+{\\partial^2 u \\over \\partial y^2}+{\\partial^2 u \\over \\partial z^2})$$");

function convert() {
  //
  //  Get the input (it is HTML containing delimited TeX math
  //    and/or MathML tags
  //
  const input = document.getElementById("input").value.trim();
  //
  //  Disable the render button until MathJax is done
  //
  const button = document.getElementById("render");
  button.disabled = true;
  //
  //  Clear the old output
  //
  const output = document.getElementById("output");
  output.innerHTML = input;
  //
  //  Reset the tex labels (and automatic equation numbers, though there aren't any here).
  //  Reset the typesetting system (font caches, etc.)
  //  Typeset the page, using a promise to let us know when that is complete
  //
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
