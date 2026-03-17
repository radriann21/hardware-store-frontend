import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CreateProviderDialog } from "./components/CreateProviderDialog";
import { ProviderCard } from "./components/ProviderCard";
import { useGetProviders } from "./hooks/useProviders";

export default function Providers() {
  const { data: providers, isLoading } = useGetProviders();

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Proveedores</Heading>
          <Text fontSize="lg">Gestiona tus proveedores de productos</Text>
        </Box>
        <CreateProviderDialog />
      </Flex>
      {
        isLoading ? (
          <Text textAlign="center" mt="2rem">Cargando...</Text>
        ) : providers && providers.length > 0 ? (
          <Grid as="section" w="full" gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6} mt="2rem">
            {providers.map((provider) => (
              <ProviderCard key={provider.id} {...provider} />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center" mt="2rem">
            <Text>No hay proveedores disponibles</Text>
          </Flex>
        )
      }
    </>
  );
}