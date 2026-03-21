import {
  Badge,
  Card,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Edit, Package, Tag, Trash2, Wallet } from "lucide-react";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { Product } from "../interfaces/interfaces";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const isLowStock = product.actual_stock <= product.min_stock;

  return (
    <Card.Root
      variant="elevated"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
      borderColor="#E2E8F0"
    >
      <Card.Body p="4">
        <Stack gap="3">
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Stack gap="1">
              <Text fontWeight="bold" color="gray.800">
                {product.name}
              </Text>
              <HStack gap="2">
                <Icon as={Tag} size="xs" color="gray.500" />
                <Text fontSize="xs" color="gray.600" fontWeight="medium">
                  {product.category.name}
                </Text>
              </HStack>
            </Stack>
            <Badge
              colorPalette={isLowStock ? "red" : "green"}
              variant="solid"
              size="sm"
              borderRadius="full"
              px="2"
            >
              {isLowStock ? "Stock Bajo" : "En Stock"}
            </Badge>
          </Flex>

          <Text fontSize="xs" color="gray.600" minH="40px">
            {product.description}
          </Text>

          <Flex justifyContent="space-between" alignItems="center" pt="2">
            <HStack gap="1">
              <Icon as={Wallet} size="sm" color="green.600" />
              <Text fontWeight="bold" fontSize="xl" color="green.700">
                ${Number(product.price_usd).toFixed(2)}
              </Text>
            </HStack>

            <HStack gap="2" bg="#F8EFF1" px="3" py="1" borderRadius="md">
              <Icon as={Package} size="sm" color="gray.600" />
              <Stack gap="0">
                <Text fontSize="xs" color="gray.500" lineHeight="1">
                  Stock
                </Text>
                <Text fontWeight="bold" fontSize="sm" color="gray.800">
                  {product.actual_stock} {product.measure.abbreviation}
                </Text>
              </Stack>
            </HStack>
          </Flex>
        </Stack>
      </Card.Body>

      <Card.Footer p="0" bg={isLowStock ? "red.50" : "gray.50"} borderTop="1px solid" borderColor="#E2E8F0">
        <Flex w="full" px="4" py="2" justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" color="gray.500">
            Stock Mínimo: {product.min_stock}
          </Text>
          <Flex gap="2" alignItems="center">
            {!product.is_active && (
              <Badge colorPalette="gray" variant="outline" size="xs">
                Inactivo
              </Badge>
            )}
            {onEdit && (
              <Tooltip content="Editar">
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorPalette="blue"
                  aria-label="Editar producto"
                  onClick={() => onEdit(product)}
                >
                  <Edit size={14} />
                </IconButton>
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip content="Eliminar">
                <IconButton
                  size="xs"
                  variant="ghost"
                  colorPalette="red"
                  aria-label="Eliminar producto"
                  onClick={() => onDelete(product)}
                >
                  <Trash2 size={14} />
                </IconButton>
              </Tooltip>
            )}
          </Flex>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
};