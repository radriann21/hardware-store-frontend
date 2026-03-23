import { Box, Flex, Grid, Heading, Text, Button } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { CategoryCard } from "./components/CategoryCard";
import { useGetCategories } from "./hooks/useCategories";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { useState } from "react";
import { useDeleteCategory } from "./hooks/useCategories";
import type { Category } from "./interfaces/interfaces";
import type { ModalState } from "@/shared/interfaces/interfaces";

export default function Categories() {
  const [modalState, setModalState] = useState<ModalState<Category>>({ type: 'closed' });
  const { data: categories, isLoading } = useGetCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (id: number) => {
    deleteCategory(id);
    setModalState({ type: 'closed' });
  };

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Categorias</Heading>
          <Text fontSize="lg">Listado y control de categorias</Text>
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
          Agregar Categoria
          <Plus size={16} />
        </Button>
      </Flex>
      {
        isLoading ? (
          <Text textAlign="center" mt="2rem">Cargando...</Text>
        ) : categories && categories.length > 0 ? (
          <Grid as="section" w="full" gridTemplateColumns="repeat(3, 1fr)" gap={6} mt="2rem">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                onEdit={(category) => setModalState({ type: 'edit', el: category })}
                onDelete={(category) => {
                  setModalState({ type: 'delete', el: category });
                }}
              />
            ))}
          </Grid>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <Text>No hay categorias disponibles</Text>
          </Flex>
        )
      }
      <CreateCategoryDialog
        key={modalState.type === "edit" ? modalState.el.id : "new"}
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        categoryToEdit={modalState.type === "edit" ? modalState.el : null}
        onOpenChange={() => setModalState({ type: "closed" })}
      />
      <ConfirmDeleteDialog 
        title="¿Estas seguro de desactivar la categoría?"
        descripcion="La categoría pasará a estar inactiva."
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
