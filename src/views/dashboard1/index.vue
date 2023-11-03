<script lang="ts" setup>
import useLeftChart1 from "./hooks/useLeftChart1";
import SwitchPageBtn from "./components/btn";
import { ref } from "vue";
import useLeftChart2 from "./hooks/useLeftChart2";
import useLeftChart3 from "./hooks/useLeftChart3";
import useRightChart1 from "./hooks/useRightChart1";
import useRightChart2 from "./hooks/useRightChart2";
import useRightChart3 from "./hooks/useRightChart3";
import axios from "axios";
import useModelRender from "@/hooks/useModelRender";

const dataDialog = ref();
const floorPlanDialog = ref();
const leftChart1 = useLeftChart1();
const leftChart2 = useLeftChart2();
const leftChart3 = useLeftChart3();
const rightChart1 = useRightChart1();
const rightChart2 = useRightChart2();
const rightChart3 = useRightChart3();
const currentTab = ref<number>(1);

// const { mapInstance } = useMap("mapContainer");
//
// useLayerStack(mapInstance);

function switchPage(tab: number) {
  currentTab.value = tab;
}

const tabs = {
  left: [
    { id: 1, text: "Page1" },
    { id: 2, text: "Page2" },
    { id: 3, text: "Page3" },
  ],
  right: [
    { id: 4, text: "Page4" },
    { id: 5, text: "Page5" },
    { id: 6, text: "Page6" },
  ],
};

const data = ref([]);

useModelRender("mapContainer");

function showData() {
  dataDialog.value.showModal();
  axios.get("/api/data").then((res) => {
    data.value = res.data;
  });
}
</script>

<template>
  <div class="dashboard">
    <div class="main">
      <div class="top-count-group">
        <div class="item">
          <div class="title">Index</div>
        </div>
        <div class="item" @click="floorPlanDialog.showModal()">
          <div class="title">Model</div>
        </div>
        <div class="item">
          <div class="title">Monitor</div>
        </div>
        <div class="item" @click="showData">
          <div class="title">Data</div>
        </div>
      </div>
      <div class="btn-group">
        <div class="left">
          <SwitchPageBtn
            v-for="tab in tabs.left"
            :active="currentTab === tab.id"
            :text="tab.text"
            direction="left"
            @click="switchPage(tab.id)"
          />
        </div>
        <div class="right">
          <SwitchPageBtn
            v-for="tab in tabs.right"
            :active="currentTab === tab.id"
            :text="tab.text"
            direction="right"
            @click="switchPage(tab.id)"
          />
        </div>
      </div>
      <div class="center">
        <div class="left">
          <div class="card-1">
            <div class="title">DataStatic</div>
            <TChart :option="leftChart1.option" />
          </div>
          <div class="card-2">
            <div class="title">DataStatic</div>
            <TChart :option="leftChart2.option" />
          </div>
          <div class="card-3">
            <div class="title">DataStatic</div>
            <!--            <TChart :option="leftChart3.option"/>-->
          </div>
        </div>
        <div class="middle">
          <div id="mapContainer" />
        </div>
        <div class="right">
          <div class="card-1">
            <div class="title">Power consumption statistics</div>
            <TChart :option="rightChart1.option" />
          </div>
          <div class="card-2">
            <div class="title">DataStatic</div>
            <!--            <TChart :option="rightChart2.option"/>-->
          </div>
          <div class="card-3">
            <div class="title">DataStatic</div>
            <!--            <TChart :option="rightChart3.option"/>-->
          </div>
        </div>
      </div>
      <div class="base-group">
        <div class="base">
          <div class="name">Day</div>
          <div class="number">52</div>
        </div>
        <div class="base">
          <div class="name">Month</div>
          <div class="number">188</div>
        </div>
        <div class="base">
          <div class="name">Year</div>
          <div class="number">2660</div>
        </div>
        <div class="base">
          <div class="name">Total</div>
          <div class="number">99999</div>
        </div>
      </div>
    </div>
    <dialog ref="dataDialog" class="modal data">
      <h2>Structural column schedule</h2>
      <table>
        <thead>
          <tr>
            <th v-for="(th, index) in data[0]" :key="index">{{ th }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(tr, i) in data.slice(1)" :key="i">
            <td v-for="(td, j) in tr" :key="j">{{ td }}</td>
          </tr>
        </tbody>
      </table>
      <button class="btn" @click="dataDialog.close()">Close</button>
    </dialog>
    <dialog ref="floorPlanDialog" class="modal floor-plan">
      <iframe
        height="90%"
        src="file/三层Revit商务办公楼模型.pdf"
        width="98%"
      ></iframe>
      <button class="btn" @click="floorPlanDialog.close()">Close</button>
    </dialog>
  </div>
</template>

<style lang="less" scoped>
.dashboard {
  width: 1980px;
  height: 1080px;
  position: relative;
  background-image: url("./assets/头部动画.webp"), url("./assets/头部动画.png"),
    url("./assets/整体边框_静态图片.png"), url("./assets/底部动画.webp"),
    url("./assets/底部动画.png"), url("./assets/头部动画_左侧点.webp"),
    url("./assets/头部动画_左侧点.png"), url("./assets/头部动画_右侧点.webp"),
    url("./assets/头部动画_右侧点.png"), url("./assets/背景_静态图片.jpg");
  background-position:
    top,
    top,
    center,
    bottom,
    bottom,
    left top,
    left top,
    right top,
    right top,
    center;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat,
    no-repeat, no-repeat;
  background-size:
    100%,
    100%,
    100% 100%,
    100%,
    100%,
    auto,
    auto,
    auto,
    auto,
    100% 100%;

  &:before {
    content: "Data visualization big screen";
    color: #fff;
    letter-spacing: 0;
    font-size: 36px;
    line-height: 70px;
    width: 100%;
    font-weight: bold;
    position: absolute;
    text-align: center;
  }

  .modal {
    position: absolute;
    background-color: rgb(37 98 160 / 69%);
    width: 60%;
    height: 60%;
    padding: 14px;
    border-radius: 8px;
    color: #fff;
    text-align: center;

    .btn {
      color: #fff;
      background-color: transparent;
      border-radius: 5px;
      padding: 4px 14px;
      font-size: 1.2rem;
    }

    table {
      height: 75%;
      border-collapse: collapse;

      th {
        padding: 8px 0;
        background: #ccc;
      }

      thead {
        display: table;
        width: calc(100% - 1rem);
        table-layout: fixed;
      }

      tbody {
        display: block;
        height: inherit;
        overflow-y: scroll;
        overflow-x: hidden;

        tr {
          display: table;
          width: 100%;
          table-layout: fixed;
        }
      }

      td {
        border: 1px solid #ccc;
        padding: 4px 0;
      }
    }
  }
}

.background {
  position: relative;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;

  .top-count-group {
    position: absolute;
    display: flex;
    justify-content: center;
    gap: 40px;
    text-align: center;
    width: 100%;
    height: 80px;
    top: 8%;
    background-image: url("./assets/头部吊坠.png");
    background-repeat: no-repeat;
    background-position: center;

    .title {
      color: rgb(60, 193, 238);
      font-weight: 600;
      padding-top: 14px;
      font-size: 18px;
    }

    .number {
      font-weight: bold;
      background-image: -webkit-linear-gradient(
        top,
        rgb(157, 195, 234),
        #fff,
        rgb(96, 162, 225)
      );
      user-select: none;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      color: #fff;
      font-size: 18px;
    }
  }

  .btn-group {
    position: absolute;
    top: 5%;
    display: flex;
    justify-content: center;
    left: 50%;
    gap: 100%;
    transform: translateX(-50%);

    .left {
      display: flex;
      justify-content: space-between;
      gap: 30px;
    }

    .right {
      display: flex;
      justify-content: space-between;
      gap: 30px;
    }
  }

  .center {
    height: 100%;
    display: flex;

    .middle {
      #mapContainer {
        margin-top: 12%;
        width: 100%;
        height: 80%;
      }
    }

    [class^="card-"] {
      width: 100%;
      position: relative;
      background-image: url("./assets/01.webp"), url("./assets/01.png"),
        url("./assets/标题1_静态背景.png"), url("./assets/卡片背景.png");
      background-repeat: no-repeat;
      background-position:
        top,
        top,
        top,
        20px 40px;
      background-size: 100%;

      .title {
        font-weight: bold;
        background-image: -webkit-linear-gradient(
          top,
          rgb(157, 195, 234),
          #fff,
          rgb(96, 162, 225)
        );
        user-select: none;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        line-height: 30px;
        margin-left: 80px;
        color: #fff;
        font-size: 18px;
      }
    }

    .middle {
      width: 50%;
      height: 100%;
    }

    .left {
      padding-left: 30px;
    }

    .right {
      padding-right: 30px;
    }

    .left,
    .right {
      width: 25%;
      height: 100%;

      .card-1 {
        height: 300px;
        top: 11%;
      }

      .card-2 {
        height: 300px;
        top: 11%;
      }

      .card-3 {
        height: 300px;
        top: 11%;
      }
    }
  }

  .base-group {
    display: flex;
    gap: 30%;
    justify-content: center;
    bottom: 4%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .base {
      text-align: center;
      background-image: url("./assets/底座_静态图片.png"),
        url("./assets/上升粒子1.webp"), url("./assets/上升粒子1.png"),
        url("./assets/上升粒子2.webp"), url("./assets/上升粒子2.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 100px;
      width: 100px;
      font-weight: 600;

      .name {
        color: rgb(79, 173, 225);
        transform: skew(-12deg);
      }

      .number {
        font-size: 1.5rem;
        color: rgb(126, 181, 246);
      }

      &:after {
        content: "";
        height: 100px;
        width: 100px;
        display: block;
        background-repeat: no-repeat;
        background-size: 100%;
        background-image: url("./assets/底座_圆形_静态图片.png");
        transform-origin: center;
        transform: rotateX(-65deg);
        scale: 1.5;
        @keyframes rotateAnimation {
          0% {
            transform: translateY(-30px) rotateX(-65deg) rotate(0deg);
          }
          100% {
            transform: translateY(-30px) rotateX(-65deg) rotate(360deg);
          }
        }
        animation: rotateAnimation 3s infinite linear;
      }
    }
  }
}
</style>
