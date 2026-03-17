import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { CategoryCard } from "./components/CategoryCard";
import { useGetCategories } from "./hooks/useCategories";

export default function Categories() {
  const { data: categories, isLoading } = useGetCategories();

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Categorias</Heading>
          <Text fontSize="lg">Listado y control de categorias</Text>
        </Box>
        <CreateCategoryDialog />
      </Flex>
      {
        isLoading ? (
          <Text textAlign="center" mt="2rem">Cargando...</Text>
        ) : categories && categories.length > 0 ? (
          <Grid as="section" w="full" gridTemplateColumns="repeat(3, 1fr)" gap={6} mt="2rem">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Text>No hay categorias disponibles</Text>
          </Flex>
        )
      }
    </>
  );
}
