import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CreateMeasureDialog } from "./components/CreateMeasureDialog";
import { MeasureCard } from "./components/MeasureCard";
import { useGetMeasures } from "./hooks/useMeasures";

export default function Measures() {
  const { data: measures, isLoading } = useGetMeasures();

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Medidas</Heading>
          <Text fontSize="lg">Define las unidades de medida para tus productos</Text>
        </Box>
        <CreateMeasureDialog />
      </Flex>
      {
        isLoading ? (
          <Text textAlign="center" mt="2rem">Cargando...</Text>
        ) : measures && measures.length > 0 ? (
          <Grid as="section" w="full" gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mt="2rem">
            {measures.map((measure) => (
              <MeasureCard key={measure.id} {...measure} />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center" mt="2rem">
            <Text>No hay medidas disponibles</Text>
          </Flex>
        )
      }
    </>
  );
}