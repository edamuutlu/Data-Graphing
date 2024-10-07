import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { erpData } from "../../utils/erpData";
import * as echarts from "echarts";

const CategoryDistributionCharts = () => {
  const { data } = erpData;
  const chartRef = useRef(null);

  // ECharts için gerekli veriyi hazırlama
  const categoryData = data.map(item => ({
    name: item.category,
    value: item.monthlyStock.reduce((total, stock) => total + stock, 0)
  }));

  useEffect(() => {
    // ECharts'ı başlatma
    const chartInstance = echarts.init(chartRef.current);

    // ECharts ayarları
    const options = {
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(31, 41, 55, 0.8)",
        borderColor: "#4B5563",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        textStyle: {
          color: "#E5E7EB",
        },
      },
      series: [
        {
          name: "Category",
          type: "pie",
          radius: "70%",
          center: ["50%", "60%"],
          data: categoryData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // Grafik oluşturma
    chartInstance.setOption(options);

    // Bileşen unmount olduğunda grafik temizleme
    return () => {
      chartInstance.dispose();
    };
  }, [categoryData]);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Aylık Toplam Satış Özeti
      </h2>
      <div ref={chartRef} style={{ height: "400px", width: "100%" }} />
    </motion.div>
  );
};

export default CategoryDistributionCharts;
