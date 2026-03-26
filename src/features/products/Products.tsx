import {
  Box,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Edit, Search, Square, Table, Trash2 } from "lucide-react";
import {
  CustomTable,
  type ColumnDef,
} from "@/shared/components/custom/CustomTable";
import { useGetAllProducts, useDeleteProduct } from "./hooks/useProducts";
import { useMemo, useState } from "react";
import { useDebounceValue } from "@/shared/hooks/useDebounceValue";
import { ProductsOptions } from "./components/ProductsOptions";
import { CreateProductModal } from "./components/CreateProductModal";
import { Tooltip } from "@/shared/components/ui/tooltip";
import { ProductCard } from "./components/ProductCard";
import { ConfirmDeleteDialog } from "@/shared/components/custom/ConfirmDeleteDialog";
import { ImportExcelDialog } from "./components/ImportExcelDialog";
import type { ModalState } from "@/shared/interfaces/interfaces";
import type { Product } from "./interfaces/interfaces";

export default function Products() {
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<ModalState<Product>>({ type: "closed" });
  const [viewMode, setViewMode] = useState<"cards" | "table">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const debouncedSearch = useDebounceValue(searchTerm, 500);

  const { data: products, isLoading } = useGetAllProducts({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setModalState({ type: "closed" });
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: "name",
        header: "Nombre",
        accessor: "name",
      },
      {
        id: "price",
        header: "Precio USD",
        accessor: "price_usd",
      },
      {
        id: "actual_stock",
        header: "Stock Actual",
        accessor: "actual_stock",
      },
      {
        id: "min_stock",
        header: "Stock Mínimo",
        accessor: "min_stock",
      },
      {
        id: "category",
        header: "Categoría",
        accessor: "category",
        render: (products) => products.category.name,
      },
      {
        id: "actions",
        header: "Acciones",
        accessor: "id",
        render: (product) => (
          <Flex gap="2">
            <Tooltip content="Editar">
              <IconButton
                variant="outline"
                size="xs"
                colorPalette="blue"
                aria-label="Editar"
                onClick={() => {
                  setModalState({ type: "edit", el: product });
                }}
              >
                <Edit size={14} />
              </IconButton>
            </Tooltip>
            <Tooltip content="Eliminar">
              <IconButton
                variant="outline"
                size="xs"
                colorPalette="red"
                aria-label="Eliminar"
                onClick={() => {
                  setModalState({ type: "delete", el: product });
                }}
              >
                <Trash2 size={14} />
              </IconButton>
            </Tooltip>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Flex as="section" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading size="2xl">Productos</Heading>
          <Text fontSize="lg">Controla los productos de tu negocio.</Text>
        </Box>
        <ProductsOptions 
          onAddProduct={() => setModalState({ type: "create" })} 
          onImportExcel={() => setIsImportDialogOpen(true)}
        />
      </Flex>
      <Flex my="20px" gapX="20px" alignItems="center" w="100%">
        <InputGroup
          flex="1"
          startElement={<Search size={16} />}
        >
          <Input
            bgColor="white"
            shadow="sm"
            rounded="md"
            placeholder="Buscar..."
            fontSize="sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <ButtonGroup gapX="0">
          <Tooltip content="Cards">
            <IconButton
              onClick={() => setViewMode("cards")}
              colorPalette="purple"
              rounded="none"
              variant="outline"
            >
              <Square />
            </IconButton>
          </Tooltip>
          <Tooltip content="Tabla">
            <IconButton
              onClick={() => setViewMode("table")}
              colorPalette="purple"
              rounded="none"
              variant="outline"
            >
              <Table />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Flex>

      {isLoading ? (
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Spinner size="lg" mx="auto" my="20px" />
        </Flex>
      ) : (
        <>
          {viewMode === "cards" ? (
            <Grid templateColumns="repeat(4, 1fr)" gap="20px">
              {products?.data.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={(product) => {
                    setModalState({ type: "edit", el: product });
                  }}
                  onDelete={(product) => {
                    setModalState({ type: "delete", el: product });
                  }}
                />
              ))}
            </Grid>
          ) : (
            <CustomTable
              columns={columns}
              data={products?.data || []}
              limit={products?.meta.limit || 10}
              page={products?.meta.page || 1}
              count={products?.meta.total || 0}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      )}
      <CreateProductModal
        isOpen={modalState.type === "create" || modalState.type === "edit"}
        onOpenChange={() => {
          setModalState({ type: "closed" });
        }}
        productToEdit={modalState.type === "edit" ? (modalState.el as Product) : null}
      />
      <ConfirmDeleteDialog
        isOpen={modalState.type === "delete"}
        onOpenChange={() => setModalState({ type: "closed" })}
        title="¿Estás seguro de eliminar este producto?"
        descripcion="Esta acción no se puede deshacer."
        handleDelete={() => {
          if (modalState.type === "delete" && modalState.el) {
            handleDelete(modalState.el.id);
            setModalState({ type: "closed" });
          }
        }}
      />
      <ImportExcelDialog
        isOpen={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      />
    </>
  );
}
