import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface StockPriceData {
  date: string;
  price: number;
}

function useChartInstance(data: StockPriceData[]) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart<"line"> | null>(null);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        const chartLabels = data.slice(0, -1).map(({ date }) => date);
        const chartPrices = data.slice(0, -1).map(({ price }) => price);

        chartInstanceRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: chartLabels,
            datasets: [
              {
                label: "Stock Price",
                data: chartPrices,
                borderColor: "#5bc0be",
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#c7c7d9",
                },
              },
              y: {
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                  color: "#c7c7d9",
                },
              },
            },
            elements: {
              point: {
                borderWidth: 1,
                radius: 0,
                hitRadius: 5,
                hoverRadius: 5,
              },
            },
          },
        });
      }
    }
  }, [data]);

  return { chartRef, chartInstanceRef };
}

export default useChartInstance;
