import { motion } from "framer-motion";
import Header from "../components/Header";
import SalesByCategoryChart from "../components/Ekstra/SalesByCategoryChart";
import DailySalesTrend from "../components/Ekstra/DailySalesTrend";
import SalesDetailOverviewChart from "../components/Ekstra/SalesDetailOverviewChart";
import UserActivityHeatmap from "../components/Ekstra/UserActivityHeatmap";
import UserDemographicsChart from "../components/Ekstra/UserDemographicsChart";

const EkstraPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Ekstra Örnekler" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* SALES STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        ></motion.div>

        <SalesDetailOverviewChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UserActivityHeatmap />
          <UserDemographicsChart />
          <SalesByCategoryChart />
          <DailySalesTrend />
        </div>
      </main>
    </div>
  );
};
export default EkstraPage;
