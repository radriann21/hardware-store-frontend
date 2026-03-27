import { AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { StatsCard } from "./StatsCard";
import type { DashboardData } from "../interfaces/dashboard.interface";

interface StatsCardsContainerProps {
  dashboardData: DashboardData | null;
}

export const StatsCardsContainer = ({ dashboardData }: StatsCardsContainerProps) => {
  if (!dashboardData) return null;

  const lowStockCount = dashboardData.lowStockProducts.length;
  const inventoryValue = parseFloat(dashboardData.totalValue);
  const recentMovementsCount = dashboardData.recentMovements.length;

  const formatInventoryValue = () => {
    if (isNaN(inventoryValue) || inventoryValue === 0) {
      return "$0.0";
    }
    
    if (inventoryValue >= 1000) {
      return `$${(inventoryValue / 1000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}K`;
    }
    
    return `$${inventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <StatsCard
        title="Stock Bajo"
        value={lowStockCount}
        icon={AlertTriangle}
        iconColor="orange.500"
        iconBg="orange.50"
      />
      <StatsCard
        title="Valor del Inventario"
        value={formatInventoryValue()}
        icon={TrendingUp}
        iconColor="green.500"
        iconBg="green.50"
      />
      <StatsCard
        title="Movimientos Recientes"
        value={recentMovementsCount}
        icon={Activity}
        iconColor="purple.500"
        iconBg="purple.50"
      />
    </>
  );
};
