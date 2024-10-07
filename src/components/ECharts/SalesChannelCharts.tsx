"use client"

import ReactECharts from 'echarts-for-react';
import { motion } from "framer-motion";
import { erpData } from "../../utils/erpData";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

interface SalesData {
  salesChannel: string;
  monthlySales: number[];
}

const SalesChannelCharts: React.FC = () => {
  const { data } = erpData as { data: SalesData[] };

  const channelData = data.map(item => ({
    name: item.salesChannel,
    value: item.monthlySales.reduce((sum, satis) => sum + satis, 0)
  }));

  const getOption = () => ({
    tooltip: {
      trigger: 'item',
      backgroundColor: "rgba(31, 41, 55, 0.8)",
      borderColor: "#4B5563",
      textStyle: {
        color: "#E5E7EB"
      },
      formatter: (params: { name: string; value: number }) => {
        return `${params.name}: ${params.value.toLocaleString()} toplam satış`;
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
      data: channelData.map(item => item.name),
      axisLabel: {
        color: '#9CA3AF',
        rotate: 45,
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: '#4B5563'
        }
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#9CA3AF',
        formatter: (value: number) => value.toLocaleString()
      },
      axisLine: {
        lineStyle: {
          color: '#4B5563'
        }
      },
    },
    series: [{
      name: 'Toplam Satış',
      type: 'bar',
      data: channelData.map(item => item.value),
      itemStyle: {
        color: (params: { dataIndex: number }) => COLORS[params.dataIndex % COLORS.length],
      },
    }],
  });

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-1 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Satış Kanalına Göre Toplam Satışlar
      </h2>

      <div className="h-80">
        <ReactECharts option={getOption()} style={{ height: '100%', width: '100%' }} />
      </div>
    </motion.div>
  );
};

export default SalesChannelCharts;