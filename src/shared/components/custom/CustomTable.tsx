import {
  Table,
  Skeleton,
  Pagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export interface ColumnDef<T> {
  id: string;
  header: string | ReactNode;
  accessor: keyof T;
  render?: (item: T) => ReactNode;
}

interface CustomTableProps<T> {
  tableSize?: "sm" | "md" | "lg";
  columns: ColumnDef<T>[];
  data?: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  limit: number;
  page: number;
  count: number;
  onPageChange?: (page: number) => void;
}

export const CustomTable = <T,>({
  tableSize = "sm",
  columns,
  isLoading = false,
  data = [],
  emptyMessage = "No hay datos disponibles",
  limit,
  page,
  count,
  onPageChange,
}: CustomTableProps<T>) => {
  const renderCellContent = (item: T, column: ColumnDef<T>): ReactNode => {
    if (column.render) {
      return column.render(item);
    }
    if (column.accessor) {
      const value = item[column.accessor];
      return value !== null && value !== undefined ? String(value) : "-";
    }
    return "-";
  };

  return (
    <>
      <Table.Root size={tableSize} striped interactive>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeader key={column.id} fontWeight="semibold">
                {column.header}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        {isLoading ? (
          <Table.Body>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {columns.map((column) => (
                  <Table.Cell key={column.id}>
                    <Skeleton height="20px" />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        ) : (
          <Table.Body>
            {data.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} textAlign="center">
                  {emptyMessage}
                </Table.Cell>
              </Table.Row>
            ) : (
              data.map((item, rowIndex) => (
                <Table.Row
                  key={rowIndex}
                  animation="fade-in"
                  animationDuration="0.4s"
                  style={{
                    animationDelay: `${rowIndex * 0.02}s`,
                    opacity: 0,
                    animationFillMode: "forwards"
                  }}
                >
                  {columns.map((column) => (
                    <Table.Cell key={column.id} fontSize="xs">
                      {renderCellContent(item, column)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        )}
      </Table.Root>
      <Pagination.Root
        mt="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        pageSize={limit}
        page={page}
        count={count}
        onPageChange={(e) => onPageChange?.(e.page)}
      >
        <ButtonGroup>
          <Pagination.PrevTrigger asChild>
            <IconButton size="xs" variant="outline" colorPalette="purple">
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>
          <Pagination.Items
            render={(page) => (
              <IconButton
                size="xs"
                variant={{ base: "ghost", _selected: "solid" }}
                colorPalette="purple"
                _selected={{
                  bgColor: "#6B60CE",
                  color: "white",
                }}
              >
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger asChild>
            <IconButton size="xs" variant="outline" colorPalette="purple">
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </>
  );
};
