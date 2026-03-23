import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/react";
import { Eye, Plus, Search, Trash2 } from "lucide-react";
import {
  CustomTable,
  type ColumnDef,
} from "@/shared/components/custom/CustomTable";
import { CreateUserDialog } from "./components/CreateUserDialog";
import { useGetUsers, useDeleteUser } from "./hooks/useUsers";
import { useState, useMemo } from "react";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { useDebounceValue } from "@/shared/hooks/useDebounceValue";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { User } from "./interfaces/interfaces";
import type { ModalState } from "@/shared/interfaces/interfaces";

export default function Users() {
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<ModalState<User>>({
    type: "closed",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { mutate: deleteUser } = useDeleteUser();
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  const handleDelete = (id: string) => {
    deleteUser(id);
    setModalState({ type: "closed" });
  };

  const { data: users, isLoading } = useGetUsers({
    page,
    limit: 10,
    search: debouncedSearchTerm || undefined,
  });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: "name",
        header: "Nombre",
        accessor: "name",
      },
      {
        id: "lastname",
        header: "Apellido",
        accessor: "lastname",
      },
      {
        id: "username",
        header: "Nombre de usuario",
        accessor: "username",
      },
      {
        id: "created_at",
        header: "Fecha de Registro",
        accessor: "created_at",
        render: (user) => new Date(user.created_at).toLocaleDateString("es-ES"),
      },
      {
        id: "actions",
        header: "Acciones",
        accessor: "id",
        render: (user) => (
          <Flex gap={2}>
            <Tooltip content="Ver/Editar">
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="Ver usuario"
                onClick={() => setModalState({ type: "edit", el: user })}
              >
                <Eye size={16} />
              </IconButton>
            </Tooltip>
            <Tooltip content="Eliminar">
              <IconButton
                size="xs"
                variant="ghost"
                colorPalette="red"
                aria-label="Eliminar usuario"
                onClick={() => setModalState({ type: "delete", el: user })}
              >
                <Trash2 size={16} />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Flex
        as="section"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box>
          <Heading size="2xl">Usuarios</Heading>
          <Text fontSize="lg" color="gray.600">
            Gestiona los usuarios del sistema y sus permisos
          </Text>
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
          Agregar Usuario
          <Plus size={16} />
        </Button>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <InputGroup
          border="none"
          outline="none"
          startElement={<Search size={18} color="gray" />}
          width="420px"
        >
          <Input
            rounded="md"
            bgColor="white"
            shadow="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar..."
            disabled={isLoading}
          />
        </InputGroup>
      </Flex>

      <CustomTable
        columns={columns}
        data={users?.data || []}
        isLoading={isLoading}
        limit={users?.meta?.limit || 10}
        page={users?.meta?.page || 1}
        count={users?.meta?.total || 0}
        onPageChange={(newPage) => setPage(newPage)}
        emptyMessage="No hay usuarios disponibles"
        tableSize="sm"
      />

      <CreateUserDialog
        key={modalState.type === "edit" ? modalState.el.id : "new"}
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        userToEdit={modalState.type === "edit" ? modalState.el : null}
        onOpenChange={() => setModalState({ type: "closed" })}
      />
      <ConfirmDeleteDialog
        title="¿Estás seguro de eliminar este usuario?"
        descripcion="Esta acción no se puede deshacer."
        isOpen={modalState.type === "delete"}
        onOpenChange={() => setModalState({ type: "closed" })}
        handleDelete={() => {
          if (modalState.type === "delete") {
            handleDelete(modalState.el.id);
          }
        }}
      />
    </>
  );
}
