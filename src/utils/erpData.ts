// Combined data and columns definition for Ant Design Table
export const erpData = {
  data: [
    {
      id: "1",
      product: "Ürün A",
      category: "Elektronik",
      salesChannel: "Çevrimi İçi",
      monthlySales: [75, 50, 60, 80, 90, 100, 75, 50, 60, 80, 90, 100], 
      monthlyStock: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 0],
    },
    {
      id: "2",
      product: "Ürün B",
      category: "Giyim",
      salesChannel: "Perakende",
      monthlySales: [30, 40, 50, 20, 60, 80, 30, 40, 50, 20, 60, 80], 
      monthlyStock: [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 0],
    },
    {
      id: "3",
      product: "Ürün C",
      category: "Mobilya",
      salesChannel: "Toptan",
      monthlySales: [70, 80, 90, 60, 50, 110, 70, 80, 90, 60, 50, 110],
      monthlyStock: [200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 150, 145],
    },
    {
      id: "4",
      product: "Ürün D",
      category: "Otomotiv Yedek Parça",
      salesChannel: "Perakende",
      monthlySales: [25, 30, 20, 35, 45, 60, 25, 30, 20, 35, 45, 60], 
      monthlyStock: [150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95], 
    },
  ],
  columns: [
    {
      title: "Ürün",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Satış Miktarı",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Satış Kanalı",
      dataIndex: "salesChannel",
      key: "salesChannel",
    },
  ],
};
