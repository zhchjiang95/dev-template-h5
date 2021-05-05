<template>
  <div class="monitor">
    <van-tabs v-model:active="state.active" color="#50a9ff">
      <van-tab title="机器人指标">
        <div class="robot-indicator">
          <ul class="indicator-box" v-if="state.chartData.length">
            <li v-for="(v, i) in state.structure" :key="v.key">
              <div class="title-data">
                <p>
                  <span>{{ v.name }}</span
                  ><van-icon name="info-o" @click="popupShowHandler(v)" />
                </p>
                <span>
                  <strong>{{
                    (v.key === 'noAnswerRate' || v.key === 'noSolutionRate') ? (state.chartData[state.chartData.length - 1][v.key] * 100).toFixed(2) + '%' : state.chartData[state.chartData.length - 1][v.key]
                  }}</strong>
                </span>
              </div>
              <div class="chart">
                <canvas :id="'container' + i"></canvas>
              </div>
            </li>
          </ul>
          <p v-else>
            <van-loading color="#1989fa" v-if="state.loading" />
            <span v-else>无</span>
          </p>
        </div>
      </van-tab>
      <van-tab title="对话流热门榜">
        <div class="dialogue">
          <span>对话流名称</span>
          <span>触发次数</span>
        </div>
        <div class="dialogue-val">
          <ul>
            <li v-for="v in state.dialogueData" :key="v.DialogName">
              <span>{{ v.DialogName }}</span>
              <span>{{ v.CaseCrtCnt }}</span>
            </li>
          </ul>
          <p
            style="text-align: center; margin: 0"
            v-if="state.dialogueData.length === 0"
          >
            无
          </p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <van-popup
    v-model:show="state.popupShow"
    closeable
    position="bottom"
  >
    <p class="popup-p">{{state.popupContent}}</p>
  </van-popup>
</template>

<script>
import { ref, watchEffect, nextTick } from "vue";
import F2 from "@antv/f2";
import { getQuotaInfo, getSevenQuotaInfos } from "../request/api";
import { Tips } from "../utils/common";
const moment = require('moment')

export default {
  name: "Home",
  setup() {
    const state = ref({
      active: 0,
      popupShow: false,
      popupContent: '',
      loading: true,
      dialogueData: [],
      structure: [
        {
          name: "接待人次",
          key: "sidCnt",
          content: '按session量计算'
        },
        {
          name: "解决接待量",
          key: "solutionSidCnt",
          content: '排除转人工（如有）、无答案、推荐未点击、点踩（如有）的服务session量（接待人次)'
        },
        {
          name: "对话请求量",
          key: "chatCnt",
          content: '用户发出一次对话，记为一个对话轮次'
        },
        {
          name: "已解决率",
          key: "noSolutionRate",
          content: '有转人工（如有）、无答案、推荐未点击、点踩（如有）的服务session量/非直连转人工接待量（即总session量-第一轮就转到人工的session量)'
        },
        {
          name: "平均对话轮次",
          key: "avgChatCnt",
          content: '对话轮次/接待人次'
        },
        {
          name: "有答案率",
          key: "noAnswerRate",
          content: '出现无答案的对话轮次的session量/接待人次(总体session量)'
        },
        {
          name: "点评量",
          key: "feedbackChatCnt",
          content: ''
        },
        {
          name: "点赞量",
          key: "feedbackGoodChatCnt",
          content: ''
        },
        {
          name: "点踩量",
          key: "feedbackBadChatCnt",
          content: ''
        },
      ],
      chartData: [],
      canvasW: 4.48 * parseFloat(document.documentElement.style.fontSize),
      canvasH: 3.7333 * parseFloat(document.documentElement.style.fontSize),
    });

    getSevenQuotaInfos({
      robotQuotaReq: {
        action: "GetBotSessionData",
      },
    }).then((res) => {
      state.value.loading = false;
      if (res.success) {
        state.value.chartData = res.object;
        nextTick(() => {
          state.value.structure.forEach((v, i) => {
            chartStructure("container" + i, v.key);
          });
        });
      } else {
        Tips("error", res.msg);
      }
    });

    getQuotaInfo({
      robotQuotaReq: {
        action: "ListBotHotDsDatas",
        startTime: `${moment().add(-1, 'd').format('YYYYMMDD')}`,
        endTime: `${moment().add(-1, 'd').format('YYYYMMDD')}`,
      },
    }).then((res) => {
      if (res.success) {
        state.value.dialogueData = res.object.Datas;
      } else {
        Tips("error", res.msg);
      }
    });

    const popupShowHandler = (v) => {
      if(!v.content) return
      state.value.popupContent = v.content
      state.value.popupShow = true
    }

    const chartStructure = (id, y) => {
      const chart = new F2.Chart({
        id,
        width: state.value.canvasW,
        height: state.value.canvasH,
        pixelRatio: window.devicePixelRatio,
      });
      chart.source(state.value.chartData, {
        // time: {
        //   type: 'cat'
        // },
        [y]: {
          type: "linear",
          formatter: val => {
            switch(y){
              case 'noAnswerRate':
              case 'noSolutionRate':
                return (val * 100).toFixed(2) + '%'
              default:
                return val
            }
          }
        },
      });

      chart.tooltip({
        showItemMarker: true,
        onShow: function onShow(ev) {
          ev.items.splice(1);
          ev.items[0].name = ev.items[0].origin.dayId.split("-").slice(1).join("-");
        },
      });

      chart
        .area()
        .position("time*" + y)
        // .color("#d7edff")
        .shape("smooth");
      chart
        .line()
        .position("time*" + y)
        .color("#50a9ff")
        .shape("smooth");
      chart.render();
    };

    watchEffect(() => {
      state.value.chartData.forEach((v) => {
        v.time = v.dayId.split('-').pop()
      });
    });

    return {
      state,
      popupShowHandler
    };
  },
};
</script>

<style lang="less" scoped>
.popup-p{
  font-size: 15px;
  padding: 38px 14px 8px;
  text-align: justify;
  color: #646566;
}
.monitor {
  height: 100vh;
  padding: 14px;
  box-sizing: border-box;
  background: #f5f7ff;
  ::v-deep .van-tabs__wrap {
    border-radius: 10px;
    margin-bottom: 18px;
  }
  .dialogue {
    display: flex;
    align-items: center;
    height: 50px;
    padding: 0 20px;
    font-size: 15px;
    background: #e5f3ff;
    span {
      width: 60%;
      flex-shrink: 0;
      color: #168cff;
      &:last-child {
        width: 40%;
        text-align: center;
      }
    }
  }
  .dialogue-val {
    max-height: calc(100vh - 180px);
    padding: 20px;
    font-size: 15px;
    overflow-y: auto;
    background: #fff;
    ul li {
      display: flex;
      align-items: center;
      width: 100%;
      &:not(:last-child) {
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 18px;
        padding-bottom: 18px;
      }
      span {
        width: 60%;
        flex-shrink: 0;
        &:last-child {
          width: 40%;
          text-align: center;
        }
      }
    }
  }
  .robot-indicator {
    max-height: calc(100vh - 90px);
    font-size: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    & > p {
      text-align: center;
      line-height: 40px;
      background: #fff;
    }
    & > ul {
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      li {
        position: relative;
        flex-shrink: 0;
        box-sizing: border-box;
        padding-bottom: 4px;
        &:not(:last-child):not(:nth-last-child(2))::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 83%;
          height: 1px;
          background: #f1f1f1;
        }
        &:nth-of-type(2n-1) {
          width: calc(50% + 6px);
          border-right: 12px solid #f5f7ff;
        }
        &:nth-of-type(2n) {
          width: calc(50% - 6px);
        }
        .title-data {
          padding: 14px 14px 0;
          p {
            display: flex;
            align-items: center;
            margin-top: 0;
            margin-bottom: 8px;
            font-size: 14px;
            color: #8c8c8c;
            span {
              margin-right: 4px;
            }
          }
          & > span {
            font-size: 20px;
          }
        }
        .chart {
          font-size: 0;
          // height: 100px;
          // background: #f1f0f6;
        }
      }
    }
  }
}
</style>
