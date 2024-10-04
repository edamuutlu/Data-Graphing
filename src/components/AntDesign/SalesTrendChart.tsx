import { Line } from "@ant-design/plots";
import { erpData } from "../../utils/erpData";

const SalesTrendChart = () => {
  const { data } = erpData;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const chartData = monthNames.flatMap((month, index) => {
    return data.map(product => ({
      month,
      product: product.product,
      sales: product.monthlySales[index] || 0, // Use 0 instead of null
    }));
  });
  
  const config = {
    data: chartData,
    xField: "month",
    yField: "sales",
    seriesField: "product",
    xAxis: {
      title: {
        text: "Month",
        style: { fill: "#E5E7EB" },
      },
      label: { style: { fill: "#9CA3AF" } },
    },
    yAxis: {
      title: {
        text: "Sales",
        style: { fill: "#E5E7EB" },
      },
      label: { style: { fill: "#9CA3AF" } },
      min: 0,
      max: 360, // Adjust based on your data
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
      formatter: (datum) => {
        return {
          name: datum.product,
          value: datum.sales,
        };
      },
    },
    theme: "dark",
    colorField: "product",
  };
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Monthly Sales Overview</h2>
      <div style={{ width: "100%", height: 400 }}>
        <Line {...config} />
      </div>
    </div>
  );
};

export default SalesTrendChart;