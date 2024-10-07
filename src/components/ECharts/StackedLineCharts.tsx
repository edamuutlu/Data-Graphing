import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { erpData } from "../../utils/erpData";

const aylar = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
];
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

interface Param {
  axisValue: string;
  seriesName: string;
  value: number; // Satış miktarı
}

export const StackedLineCharts = () => {
  const { data } = erpData;

  const series = data.map((urun, index) => ({
    name: urun.product,
    type: "line",
    stack: "Total",
    areaStyle: {},
    emphasis: {
      focus: "series",
    },
    data: urun.monthlySales,
    itemStyle: {
      color: colors[index % colors.length],
    },
  }));

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      borderColor: "#333",
      textStyle: {
        color: "#fff",
      },
      formatter: function (params: Param[]) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param) => {
          result += `${param.seriesName}: ${param.value} sales<br/>`;
        });
        return result;
      },
    },
    legend: {
      data: data.map((urun) => urun.product),
      textStyle: {
        color: "#9CA3AF",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: aylar,
      axisLabel: {
        color: "#9CA3AF",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#9CA3AF",
      },
    },
    series: series,
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Aylık Satış Özeti
      </h2>
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
        theme="light"
      />
    </motion.div>
  );
};

export default StackedLineCharts;
