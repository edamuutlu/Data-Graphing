
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';

const months = [
  "Oca", "Şub", "Mar", "Nis", "May", "Haz",
  "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
];

interface DataItem {
  [id: string]: string | number | number[];
  monthlySales: number[];
  monthlyStock: number[];
}

interface ChartDataItem {
  name: string;
  totalSales: number;
  totalStock: number;
  [id: string]: string | number;
}

interface SalesOverviewChartProps {
  selectedColumns: string[];
  data: DataItem[];
}

const SalesOverviewChart = (props: SalesOverviewChartProps) => { 
  const { selectedColumns, data } = props; 
  const chartData: ChartDataItem[] = useMemo(() => {
    if (selectedColumns.length < 2) {
      return [];
    }

    const stringColumn = selectedColumns.find(col => typeof data[0][col] === 'string') || '';
    
    const groupedData = data.reduce<Record<string, { sales: number; stock: number }[]>>((acc, item) => {
      const id = item[stringColumn] as string;
      if (!acc[id]) {
        acc[id] = Array(12).fill(null).map(() => ({ sales: 0, stock: 0 }));
      }
      
      (item.monthlySales as number[]).forEach((sale, index) => {
        acc[id][index].sales += sale;
      });
      
      (item.monthlyStock as number[]).forEach((stock, index) => {
        acc[id][index].stock += stock;
      });
      
      return acc;
    }, {});

    return months.map((month, index) => {
      const monthData: ChartDataItem = { name: month, totalSales: 0, totalStock: 0 };

      Object.keys(groupedData).forEach(id => {
        monthData[`${id}_sales`] = groupedData[id][index].sales;
        monthData[`${id}_stock`] = groupedData[id][index].stock;
        monthData.totalSales += groupedData[id][index].sales;
        monthData.totalStock += groupedData[id][index].stock;
      });

      return monthData;
    });
  }, [data, selectedColumns]);

  if (selectedColumns.length < 2) {
    return <div>Lütfen en az bir string ve bir sayısal sütun seçin.</div>;
  }

  const numericColumns = selectedColumns.filter(col => typeof data[0][col] === 'number')
  .map(col => col.charAt(0).toUpperCase() + col.slice(1));

  const lineColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-gray-800 p-4 rounded shadow">
          <p className="label text-white font-bold mb-2">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-semibold">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
          <div className="mt-2 border-t border-gray-600 pt-2">
            <p className="text-white font-bold mb-1">Detaylar:</p>
            {Object.keys(payload[0].payload)
              .filter(key => key.includes('_sales') || key.includes('_stock'))
              .map((key, index) => {
                const [product, type] = key.split('_');
                const value = payload[0].payload[key];
                return (
                  <p key={index} className="text-gray-300">
                    {`${product} ${type === 'sales' ? 'Satış' : 'Stok'}: ${value}`}
                  </p>
                );
              })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Aylık Genel Bakış</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {numericColumns.map((col,i)=>(
            <Line 
            type="monotone" 
            dataKey={`total${col}`} 
            stroke={lineColors[i]}  
            name={`Total ${col}`}
            strokeWidth={2}
          />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;