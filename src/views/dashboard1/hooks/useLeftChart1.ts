import { onBeforeUnmount, ref } from "vue";
import { EChartsOption } from "echarts";
import axios from "axios";

export default function () {
  const option = ref<EChartsOption>({});

  async function refresh() {
    const { data = [] } = await axios.get("/api/left/1/static");

    option.value = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wes", "Thur", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      grid: {
        left: "12%",
      },
      series: [
        {
          data: data[0],
          type: "line",
        },
        {
          data: data[1],
          type: "line",
        },
        {
          data: data[2],
          type: "line",
        },
      ],
    };
  }

  refresh().then();

  const timer = setInterval(async () => {
    await refresh();
  }, 1000 * 10);

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return {
    option,
    refresh,
  };
}
