import { GridItem, Heading } from "@chakra-ui/react";
import type { ProductByCategory } from "@/features/dashboard/interfaces/dashboard.interface";
import { Chart, useChart } from "@chakra-ui/charts";
import { LabelList, Legend, Pie, PieChart, Sector, Tooltip } from "recharts";
import { CATEGORY_COLORS } from "../constants/constants";
import { EmptyState } from "./EmptyState";

interface ProductsByCategoryChartProps {
  data: ProductByCategory[];
}

const getColorForCategory = (category: string, index: number): string => {
  return CATEGORY_COLORS[category] || `hsl(${index * 45}, 70%, 60%)`;
};

export const ProductsByCategoryChart = ({
  data,
}: ProductsByCategoryChartProps) => {
  const chart = useChart({
    data: data.map((item, index) => ({
      name: item.category,
      value: Number(item.count),
      color: getColorForCategory(item.category, index),
    })),
  });

  return (
    <GridItem 
      colSpan={4} 
      bg="white" 
      p="2rem" 
      rounded="lg" 
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ shadow: "md" }}
      transition="all 0.2s"
    >
      <Heading as="h3" size="md" mb={6} color="gray.800">
        Productos por Categoría
      </Heading>
      {data.length === 0 ? (
        <EmptyState message="No hay datos de categorías disponibles" />
      ) : (
        <Chart.Root boxSize="480px" mx="auto" chart={chart}>
        <PieChart responsive>
          <Legend content={<Chart.Legend />} />
          <Tooltip
            cursor={false}
            animationDuration={100}
            content={<Chart.Tooltip hideLabel />}
          />
          <Pie
            isAnimationActive={false}
            data={chart.data}
            dataKey={chart.key("value")}
            labelLine={false}
            label={({ name, index }) => {
              const { value } = chart.data[index ?? -1];
              const percent = value / chart.getTotal("value");
              return `${name}: ${(percent * 100).toFixed(1)}%`;
            }}
            shape={(props) => <Sector {...props} fill={props.payload!.color} />}
          >
            <LabelList position="inside" fill="white" stroke="none" />
          </Pie>
        </PieChart>
      </Chart.Root>
      )}
    </GridItem>
  );
};
