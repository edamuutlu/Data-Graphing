import { motion } from "framer-motion";
import ReactECharts from 'echarts-for-react';
import { erpData } from "../../utils/erpData";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']; 

export const StackedLineCharts = () => {
  const { data } = erpData;
  
  const series = data.map((product, index) => ({
    name: product.product,
    type: 'line',
    stack: 'Total',
    areaStyle: {},
    emphasis: {
      focus: 'series'
    },
    data: product.monthlySales,
    itemStyle: {
      color: colors[index % colors.length]
    }
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderColor: '#333',
      textStyle: {
        color: '#fff'
      },
      formatter: function (params) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param) => {
          result += `${param.seriesName}: ${param.value} sales<br/>`;
        });
        return result;
      }
    },
    legend: {
      data: data.map(product => product.product),
      textStyle: {
        color: '#9CA3AF'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: months,
      axisLabel: {
        color: '#9CA3AF'
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#9CA3AF'
      }
    },
    series: series
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Monthly Sales Overview
      </h2>
      <ReactECharts
        option={option}
        style={{ height: '400px', width: '100%' }}
        theme="light"
      />
    </motion.div>
  );
};

export default StackedLineCharts;