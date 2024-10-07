import Header from "../components/Header";
import { motion } from "framer-motion";
import SalesTrendChart from "../components/AntDesign/SalesTrendChart";
import { ConfigProvider, Table } from "antd";
import { erpData } from "../utils/erpData";
import CategoryChart from "../components/AntDesign/CategoryChart";
import { useMemo } from "react";

type DataTuru = {
  monthlyStock: number[];
  monthlySales: number[];
};

type ColumnType = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (text: string, record: DataTuru) => React.ReactNode; // render fonksiyonu opsiyonel
};

const AntDesignPage = () => {
  const { data, columns } = erpData;

  const updatedColumns = useMemo(() => {
    return columns.map((column: ColumnType) => ({
      ...column,
      render: (text: string, record: DataTuru) => {
        if (column.dataIndex === 'stock') {
          const totalStock = record.monthlyStock.reduce((total: number, stock: number) => total + stock, 0);
          return totalStock;
        } 
        else if (column.dataIndex === 'sales') {
          const totalSales = record.monthlySales.reduce((total: number, sales: number) => total + sales, 0);
          return totalSales;
        }
        return text;
      },
    }));
  }, [columns]);

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Ant Design" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Tablo */}
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
        <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
          <SalesTrendChart />
          <CategoryChart />
        </div>
      </main>
    </div>
  );
};

export default AntDesignPage;
