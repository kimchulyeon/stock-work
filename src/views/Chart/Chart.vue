<template>
  <div class="container">
    <!-- HEADER -->
    <header>
      <ul class="chart-menu">
        <li class="chart-menu-item">기본정보</li>
        <li class="chart-menu-item">뉴스</li>
        <li class="chart-menu-item">기업개요</li>
        <li class="chart-menu-item">차트</li>
        <li class="chart-menu-item">추천가</li>
      </ul>
    </header>
    <!-- BODY -->
    <div class="chart-container">
      <LightWeightChart />
      <!-- CHART 자리 -->
      <!-- CHART INFO TABLE -->
      <table>
        <thead>
          <th>분할매수가</th>
          <th>1차 분할</th>
          <th>2차 분할</th>
          <th>3차 분할</th>
        </thead>
        <tbody>
          <tr>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
          </tr>
        </tbody>
        <thead>
          <th>목표가</th>
          <th>1차 티켓</th>
          <th>2차 티켓</th>
          <th>3차 티켓</th>
        </thead>
        <tbody>
          <tr>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
          </tr>
        </tbody>
        <thead>
          <th>손절가</th>
          <th>1차 손절</th>
          <th>2차 손절</th>
          <th>3차 손절</th>
        </thead>
        <tbody>
          <tr>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
            <td>1,380</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LightWeightChart from "./LightWeightChart.vue";
export default {
  components: { LightWeightChart },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 100%;
  /* height: 100%; */
}

header {
  top: 0;
  left: 0;
  width: 100vw;
  margin-bottom: 80px;

  .chart-menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid black;

    .chart-menu-item {
      list-style: none;
      padding: 8px;
      font-weight: bold;
      cursor: pointer;

      &:last-child {
        color: rgb(146, 50, 50);
      }
    }
  }
}

.chart-container {
  width: 100%;
  height: 100%;
}

table {
  width: 95%;
  margin: 0 auto;
  border: 1px solid rgba(128, 128, 128, 0.505);
  border-collapse: collapse;
  text-align: center;
  margin-top: 10px;

  thead {
    background-color: rgba(128, 128, 128, 0.783);

    th {
      padding: 10px;
    }
  }
  tbody {
    background-color: rgba(128, 128, 128, 0.256);
    padding: 10px;

    td {
      padding: 10px;
    }
  }
}
</style>
