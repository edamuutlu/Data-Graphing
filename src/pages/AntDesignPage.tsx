import Header from "../components/Header";
import { motion } from "framer-motion";
import SalesTrendChart from "../components/AntDesign/SalesTrendChart";
import { ConfigProvider, Table } from "antd";
import { erpData } from "../utils/erpData";
import CategoryChart from "../components/AntDesign/CategoryChart";

const AntDesignPage = () => {
  const { data, columns } = erpData;
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
                  colorTextLabel: "#9ca3af"
                },
              }}
            >
              <Table
                columns={columns}
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
