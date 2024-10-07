import { Line } from "@ant-design/plots";
import { erpData } from "../../utils/erpData";

const SalesTrendChart = () => {
  const { data } = erpData;

  const aylar = [
    "Oca", "Şub", "Mar", "Nis", "May", "Haz",
    "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
  ];

  const chartData = aylar.flatMap((ay, index) => {
    return data.map(product => ({
      ay,
      product: product.product,
      satis: product.monthlySales[index] || 0, 
    }));
  });
  
  const config = {
    data: chartData,
    xField: "ay",
    yField: "satis",
    seriesField: "product",
    xAxis: {
      title: {
        text: "Ay",
        style: { fill: "#E5E7EB" },
      },
      label: { style: { fill: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Satışlar",
        style: { fill: "#E5E7EB" },
      },
      label: { style: { fill: "#9CA3AF" } },
      min: 0,
      max: 360, 
      tickInterval: 90,
    },
    legend: {
      position: "top",
      itemName: { style: { fill: "#E5E7EB" } },
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
    tooltip: {
      domStyles: {
        "g2-tooltip": {
          backgroundColor: "rgba(31, 41, 55, 0.8)",
          color: "#E5E7EB",
        },
      },
      formatter: (datum: { product: string; satis: number }) => {
        return {
          name: datum.product,
          value: datum.satis,
        };
      },
    },
    theme: "dark",
    colorField: "product",
  };
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Aylık Satış Özeti</h2>
      <div style={{ width: "100%", height: 400 }}>
        <Line {...config} />
      </div>
    </div>
  );
};

export default SalesTrendChart;