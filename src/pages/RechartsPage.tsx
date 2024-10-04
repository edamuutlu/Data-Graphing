import { useState, useMemo } from 'react';
import Header from "../components/Header";
import { motion } from "framer-motion";
import CategoryDistributionChart from "../components/ReCharts/CategoryDistributionChart";
import SalesChannelChart from "../components/ReCharts/SalesChannelChart";
import { ConfigProvider, Table, Checkbox } from "antd";
import { erpData } from "../utils/erpData";
import StackedLineChart from "../components/ReCharts/StackedLineChart";
import SalesOverviewChart from "../components/ReCharts/SalesOverviewChart";

const RechartsPage = () => {
  const { data, columns } = erpData;
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleColumnSelect = (columnKey) => {
    setSelectedColumns(prev => {
      if (prev.includes(columnKey)) {
        return prev.filter(key => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };

  const updatedColumns = useMemo(() => {
    return columns.map(column => ({
      ...column,
      title: (
        <div>
          <Checkbox
            checked={selectedColumns.includes(column.dataIndex)}
            onChange={() => handleColumnSelect(column.dataIndex)}
          >
            {column.title}
          </Checkbox>
        </div>
      ),
    }));
  }, [columns, selectedColumns]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="ReCharts" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Table */}
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="overflow-x-auto">
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: "#1f2937",
                  colorText: "#fff",
                  colorTextLabel: "#9ca3af"
                },
              }}
            >
              <Table
                columns={updatedColumns}
                dataSource={data}
                pagination={false}
                rowClassName={() =>
                  "hover:bg-gray-700 px-6 py-4 whitespace-nowrap text-sm !text-gray-300"
                }
              />
            </ConfigProvider>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart selectedColumns={selectedColumns} data={data} />
          <StackedLineChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default RechartsPage;