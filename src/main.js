import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import "@/utils/mathjax"; // 必须在引入mathjax前引入mathjax的配置文件
import "mathjax/es5/tex-mml-chtml"; // 使用 tex-mml-chtml


createApp(App).mount('#app')
