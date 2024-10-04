// Combined data and columns definition for Ant Design Table
export const erpData = {
  data: [
    {
      key: "1",
      product: "Product A",
      sales: 910,
      category: "Electronics",
      stock: 100,
      salesChannel: "Online",
      monthlySales: [75, 50, 60, 80, 90, 100, 75, 50, 60, 80, 90, 100], // Example monthly sales data for Product A
      monthlyStock: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 0, 0], // Example monthly stock data for Product A
    },
    {
      key: "2",
      product: "Product B",
      sales: 540,
      category: "Apparel",
      stock: 50,
      salesChannel: "Retail",
      monthlySales: [30, 40, 50, 20, 60, 80, 30, 40, 50, 20, 60, 80], // Example monthly sales data for Product B
      monthlyStock: [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 0, 0], // Example monthly stock data for Product B
    },
    {
      key: "3",
      product: "Product C",
      sales: 920,
      category: "Furniture",
      stock: 200,
      salesChannel: "Wholesale",
      monthlySales: [70, 80, 90, 60, 50, 110, 70, 80, 90, 60, 50, 110], // Example monthly sales data for Product C
      monthlyStock: [200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 150, 145], // Example monthly stock data for Product C
    },
    {
      key: "4",
      product: "Product D",
      sales: 430,
      category: "Electronics",
      stock: 150,
      salesChannel: "Retail",
      monthlySales: [25, 30, 20, 35, 45, 60, 25, 30, 20, 35, 45, 60], // Example monthly sales data for Product D
      monthlyStock: [150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95], // Example monthly stock data for Product D
    },
  ],
  columns: [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Sales Channel",
      dataIndex: "salesChannel",
      key: "salesChannel",
    },
  ],
};
