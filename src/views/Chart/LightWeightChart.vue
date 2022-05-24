<template>
  <div>
    <div class="chart"></div>
    <div class="test">{{ finalData }}</div>
  </div>
</template>

<script>
import { createChart } from "lightweight-charts";
import axios from "axios";
import unixTime from "@/utils/unixtimeConvertor";

export default {
  data() {
    return {
      today: new Date(+new Date() + 3240 * 10000)
        .toISOString()
        .replace("T", " ")
        .replace(/\..*/, ""),
      data: null,
      websocket: null,
      requestCoinList: ["KRW-BTC"],
      requestList: [],
      finalData: {},
      candlestickSeries: null,
      axiosData: [],
    };
  },
  methods: {
    pollPear() {
      axios
        .get(
          `https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=10&to=${this.today}`
        )
        .then((res) => {
          // console.log(`엑시오스 데이터 ::::::::${JSON.stringify(res.data)}`);
          // res.data.forEach((item) => {
          //   const result = {
          //     time: unixTime(item.timestamp),
          //     open: Number(item.opening_price).toFixed(2),
          //     high: Number(item.high_price).toFixed(2),
          //     low: Number(item.low_price).toFixed(2),
          //     close: Number(item.trade_price).toFixed(2),
          //   };
          //   this.axiosData.push(result);
          // });
          // console.log(this.axiosData);
          // this.axiosData.shift();
          // this.axiosData.shift();
          // console.log(this.axiosData);
          // this.axiosData = result;
        });
    },
  },
  // 컴포넌트가 만들어지자마자 실행
  created() {
    const URI = "wss://api.upbit.com/websocket/v1";
    this.websocket = new WebSocket(URI);
    this.websocket.binaryType = "arraybuffer";

    // opOpen
    this.websocket.onopen = () => {
      console.log("웹소켓이 열렸다::::::::::");
      this.requestList = [
        {
          ticket: "TEST",
        },
        {
          type: "ticker",
          codes: this.requestCoinList,
          isOnlyRealtime: true,
        },
      ];

      const requestMessage = JSON.stringify(this.requestList);
      this.websocket.send(requestMessage);
    };

    // onMessage
    this.websocket.onmessage = (event) => {
      console.log("코인 가격 바뀌는 중::::::::::");

      var enc = new TextDecoder("utf-8");
      var arr = new Uint8Array(event.data);

      const result = enc.decode(arr);
      // JSON 형태로 변환
      const parsedResult = JSON.parse(result);
      console.log(`결과다:::::::::${parsedResult}`);

      this.finalData = {
        time: unixTime(parsedResult.timestamp),
        open: Number(parsedResult.opening_price).toFixed(2),
        high: Number(parsedResult.high_price).toFixed(2),
        low: Number(parsedResult.low_price).toFixed(2),
        close: Number(parsedResult.trade_price).toFixed(2),
      };
      // console.log(`결과다:::::::::${this.finalData}`);

      // TODO: 여기가 문제 데이터를 정제해야함
      this.candlestickSeries.update(this.finalData);
    };
  },

  // 컴포넌트가 마운트 되었을 때 실행
  mounted() {
    this.pollPear();
    // .chart 요소에 차트 생성
    const chart = createChart(document.querySelector(".chart"), {
      width: 900,
      height: 300,
    });
    // cdndlestickSeries라는 주식 차트 생성
    this.candlestickSeries = chart.addCandlestickSeries();

    this.candlestickSeries.setData([
      {
        time: "2022-05-16",
        open: 37209000.0,
        high: 37209000.0,
        low: 37203000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-17",
        open: 37209000.0,
        high: 37209000.0,
        low: 37219000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-18",
        open: 38933000.0,
        high: 37209000.0,
        low: 37109000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-19",
        open: 38933000.0,
        high: 37209000.0,
        low: 33209000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-20",
        open: 38933000.0,
        high: 37209000.0,
        low: 35209000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-21",
        open: 38933000.0,
        high: 37209000.0,
        low: 37209000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-22",
        open: 38933000.0,
        high: 37209000.0,
        low: 37209000.0,
        close: 37209000.0,
      },
      {
        time: "2022-05-23",
        open: 38933000.0,
        high: 37209000.0,
        low: 37209000.0,
        close: 37209000.0,
      },
    ]);

    // 주식 캔들 균등하게 보이게 하기
    chart.timeScale().fitContent();
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 90%;
}
</style>
