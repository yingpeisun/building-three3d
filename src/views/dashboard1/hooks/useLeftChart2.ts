import { onBeforeUnmount, ref } from "vue";
import { EChartsOption } from "echarts";
import axios from "axios";

export default function () {
  const option = ref<EChartsOption>({});

  async function refresh() {
    const { data = [] } = await axios.get("/api/left/2/static");
    option.value = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        top: "5%",
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
      },
      grid: {
        left: "8%",
        bottom: "12%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "value",
        },
      ],
      yAxis: [
        {
          type: "category",
          axisTick: {
            show: false,
          },
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        },
      ],
      series: [
        {
          name: "Data1",
          type: "bar",
          label: {
            show: true,
            position: "inside",
          },
          emphasis: {
            focus: "series",
          },
          data: data[0],
        },
        {
          name: "Data2",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: data[1],
        },
        {
          name: "Data3",
          type: "bar",
          stack: "Total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: data[2],
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
