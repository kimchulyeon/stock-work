<template>
  <div>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";

export default {
  props: ["baseName", "timeframe"],

  data() {
    return {
      chart: null,
      cdata_price: [],
      binanceSocket: null,
      lastBaseKline: {
        o: 0,
        c: 0,
        h: 0,
        l: 0,
        t: 0,
      },
    };
  },
  methods: {
    makeChart() {
      this.chart = createChart(this.$refs.chart, {
        height: 500,
        // 마우스 포인터 자석 / 자유 모드
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        // 차트 가로 세로 그리드 (안보이게 설정)
        grid: {
          vertLines: {
            color: "rgba(70, 130, 180, 0.5)",
            style: 1,
            visible: false,
          },
          horzLines: {
            color: "rgba(70, 130, 180, 0.5)",
            style: 1,
            visible: false,
          },
        },
        priceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
          timeVisible: true,
          secondsVisible: false,
        },
      });
    },

    setChartData(candleSeries) {
      axios
        // 주식 봉 데이터 가져오기
        // symbol: 코인 심볼, interval: 봉 데이터 시간 (분봉, 1시간봉...)
        .get(
          `https://api.binance.com/api/v3/klines?symbol=${this.baseName.toUpperCase()}&interval=${
            this.timeframe
          }`
        )
        .then((res) => {
          // console.log(res);
          res.data.forEach((item) => {
            // cdata_price라는 빈배열에 원하는 데이터 정제해서 푸시
            this.cdata_price.push({
              time: item[0] / 1000 + 32400, // 한국시간 GMT + 9
              open: item[1] * 1261.1, // USDT => KRW
              high: item[2] * 1261.1, // USDT => KRW
              low: item[3] * 1261.1, // USDT => KRW
              close: item[4] * 1261.1, // USDT => KRW
            });
          });
          // 실시간이 아닌 데이터를 설정
          candleSeries.setData(this.cdata_price);
        });

      // 웹소켓 생성
      this.binanceSocket = new WebSocket(
        `wss://fstream.binance.com/stream?streams=${this.baseName.toLowerCase()}@kline_${
          this.timeframe
        }`
      );

      this.binanceSocket.onopen = () => {
        console.log("웹소켓 연결...");
      };
      this.binanceSocket.onmessage = (event) => {
        try {
          let kline = JSON.parse(event.data);
          // console.log(`클리네가 무엇??::::${event.data}`);
          if (kline.data.s === this.baseName.toUpperCase()) {
            this.lastBaseKline = kline.data.k;
          }
          // if (kline.data.s === this.quoteName.toUpperCase()) {
          //   this.lastQuoteKline = kline.data.k;
          // }

          if (this.lastBaseKline.c !== 0) {
            candleSeries.update({
              time: this.lastBaseKline.t / 1000 + 32400,
              open: this.lastBaseKline.o * 1261.1,
              close: this.lastBaseKline.c * 1261.1,
              high: this.lastBaseKline.h * 1261.1,
              low: this.lastBaseKline.l * 1261.1,
            });
          }
        } catch (e) {
          console.log(e);
        }
      };
      this.binanceSocket.onclose = () => {
        console.log("웹소켓 연결 해제...");
      };

      this.binanceSocket.onerror = function (evt) {
        console.log("웹소켓 에러남.....");
        console.log(evt);
      };
    },

    resize(width) {
      this.chart.resize(width);
    },
  },

  // 컴포넌트가 마운트 되었을 때 실행
  mounted() {
    console.log(`차트 만듬: ${this.baseName}코인 `);
    // 차트 생성 함수
    this.makeChart();
    // candlestickSeries 주식 차트 생성
    const candleSeries = this.chart.addCandlestickSeries();
    // 주식차트 데이터 설정 함수
    this.setChartData(candleSeries);

    // 주식 캔들 균등하게 보이게 하기
    this.chart.timeScale().fitContent();

    window.addEventListener("resize", () => {
      this.chart.applyOptions({
        width: window.innerWidth - 10,
      });
    });
  },

  // unmount시 웹소켓 연결 해제
  unmounted() {
    this.binanceSocket.close();
  },
};
</script>
<style>
.chart,
.tv-lightweight-charts {
  width: 100% !important;
}
/* .tv-lightweight-charts > table {
  width: 100% !important;
}

.tv-lightweight-charts > table > td {
  width: auto !important;
} */
</style>
