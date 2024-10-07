import { useState, useMemo } from "react";
import Header from "../components/Header";
import { motion } from "framer-motion";
import CategoryDistributionChart from "../components/ReCharts/CategoryDistributionChart";
import SalesChannelChart from "../components/ReCharts/SalesChannelChart";
import { ConfigProvider, Table, Checkbox } from "antd";
import { erpData } from "../utils/erpData";
import StackedLineChart from "../components/ReCharts/StackedLineChart";
import SalesOverviewChart from "../components/ReCharts/SalesOverviewChart";

type DataTuru = {
  monthlyStock: number[];
  monthlySales: number[];
};

type SutunTuru = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: DataTuru) => React.ReactNode; 
};

const RechartsPage = () => {
  const [secilenSutunlar, setSecilenSutunlar] = useState<string[]>([]);
  const { data, columns } = erpData;

  const sutunSeciminiIsle = (columnKey: string) => {
    setSecilenSutunlar((prev) => {
      if (prev.includes(columnKey)) {
        return prev.filter((key) => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };

  const guncelVeri = useMemo(() => {
    return data.map((record) => ({
      ...record,
      sales: record.monthlySales.reduce((total, sales) => total + sales, 0),
      stock: record.monthlyStock.reduce((total, stock) => total + stock, 0),
    }));
  }, [data]);
  
  const guncelSutunlar = useMemo(() => {
    return columns.map((column: SutunTuru) => ({
      ...column,
      render: (text: string, record: DataTuru) => {
        if (column.dataIndex === 'stock') {
          const toplamStok = record.monthlyStock.reduce((total: number, stock: number) => total + stock, 0);
          return toplamStok;
        } 
        else if (column.dataIndex === 'sales') {
          const toplamSatis = record.monthlySales.reduce((total: number, sales: number) => total + sales, 0);
          return toplamSatis;
        }
        return text;
      },
      title: (
        <Checkbox
          checked={secilenSutunlar.includes(column.dataIndex)}
          onChange={() => sutunSeciminiIsle(column.dataIndex)}
        >
          {column.title}
        </Checkbox>
      ),
    }));
  }, [columns, secilenSutunlar]);
  

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
                  colorTextLabel: "#9ca3af",
                },
              }}
            >
              <Table
                columns={guncelSutunlar}
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
          <SalesOverviewChart selectedColumns={secilenSutunlar} data={guncelVeri} />
          <StackedLineChart />
          <CategoryDistributionChart />
          <SalesChannelChart />
        </div>
      </main>
    </div>
  );
};

export default RechartsPage;
