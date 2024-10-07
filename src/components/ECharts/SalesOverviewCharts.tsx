import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import { erpData } from "../../utils/erpData";

const aylar = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type ProductSales = Record<string, number>;

interface TooltipParam {
  name: string;
}

export const SalesOverviewCharts = () => {
  const { data } = erpData;

  const satisVerileri = aylar.map((month, index) => {
    const monthData = {
      name: month,
      productSales: {} as ProductSales,
      toplamSatis: 0,
    };
    data.forEach((product) => {
      const satis = product.monthlySales[index];
      monthData.productSales[product.product] = satis;
      monthData.toplamSatis += satis;
    });
    return monthData;
  });

  // ECharts option object
  const options = {
    tooltip: {
      trigger: "axis",
      formatter: (params: TooltipParam[]): string => {
        // Tooltip'ün verileri kontrol et
        if (!params || params.length === 0) return "";

        let tooltip = `<div style="padding: 8px;">${params[0].name}</div>`;

        // Her ürün için satışları göster
        satisVerileri.forEach((item) => {
          if (item.name === params[0].name) {
            // Yalnızca eşleşen ayın verilerini göster
            Object.entries(item.productSales).forEach(([product, satis]) => {
              tooltip += `
                <div style="padding: 4px;">
                  <strong>${product}</strong>: ${satis} sales
                </div>`;
            });
            tooltip += `
              <div style="padding: 4px;">
                <strong>Total Sales</strong>: ${item.toplamSatis} sales
              </div>`;
          }
        });

        return tooltip;
      },
    },
    legend: {
      data: ["Total Sales"],
      textStyle: { color: "#9ca3af" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "1%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: aylar,
      axisLine: { lineStyle: { color: "#9ca3af" } },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#9ca3af" } },
      splitLine: { lineStyle: { color: "#4B5563" } },
      min: 0,
      max:
        Math.ceil(
          Math.max(...satisVerileri.map((item) => item.toplamSatis)) / 90
        ) * 90,
      interval: 90,
    },
    series: [
      {
        name: "Total Sales",
        type: "line",
        data: satisVerileri.map((item) => item.toplamSatis),
        smooth: true,
        lineStyle: { width: 2, color: "#8884d8" },
        itemStyle: { color: "#8884d8" },
        symbolSize: 8,
      },
    ],
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Aylık Toplam Satış Özeti
      </h2>

      <div>
        <ReactECharts option={options} style={{ height: 400, width: "100%" }} />
      </div>
    </motion.div>
  );
};

export default SalesOverviewCharts;
