import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
} from "@chakra-ui/react";
import { StatsCardsContainer } from "./components/StatsCardsContainer";
import { useGetDashboard } from "./hooks/useDashboard";
import { ProductsByCategoryChart } from "./components/ProductByCategoryChart";
import { RecentMovementView } from "./components/RecentMovementView";
import { DashboardSkeleton } from "./components/DashboardSkeleton";
import { DashboardError } from "./components/DashboardError";

export default function Dashboard() {
  const { data: dashboardData, isLoading, isError, refetch } = useGetDashboard();
  
  return (
    <>
      <Flex
        as="section"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box animation="fade-in">
          <Heading size="2xl">Dashboard</Heading>
          <Text fontSize="lg" color="gray.600">
            Vista general del sistema actual
          </Text>
        </Box>
      </Flex>

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError ? (
        <DashboardError onRetry={() => refetch()} />
      ) : (
        <Grid my="10px" gap="20px" templateColumns="repeat(4, 1fr)">
          <StatsCardsContainer dashboardData={dashboardData || null} />
          <ProductsByCategoryChart data={dashboardData?.productsByCategory || []} />
          <RecentMovementView data={dashboardData?.recentMovements || []} />
        </Grid>
      )}
    </>
  );
}
