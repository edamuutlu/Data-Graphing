import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SalesOverviewChart = ({ selectedColumns, data }) => {
  const chartData = useMemo(() => {
    if (selectedColumns.length < 2) {
      return [];
    }

    const stringColumn = selectedColumns.find(col => typeof data[0][col] === 'string');
    const numericColumns = selectedColumns.filter(col => typeof data[0][col] === 'number');

    const groupedData = data.reduce((acc, item) => {
      const key = item[stringColumn];
      if (!acc[key]) {
        acc[key] = Array(12).fill().map(() => ({ sales: 0, stock: 0 }));
      }
      
      item.monthlySales.forEach((sale, index) => {
        acc[key][index].sales += sale;
      });
      
      item.monthlyStock.forEach((stock, index) => {
        acc[key][index].stock += stock;
      });
      
      return acc;
    }, {});

    return months.map((month, index) => {
      const monthData = { name: month };
      let totalSales = 0;
      let totalStock = 0;

      Object.keys(groupedData).forEach(key => {
        monthData[`${key}_sales`] = groupedData[key][index].sales;
        monthData[`${key}_stock`] = groupedData[key][index].stock;
        totalSales += groupedData[key][index].sales;
        totalStock += groupedData[key][index].stock;
      });

      monthData.totalSales = totalSales;
      monthData.totalStock = totalStock;

      return monthData;
    });
  }, [data, selectedColumns]);

  if (selectedColumns.length < 2) {
    return <div>Lütfen en az bir string ve bir sayısal sütun seçin.</div>;
  }

  const stringColumn = selectedColumns.find(col => typeof data[0][col] === 'string');
  const numericColumns = selectedColumns.filter(col => typeof data[0][col] === 'number');

  const lineColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-gray-800 p-4 rounded shadow">
          <p className="label text-white">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
          <div className="mt-2 border-t border-gray-600 pt-2">
            <p className="text-white font-bold">Details:</p>
            {Object.keys(payload[0].payload)
              .filter(key => key.includes('_sales') || key.includes('_stock'))
              .map((key, index) => (
                <p key={index} className="text-gray-300">
                  {`${key.split('_')[0]}: ${payload[0].payload[key]}`}
                </p>
              ))}
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
          {numericColumns.includes('sales') && (
            <Line 
              type="monotone" 
              dataKey="totalSales" 
              stroke={lineColors[0]} 
              name="Toplam Satış"
              strokeWidth={2}
            />
          )}
          {numericColumns.includes('stock') && (
            <Line 
              type="monotone" 
              dataKey="totalStock" 
              stroke={lineColors[1]} 
              name="Toplam Stok"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;