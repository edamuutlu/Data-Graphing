"use client"

import { motion } from "framer-motion"
import { Pie } from "@ant-design/plots"
import { erpData } from "../../utils/erpData"

export default function CategoryChart() {
  const { data } = erpData

  const categoryData = data.map(item => ({
    type: item.category,
    value: item.stock
  }))

  const config = {
    appendPadding: 10,
    data: categoryData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
      style: {
        fontSize: 14,
        fill: "#E5E7EB",
      },
    },
    interactions: [{ type: "element-active" }],
    color: ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"],
    legend: {
      position: "bottom",
      itemName: {
        style: {
          fill: "#E5E7EB",
        },
      },
    },
    theme: {
      styleSheet: {
        backgroundColor: "transparent",
        textColor: "#E5E7EB",
      },
    },
  }

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Category Distribution
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <Pie {...config} />
      </div>
    </motion.div>
  )
}