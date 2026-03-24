import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Plus, Search } from "lucide-react";
import { useGetMovements } from "./hooks/useMovements";
import { useMemo, useState } from "react";
import { CustomTable } from "@/shared/components/custom/CustomTable";
import { usePagination } from "@/shared/hooks/usePagination";
import { useDebounceValue } from "@/shared/hooks/useDebounceValue";
import { MovementDialog } from "./components/MovementDialog";
import type { ModalState } from "@/shared/interfaces/interfaces";
import type { ColumnDef } from "@/shared/components/custom/CustomTable";
import type { Movement, MovementType } from "./interfaces/interfaces";

const movementTypeLabels: Record<MovementType, string> = {
  ENTRY: "Entrada",
  EXIT: "Salida",
  ADJUSTMENT: "Ajuste",
};

export default function Movements() {
  const [modalState, setModalState] = useState<ModalState<Movement>>({ type: "closed" });
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounceValue(search, 500);
  const { page, setPage } = usePagination();
  const { data: movements, isLoading } = useGetMovements({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        id: "id",
        header: "ID",
        accessor: "id",
      },
      {
        id: "product",
        header: "Producto",
        accessor: "product",
        render: (row) => row.product.name,
      },
      {
        id: "user",
        header: "Usuario",
        accessor: "user",
        render: (row) => row.user.name,
      },
      {
        id: "quantity",
        header: "Cantidad",
        accessor: "quantity",
      },
      {
        id: "type",
        header: "Tipo",
        accessor: "type",
        render: (row: Movement) => movementTypeLabels[row.type as MovementType],
      },
      {
        id: "created_at",
        header: "Fecha",
        accessor: "created_at",
        render: (row) =>
          new Date(row.created_at).toLocaleDateString("es-VE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
      },
    ],
    [],
  );

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Movimientos</Heading>
          <Text fontSize="lg">Controla los movimientos de tu negocio.</Text>
        </Box>
        <Button
          disabled={isLoading}
          bgColor="#6B60CE"
          color="white"
          size="sm"
          fontWeight="semibold"
          onClick={() => setModalState({ type: "create" })}
          _hover={{
            bgColor: "#5a4fb8",
          }}
        >
          Registrar Movimiento
          <Plus size={16} />
        </Button>
      </Flex>

      <Flex my="20px" as="section" alignItems="center" gapX="10px">
        <InputGroup startElement={<Search size={16} />}>
          <Input
            bgColor="white"
            rounded="md"
            shadow="sm"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>

      {
        isLoading && (
          <Flex alignItems="center" justifyContent="center" my="20px">
            <Spinner />
          </Flex>
        )
      }

      <CustomTable
        columns={columns}
        data={movements?.data || []}
        isLoading={isLoading}
        limit={movements?.meta.limit || 10}
        page={movements?.meta.page || 1}
        count={movements?.meta.total || 0}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <MovementDialog
        isOpen={modalState.type === "create"}
        onClose={() => setModalState({ type: "closed" })}
      />
    </>
  );
}
