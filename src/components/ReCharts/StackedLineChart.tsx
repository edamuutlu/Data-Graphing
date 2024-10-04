import React from 'react';
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { erpData } from "../../utils/erpData";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300']; // Add more colors if needed

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-4 border border-gray-700 rounded">
        <p className="text-gray-200 font-bold">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value} sales`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const StackedLineChart = () => {
  const { data } = erpData;
  
  const salesData = months.map((month, index) => {
    const monthData = { name: month };
    data.forEach(product => {
      monthData[product.product] = product.monthlySales[index];
    });
    return monthData;
  });

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

      <div>
        <ResponsiveContainer width={"100%"} height={400}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {data.map((product, index) => (
              <Line
                key={product.product}
                type="monotone"
                dataKey={product.product}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default StackedLineChart;