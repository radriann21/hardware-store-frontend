import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CreateMeasureDialog } from "./components/CreateMeasureDialog";
import { MeasureCard } from "./components/MeasureCard";
import { useGetMeasures, useDeleteMeasure } from "./hooks/useMeasures";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { EditMeasureDialog } from "./components/EditMeasureDialog";
import { useState } from "react";
import type { Measure } from "./interfaces/interfaces";
import type { ModalState } from "@/shared/interfaces/interfaces";

export default function Measures() {
  const [modalState, setModalState] = useState<ModalState<Measure>>({ type: 'closed' });
  const { data: measures, isLoading } = useGetMeasures();
  const { mutate: deleteMeasure } = useDeleteMeasure();

  const handleDelete = (id: number) => {
    deleteMeasure(String(id));
    setModalState({ type: 'closed' });
  };

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
              <MeasureCard
                key={measure.id}
                measure={measure}
                onEdit={(measure) => setModalState({ type: 'edit', el: measure })}
                onDelete={(measure) => setModalState({ type: 'delete', el: measure })}
              />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center" mt="2rem">
            <Text>No hay medidas disponibles</Text>
          </Flex>
        )
      }
      {modalState.type === 'edit' && (
        <EditMeasureDialog
          measure={modalState.el}
          isOpen={true}
          onClose={() => setModalState({ type: 'closed' })}
        />
      )}
      <ConfirmDeleteDialog
        title="¿Estás seguro de eliminar esta medida?"
        descripcion="Esta acción no se puede deshacer."
        isOpen={modalState.type === 'delete'}
        onOpenChange={() => setModalState({ type: 'closed' })}
        handleDelete={() => {
          if (modalState.type === 'delete') {
            handleDelete(modalState.el.id);
          }
        }}
      />
    </>
  );
}