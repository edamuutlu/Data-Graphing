import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import RechartsPage from "./pages/RechartsPage";
import AntDesignPage from "./pages/AntDesignPage";
import EChartsPage from "./pages/ECharts";
import EkstraPage from "./pages/EkstraPage";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Bg */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<RechartsPage />} />
        <Route path="/products" element={<AntDesignPage />} />
        <Route path="/users" element={<EChartsPage />} />
        <Route path="/sales" element={<EkstraPage />} />
      </Routes>
    </div>
  );
}

export default App;
