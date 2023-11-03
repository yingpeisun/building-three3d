import { onBeforeUnmount, ref } from "vue";
import { EChartsOption } from "echarts";
import axios from "axios";

function increaseDate(dateString: string, days: number) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
}

export default function () {
  let date = "2022/1/1";
  const option = ref<EChartsOption>({});

  function refresh() {
    axios
      .get(`http://35.178.189.142:8080/power-consumption?date=${date}`)
      .then(({ data }) => {
        option.value = {
          title: {
            text: date,
            left: "center",
            top: "5%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          xAxis: {
            type: "category",
          },
          yAxis: {
            type: "value",
          },
          grid: {
            top: "20%",
            left: "12%",
          },
          series: [],
        };
        const series: any[] = [];
        Object.keys(data).forEach((key) => {
          series?.push({
            name: key,
            data: data[key],
            type: "line",
          });
        });
        option.value.series = series;
      });
    date = increaseDate(date, 1);
  }

  refresh();

  const timer = setInterval(() => {
    refresh();
  }, 3000 * 10);

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return {
    option,
    refresh,
  };
}
