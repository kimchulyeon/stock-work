# STOCK (feat. websocket)



## 📈 Tradingview Lightweight Chart (feat. VUE JS)

라이브러리 링크 [Lightweight-chart 라이브러리](https://tradingview.github.io/lightweight-charts/docs)

### 📄 차트 생성 요약 설명


#### (1) ::: import :::
createChart 외의 것은 문서 참고 
```
import {createChart} from 'lightweight-charts'

```
#### (2) ::: template :::
차트가 들어갈 DOM
```
<template>
	<div ref="chart"></div>
</template>
```
#### (3) ::: vue data(){} :::
```
data() {
	return {
		chart: null
	}
}

<!-- 차트 설정 -->

this.chart.createChart(this.$ref.chart. {
	....차트 세부 설정 (문서 참고)
})

<!-- candlestick차트(=주식차트) 생성 -->
<!-- 차트 종류는 라이브러리 문서 참고 -->
<!-- ⭐️ Vue일 경우 컴포넌트가 mounted되었을 때 생성: mounted(){}에 넣는다 -->

const candleSeries = this.chart.addCandlestickSeries()
```

#### (4) ::: vue mounted(){} :::
```
<!-- 차트 설정 -->
this.makeChart();

<!-- candlestickSeries 주식 차트 생성 -->
const candleSeries = this.chart.addCandlestickSeries();

<!-- 주식차트 데이터 설정 함수 -->
this.setChartData(candleSeries);

<!-- 주식 캔들 균등하게 보이게 하기 -->
this.chart.timeScale().fitContent();

<!-- ⭐️ 차트 반응형 너비 ⭐️ -->
window.addEventListener("resize", () => {
	this.chart.applyOptions({
	width: window.innerWidth - 10,
	});
});
```




## 📡 Websocket

#### (1) ::: vue data(){} :::

```
data(){
	return {
		socket: null
	}
}

```
#### (2) ::: 웹소켓 :::
methods() {} 안에 함수를 만들어서 사용

```
<!-- 특정 웹소켓 생성 -->
this.socket = new WebSocket('소켓URL')

<!-- 웹소켓이 연결되었을 때 -->
this.socket.onopen = () => {}

<!-- 웹소켓에서 데이터 수신 때 -->
this.socket.onmessage = () => {}

<!-- 웹소켓이 연결 해제되었을 때 -->
this.socket.onclose = () => {}


<!-- 웹소켓이 에러났을 때 -->
this.socket.onerror = () => {}
```

## 👾 ERRORS

[1]. __ESLint__ no babel config file detected 에러
- vscode에 settings.json에 들어가서 아래 코드 추가
```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
},

"eslint.alwaysShowStatus": true,
"eslint.workingDirectories": [{ "mode": "auto" }],
"eslint.validate": ["javascript", "typescript"]

```