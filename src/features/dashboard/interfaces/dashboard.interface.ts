export interface DashboardData {
  lowStockProducts: LowStockProduct[];
  totalValue: string;
  recentMovements: RecentMovement[];
  productsByCategory: ProductByCategory[];
}

export interface LowStockProduct {
  id: string;
  name: string;
  actual_stock: number;
  min_stock: number;
  category: string;
}

export interface RecentMovement {
  id: number;
  product_id: string;
  user_id: string;
  quantity: number;
  type: "ENTRY" | "EXIT" | "ADJUSTMENT";
  description: string;
  created_at: string;
  product: {
    name: string;
  };
}

export interface ProductByCategory {
  category: string;
  count: string;
  percentage: number;
}