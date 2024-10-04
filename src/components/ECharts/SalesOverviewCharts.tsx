import { motion } from "framer-motion";
import ReactECharts from 'echarts-for-react';
import { erpData } from '../../utils/erpData';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const SalesOverviewCharts = () => {
  const { data } = erpData;

  const salesData = months.map((month, index) => {
    const monthData = {
      name: month,
      productSales: {},
      totalSales: 0
    };
    data.forEach(product => {
      const sales = product.monthlySales[index];
      monthData.productSales[product.product] = sales;
      monthData.totalSales += sales;
    });
    return monthData;
  });

  // ECharts option object
  const options = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        // Tooltip'ün verileri kontrol et
        if (!params || params.length === 0) return '';

        let tooltip = `<div style="padding: 8px;">${params[0].name}</div>`;
        
        // Her ürün için satışları göster
        salesData.forEach(item => {
          if (item.name === params[0].name) { // Yalnızca eşleşen ayın verilerini göster
            Object.entries(item.productSales).forEach(([product, sales]) => {
              tooltip += `
                <div style="padding: 4px;">
                  <strong>${product}</strong>: ${sales} sales
                </div>`;
            });
            tooltip += `
              <div style="padding: 4px;">
                <strong>Total Sales</strong>: ${item.totalSales} sales
              </div>`;
              
          }
        });

        return tooltip;
      },
    },
    legend: {
      data: ['Total Sales'],
      textStyle: { color: '#9ca3af' },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: { lineStyle: { color: '#9ca3af' } },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#9ca3af' } },
      splitLine: { lineStyle: { color: '#4B5563' } },
      min: 0,
      max: Math.ceil(Math.max(...salesData.map(item => item.totalSales)) / 90) * 90,
      interval: 90,
    },
    series: [
      {
        name: 'Total Sales',
        type: 'line',
        data: salesData.map(item => item.totalSales),
        smooth: true,
        lineStyle: { width: 2, color: '#8884d8' },
        itemStyle: { color: '#8884d8' },
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
        Monthly Total Sales Overview
      </h2>

      <div>
        <ReactECharts option={options} style={{ height: 400, width: '100%' }} />
      </div>
    </motion.div>
  );
};

export default SalesOverviewCharts;
