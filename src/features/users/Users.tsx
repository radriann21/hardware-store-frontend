import {
  Box,
  Flex,
  Heading,
  Text,
  IconButton,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { Eye, Search, Trash2 } from "lucide-react";
import {
  CustomTable,
  type ColumnDef,
} from "@/shared/components/custom/CustomTable";
import { CreateUserDialog } from "./components/CreateUserDialog";
import { useGetUsers, useDeleteUser } from "./hooks/useUsers";
import type { User } from "./interfaces/interfaces";
import { useState, useMemo } from "react";
import { EditUserDialog } from "./components/EditUserDialog";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { useDebounceValue } from "@/shared/hooks/useDebounceValue";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { ModalState } from "@/shared/interfaces/interfaces";

export default function Users() {
  const [modalState, setModalState] = useState<ModalState<User>>({ type: 'closed' });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (id: string) => {
    deleteUser(id);
    setModalState({ type: 'closed' });
  };

  const { data: users, isLoading } = useGetUsers({
    page: 1,
    limit: 10,
    search: debouncedSearchTerm || undefined,
  });

  const columns = useMemo<ColumnDef<User>[]>(() => [
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
              onClick={() => setModalState({ type: 'edit', el: user })}
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
              onClick={() => setModalState({ type: 'delete', el: user })}
            >
              <Trash2 size={16} />
            </IconButton>
          </Tooltip>
        </Flex>
      ),
    },
  ], []);

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
        <CreateUserDialog />
      </Flex>

      <Box bg="white" p={4} rounded="lg" shadow="sm">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <InputGroup startElement={<Search size={18} color="gray" />} width="420px">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
            />
          </InputGroup>
          <Text fontSize="sm" color="gray.600">
            {users?.meta?.total || 0} filas
          </Text>
        </Flex>

        <CustomTable
          columns={columns}
          data={users?.data || []}
          isLoading={isLoading}
          emptyMessage="No hay usuarios disponibles"
          tableSize="sm"
          limit={users?.meta?.limit || 10}
          page={users?.meta?.page || 1}
          count={users?.meta?.total || 0}
        />
      </Box>

      {modalState.type === 'edit' && (
        <EditUserDialog
          user={modalState.el}
          isOpen={true}
          onClose={() => setModalState({ type: 'closed' })}
        />
      )}
      <ConfirmDeleteDialog
        title="¿Estás seguro de eliminar este usuario?"
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
