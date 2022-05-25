<template>
  <div class="wrapper">
    <div ref="chart" :id="id"></div>
  </div>
</template>

<script>
import { createChart, CrosshairMode } from "lightweight-charts";
import { v4 as uuidv4 } from "uuid";

export default {
  props: ["width", "baseName", "quoteName", "timeframe"],

  // DATA
  data() {
    return {
      id: uuidv4(),
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
      lastQuoteKline: {
        o: 0,
        c: 0,
        h: 0,
        l: 0,
        t: 0,
      },
    };
  },

  // METHODS
  methods: {
    // mounted 때 실행 : 차트 만들기
    makeChart() {
      const width = this.$refs.chart.clientWidth;
      const height = 400;
      const container = document.getElementById(this.id);
      container.innerHTML = "";
      this.chart = createChart(container, {
        width: width,
        height: height,
        crosshair: {
          mode: CrosshairMode.Normal,
        },
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

    // 데이터 만들기
    makePairData(candleSeries) {
      const success = (res) => (res.ok ? res.json() : Promise.resolve({}));

      const base = fetch(
        `https://api.binance.com/api/v3/klines?symbol=${this.baseName.toUpperCase()}&interval=${
          this.timeframe
        }`
      ).then(success);

      const quote = fetch(
        `https://api.binance.com/api/v3/klines?symbol=${this.quoteName.toUpperCase()}&interval=${
          this.timeframe
        }`
      ).then(success);

      Promise.all([base, quote]).then(([baseData, quoteData]) => {
        baseData.forEach((entry, index) => {
          this.cdata_price.push({
            time: entry[0] / 1000 + 32400,
            open: entry[1] * 1261.1,
            high: entry[2] * 1261.1,
            low: entry[3] * 1261.1,
            close: entry[4] * 1261.1,
          });
        });
        candleSeries.setData(this.cdata_price);
        // console.log(`cdata는 뭐냐:::::::${JSON.stringify(this.cdata_price)}`);
      });

      this.binanceSocket = new WebSocket(
        `wss://fstream.binance.com/stream?streams=${this.baseName.toLowerCase()}@kline_${
          this.timeframe
        }/${this.quoteName.toLowerCase()}@kline_${this.timeframe}`
      );

      this.binanceSocket.onopen = () => {
        console.log("Binance connected...");
      };
      this.binanceSocket.onmessage = (event) => {
        try {
          let kline = JSON.parse(event.data);
          console.log(`클리네가 무엇??::::${event.data}`);
          if (kline.data.s === this.baseName.toUpperCase()) {
            this.lastBaseKline = kline.data.k;
          }
          if (kline.data.s === this.quoteName.toUpperCase()) {
            this.lastQuoteKline = kline.data.k;
          }

          if (this.lastBaseKline.c !== 0 && this.lastQuoteKline.c !== 0) {
            candleSeries.update({
              time: this.lastBaseKline.t / 1000 + 32400,
              open: this.lastBaseKline.o * 1261.1,
              close: this.lastBaseKline.c * 1261.1,
              high: this.lastBaseKline.h * 1261.1,
              low: this.lastBaseKline.l * 1261.1,
            });
            this.$emit(
              "update-price",
              this.lastBaseKline.c / this.lastQuoteKline.c
            );
          }
        } catch (e) {
          console.log(e);
        }
      };
      this.binanceSocket.onclose = () => {
        console.log("Binance disconnected...");
      };

      this.binanceSocket.onerror = function (evt) {
        console.log("Binance error...");
        console.log(evt);
      };
    },
  },

  mounted() {
    console.log(`차트 만듬: ${this.baseName} quote: ${this.quoteName}`);
    this.makeChart();
    const candleSeries = this.chart.addCandlestickSeries();
    this.makePairData(candleSeries);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
}
</style>
