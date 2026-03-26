import { Box, Flex, Grid, Heading, Text, Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { CreateProviderDialog } from "./components/CreateProviderDialog";
import { ProviderCard } from "./components/ProviderCard";
import { useGetProviders, useDeleteProvider } from "./hooks/useProviders";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
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
        <Button
          bgColor="#6B60CE"
          color="white"
          size="sm"
          fontWeight="semibold"
          onClick={() => setModalState({ type: "create" })}
          _hover={{
            bgColor: "#5a4fb8",
          }}
        >
          Agregar Proveedor
          <Plus size={16} />
        </Button>
      </Flex>
      {
        isLoading ? (
          <Text textAlign="center" mt="2rem">Cargando...</Text>
        ) : providers && providers.length > 0 ? (
          <Grid as="section" w="full" gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6} mt="2rem">
            {providers.map((provider, index) => (
              <ProviderCard
                index={index}
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
      <CreateProviderDialog
        key={modalState.type === "edit" ? modalState.el.id : "new"}
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        providerToEdit={modalState.type === "edit" ? modalState.el : null}
        onOpenChange={() => setModalState({ type: "closed" })}
      />
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