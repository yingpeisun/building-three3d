import { createApp } from "vue";
import "./style.less";
import App from "./App.vue";
import Chart from "./components/chart/index.vue";
import * as echarts from "echarts";
import echartsConfig from "./config/echarts.config";
import "./mock";

echarts.registerTheme("t-theme", echartsConfig);

const app = createApp(App);

app.component("TChart", Chart);

app.mount("#app");
