# STOCK (feat. websocket)



## ๐ Tradingview Lightweight Chart (feat. VUE JS)

๋ผ์ด๋ธ๋ฌ๋ฆฌ ๋งํฌ [Lightweight-chart ๋ผ์ด๋ธ๋ฌ๋ฆฌ](https://tradingview.github.io/lightweight-charts/docs)

### ๐ ์ฐจํธ ์์ฑ ์์ฝ ์ค๋ช


#### (1) ::: import :::
createChart ์ธ์ ๊ฒ์ ๋ฌธ์ ์ฐธ๊ณ  
```
import {createChart} from 'lightweight-charts'

```
#### (2) ::: template :::
์ฐจํธ๊ฐ ๋ค์ด๊ฐ DOM
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

<!-- ์ฐจํธ ์ค์  -->

this.chart.createChart(this.$ref.chart. {
	....์ฐจํธ ์ธ๋ถ ์ค์  (๋ฌธ์ ์ฐธ๊ณ )
})

<!-- candlestick์ฐจํธ(=์ฃผ์์ฐจํธ) ์์ฑ -->
<!-- ์ฐจํธ ์ข๋ฅ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ ๋ฌธ์ ์ฐธ๊ณ  -->
<!-- โญ๏ธ Vue์ผ ๊ฒฝ์ฐ ์ปดํฌ๋ํธ๊ฐ mounted๋์์ ๋ ์์ฑ: mounted(){}์ ๋ฃ๋๋ค -->

const candleSeries = this.chart.addCandlestickSeries()
```

#### (4) ::: vue mounted(){} :::
```
<!-- ์ฐจํธ ์ค์  -->
this.makeChart();

<!-- candlestickSeries ์ฃผ์ ์ฐจํธ ์์ฑ -->
const candleSeries = this.chart.addCandlestickSeries();

<!-- ์ฃผ์์ฐจํธ ๋ฐ์ดํฐ ์ค์  ํจ์ -->
this.setChartData(candleSeries);

<!-- ์ฃผ์ ์บ๋ค ๊ท ๋ฑํ๊ฒ ๋ณด์ด๊ฒ ํ๊ธฐ -->
this.chart.timeScale().fitContent();

<!-- โญ๏ธ ์ฐจํธ ๋ฐ์ํ ๋๋น โญ๏ธ -->
window.addEventListener("resize", () => {
	this.chart.applyOptions({
	width: window.innerWidth - 10,
	});
});
```




## ๐ก Websocket

#### (1) ::: vue data(){} :::

```
data(){
	return {
		socket: null
	}
}

```
#### (2) ::: ์น์์ผ :::
methods() {} ์์ ํจ์๋ฅผ ๋ง๋ค์ด์ ์ฌ์ฉ

```
<!-- ํน์  ์น์์ผ ์์ฑ -->
this.socket = new WebSocket('์์ผURL')

<!-- ์น์์ผ์ด ์ฐ๊ฒฐ๋์์ ๋ -->
this.socket.onopen = () => {}

<!-- ์น์์ผ์์ ๋ฐ์ดํฐ ์์  ๋ -->
this.socket.onmessage = () => {}

<!-- ์น์์ผ์ด ์ฐ๊ฒฐ ํด์ ๋์์ ๋ -->
this.socket.onclose = () => {}


<!-- ์น์์ผ์ด ์๋ฌ๋ฌ์ ๋ -->
this.socket.onerror = () => {}
```

## ๐พ ERRORS

[1]. __ESLint__ no babel config file detected ์๋ฌ
- vscode์ settings.json์ ๋ค์ด๊ฐ์ ์๋ ์ฝ๋ ์ถ๊ฐ
```
"editor.formatOnSave": false,
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
},

"eslint.alwaysShowStatus": true,
"eslint.workingDirectories": [{ "mode": "auto" }],
"eslint.validate": ["javascript", "typescript"]

```