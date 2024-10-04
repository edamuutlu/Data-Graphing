import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesOverviewChart = ({ selectedColumns, data }) => {
  if (selectedColumns.length !== 2) {
    return <div>Please select two columns (one string and one numeric) to display the chart.</div>;
  }

  const [stringColumn, numericColumn] = selectedColumns;

  const chartData = data.map(item => ({
    name: item[stringColumn],
    value: item[numericColumn]
  }));

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-white">Monthly Total Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;