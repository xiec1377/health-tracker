import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getChart } from "../api/chart"; 
import { formatDateToMonthDay, generateDateRange} from "../utils/dateUtils"; 


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import type { Log } from "../types/log";

type HealthDataset = ChartDataset<"line", number[]> & { label: string };


function Chart() {
//   const [chartData, setChartData] = useState<[]>([]);
const [chartData, setChartData] = useState<ChartData<"line", number[], string> | null>(null);

  const [totalText, setTotalText] = useState("");
  const [averageText, setAverageText] = useState("");
  const moodEmojis = ["", "😞", "😐", "😊", "😄", "🤩"];
  const today = new Date().toISOString().split("T")[0];

  const getTotal = (data: number[]) => data.reduce((a, b) => a + b, 0);
  const getAverage = (data: number[]) => data.length ? getTotal(data) / data.length : 0;
  useEffect(() => {
    getChart(today).then((response) => {
      console.log("weekly response in chart:", response);
      // response.sort(
      //   (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      // );
      // console.log("sorted response:", response);
      const labels = generateDateRange(response[0].date, response[response.length - 1].date)
      // const labels = response.map((log) => formatDateToMonthDay(log.date));
      console.log("labels:", labels);
      const logMap = new Map(response.map(log => [formatDateToMonthDay(log.date), log]));
      console.log("logmap:", logMap)

      const stepsData = labels.map(date => logMap.get(date)?.steps || 0);
      const caloriesData = labels.map(date => logMap.get(date)?.calories || 0);
      const sleepData = labels.map(date => logMap.get(date)?.sleep || 0);
      const moodData = labels.map(date => logMap.get(date)?.mood || 0);

      setChartData({
        labels,
        datasets: [
          {
            label: "Steps",
            data: stepsData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.3,
            yAxisID: "ySteps",
            hidden: false,
          },
          {
            label: "Calories",
            data: caloriesData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            fill: true,
            tension: 0.3,
            yAxisID: "yCalories",
            hidden: true,
          },
          {
            label: "Sleep (hours)",
            data: sleepData,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
            tension: 0.3,
            yAxisID: "ySleep",
            hidden: true,
          },
          {
            label: "Mood",
            data: moodData,
            borderColor: "rgba(75, 192, 192, 1)",
            //isDarkMode ? "#fff" : 
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
            tension: 0.3,
            yAxisID: "yMood",
            hidden: true,
          },
        ],
      });
      setTotalText(`Total steps this week: ${getTotal(stepsData)}`);
      setAverageText(
        `Average steps this week: ${Math.round(getAverage(stepsData))}`
      );
    }).catch((error) => {
      console.error("Error fetching chart data:", error);
    })
  }, [today]);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div>
      <p>{totalText}</p>
      <p>{averageText}</p>
    <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: true,
              onClick: function (_e, legendItem, legend) {
                const index = legendItem.datasetIndex || 0
                console.log("index:", index)
                const ci = legend.chart
                ci.data.datasets.forEach((ds, i) => {
                    console.log("i:", i)
                  ds.hidden = true
                })
                ci.data.datasets[index].hidden = false
                const axes = ci.options.scales
                for (const axisID in axes) {
                  if (axisID === 'x') {
                    continue
                  }
                  if (axes[axisID]) {
                    axes[axisID].display =
                        ci.data.datasets[index].yAxisID === axisID
                  }
                }
                ci.update()
                console.log('ci.data.datasets[index]:', ci.data.datasets[index])
              },
            },
          },
          scales: {
            ySteps: { type: "linear", display: true, beginAtZero: true, grid: { drawOnChartArea: false } },
            yCalories: { type: "linear", display: false, grid: { drawOnChartArea: false } },
            ySleep: { type: "linear", display: false, beginAtZero: true, grid: { drawOnChartArea: false } },
            yMood: {
              type: "linear",
              display: false,
              min: 1,
              max: 5,
              ticks: { stepSize: 1, callback: (value) => moodEmojis[Number(value)] || value },
              grid: { drawOnChartArea: false },
            },
            x: { title: { display: true } },
          },
        }}
      />
    </div>
  );
}

export default Chart;
