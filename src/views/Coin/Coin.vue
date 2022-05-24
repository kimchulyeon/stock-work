<template>
  <div class="container">
    <h1>Coin Home</h1>
    <ul class="coin-info-wrapper">
      <li v-for="(value, key, index) in responseData" :key="index">
        <div class="coin-name-container">
          <span class="coin">{{ key }}</span>
          <span
            class="indices"
            :class="{
              veryFear: value.pear === '매우 공포',
              fear: value.pear === '공포',
              neutrality: value.pear === '중립',
              avarice: value.pear === '탐욕',
              veryAvarice: value.pear === '매우 탐욕',
            }"
            >{{ value.pear }}</span
          >
        </div>
        <div class="price-container">
          <span
            class="price"
            :class="{
              rise: value.change === 'RISE',
              fall: value.change === 'FALL',
            }"
            >{{ value.trade_price | comma }}</span
          >
          <span class="start"
            >금일 시작가 : {{ value.opening_price | comma }}</span
          >
          <span class="average"
            >52주 : {{ value.highest_52_week_price | comma }} /
            {{ value.lowest_52_week_price | comma }}</span
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Coin",
  data() {
    return {
      websocket: null,
      socket: null,
      requestCoinList: ["KRW-BTC", "KRW-ETH", "KRW-ETC", "KRW-XRP", "KRW-BTT"],
      responseData: [],
      message: null,
      requestList: [],
      pear: [],
    };
  },
  methods: {
    onOpen() {
      this.requestList = [
        {
          ticket: "TEST",
        },
        {
          type: "ticker",
          codes: this.requestCoinList,
        },
      ];
      const requestMessage = JSON.stringify(this.requestList);
      this.doSend(requestMessage);
      this.heartbeat();
    },
    onClose: function (evt) {
      alert("연결이 종료되었습니다.");
      console.error(evt);
    },
    onMessage(evt) {
      var enc = new TextDecoder("utf-8");
      var arr = new Uint8Array(evt.data);
      let forObject = new Object();

      let textArray = new Array(enc.decode(arr));
      textArray = textArray.toString().replace(/\{|\}|"/gi, "");
      textArray = textArray.split(",");

      textArray.forEach((element) => {
        let forSplit = element.split(":");
        forObject[forSplit[0]] = forSplit[1];

        if (forSplit[0] === "code" && this.pear[forSplit[1]]) {
          forObject["pear"] = this.pear[forSplit[1]].stage;
        }
      });
      this.responseData[forObject.code] = forObject;

      //this.websocket.close();
    },
    onError(evt) {
      console.error(evt);
    },
    doSend(message) {
      console.log("발신: " + message);
      this.websocket.send(message);
    },
    heartbeat() {
      if (!this.websocket) return;
      if (this.websocket.readyState !== 1) return;
      console.log("heartbeat");
      this.websocket.send("heartbeat");
      let intervalTime = 1000 * 100;
      setTimeout(this.heartbeat, intervalTime);
    },
    pollPear() {
      axios.get("https://datavalue.dunamu.com/api/fearindex").then((res) => {
        let pairs = res.data.pairs;
        pairs.forEach((element) => {
          element.code = element.code.split(".")[1];

          this.requestCoinList.filter((x) => {
            if (x === element.code) {
              this.pear[element.code] = element;
            }
          });
        });
      });
    },
  },
  created() {
    const that = this;
    const wsUri = "wss://api.upbit.com/websocket/v1";
    that.websocket = new WebSocket(wsUri);
    that.websocket.binaryType = "arraybuffer";

    that.websocket.onopen = function (evt) {
      that.onOpen(evt);
    };
    that.websocket.onclose = function (evt) {
      that.onClose(evt);
    };
    that.websocket.onmessage = function (evt) {
      that.onMessage(evt);
    };
    that.websocket.onerror = function (evt) {
      that.onError(evt);
    };

    let createObject = new Object();
    that.requestCoinList.forEach((element) => {
      createObject[element] = {};
    });
    that.responseData = createObject;
  },
  mounted() {
    let time = 1000 * 60 * 10;
    this.pollPear();
    setInterval(function () {
      this.pollPear();
    }, time);
  },
  filters: {
    comma(value) {
      value = parseFloat(value);
      if (!value) return "0";
      return value.toLocaleString("ko-KR");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.indices.veryFear {
  color: blue;
}
.indices.fear {
  color: skyblue;
}
.indices.neutrality {
  color: green;
}
.indices.avarice {
  color: orange;
}
.indices.veryAvarice {
  color: red;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  h1 {
    font-size: 60px;
    color: rgb(124, 124, 124);
    margin-top: 20px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    list-style: none;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;

    .coin-name-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-right: 70px;

      .coin {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
      }

      .indices {
        display: block;
        font-size: 16px;
        font-weight: bold;
      }
    }
    .price-container {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      flex-direction: column;

      .price {
        font-size: 22px;
        font-weight: bold;
        color: green;
        margin-bottom: 5px;

        &.rise {
          color: red;
        }
        &.fall {
          color: blue;
        }
      }
      .start {
        font-size: 14px;
        margin: 6px 0;
      }
      .average {
        font-size: 15px;
      }
    }
  }
}

@media (min-width: 640px) {
  .container {
    box-shadow: none;
    max-width: 70%;
    margin: 0 auto;
    display: block;

    h1 {
      font-size: 30px;
      margin-left: 20px;
      margin-bottom: 20px;
    }

    .coin-info-wrapper {
      display: flex;
      /* justify-content: center; */
      flex-wrap: wrap;
      align-content: flex-start;
      width: 100%;
      gap: 10px;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        flex-basis: 300px;
        flex-grow: 1;
        width: 300px;
        min-height: 300px;
        margin: 0;
        padding: 5px;
      }

      .coin-name-container {
        margin: 0;
        .coin {
          font-size: 16px;
        }
      }
      .price-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
}
</style>
