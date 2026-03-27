import { Grid, GridItem, Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export const DashboardSkeleton = () => {
  return (
    <Grid my="10px" gap="20px" templateColumns="repeat(4, 1fr)">
      {[1, 2, 3].map((i) => (
        <GridItem key={i} colSpan={1}>
          <Box bg="white" p={6} borderRadius="lg" border="1px solid" borderColor="gray.200">
            <Skeleton height="20px" width="60%" mb={4} />
            <Skeleton height="40px" width="80%" mb={2} />
            <Skeleton height="16px" width="50%" />
          </Box>
        </GridItem>
      ))}
      
      <GridItem colSpan={4} bg="white" p="2rem" rounded="md" shadow="sm">
        <Skeleton height="24px" width="200px" mb={4} />
        <Skeleton height="400px" borderRadius="md" />
      </GridItem>
      
      <GridItem colSpan={4} bg="white" p="2rem" rounded="md" shadow="sm">
        <Skeleton height="24px" width="250px" mb={6} />
        {[1, 2, 3, 4, 5].map((i) => (
          <Box key={i} py={4} borderBottom="1px solid" borderColor="gray.100">
            <SkeletonText noOfLines={2} />
          </Box>
        ))}
      </GridItem>
    </Grid>
  );
};
