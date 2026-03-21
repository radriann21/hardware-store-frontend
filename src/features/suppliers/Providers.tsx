import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { CreateProviderDialog } from "./components/CreateProviderDialog";
import { ProviderCard } from "./components/ProviderCard";
import { useGetProviders, useDeleteProvider } from "./hooks/useProviders";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { EditProviderDialog } from "./components/EditProviderDialog";
import { useState } from "react";
import type { Provider } from "./interfaces/interfaces";
import type { ModalState } from "@/shared/interfaces/interfaces";

export default function Providers() {
  const [modalState, setModalState] = useState<ModalState<Provider>>({ type: 'closed' });
  const { data: providers, isLoading } = useGetProviders();
  const { mutate: deleteProvider } = useDeleteProvider();

  const handleDelete = (id: string) => {
    deleteProvider(id);
    setModalState({ type: 'closed' });
  };

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
              <ProviderCard
                key={provider.id}
                provider={provider}
                onEdit={(provider) => setModalState({ type: 'edit', el: provider })}
                onDelete={(provider) => setModalState({ type: 'delete', el: provider })}
              />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center" mt="2rem">
            <Text>No hay proveedores disponibles</Text>
          </Flex>
        )
      }
      {modalState.type === 'edit' && (
        <EditProviderDialog
          provider={modalState.el}
          isOpen={true}
          onClose={() => setModalState({ type: 'closed' })}
        />
      )}
      <ConfirmDeleteDialog
        title="¿Estás seguro de eliminar este proveedor?"
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