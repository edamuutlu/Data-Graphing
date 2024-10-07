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
  TooltipProps,
} from "recharts";
import { erpData } from "../../utils/erpData";

const aylar = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
];
const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

interface Product {
  product: string;
  monthlySales: number[];
}

interface SalesData {
  name: string;
  [key: string]: string | number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = (props: CustomTooltipProps) => {
  const {
  active,
  payload,
  label,
} = props; 
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

export const StackedLineChart: React.FC = () => {
  const { data } = erpData as { data: Product[] };

  const salesData: SalesData[] = aylar.map((month, index) => {
    const monthData: SalesData = { name: month };
    data.forEach((product) => {
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
        Aylık Satış Özeti
      </h2>

      <div>
        <ResponsiveContainer width="100%" height={400}>
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
