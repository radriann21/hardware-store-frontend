import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { Pencil, Mail, Phone, MapPin, Trash2 } from "lucide-react";
import { Tooltip } from "@/shared/components/ui/tooltip";
import type { Provider } from "@/features/suppliers/interfaces/interfaces";

interface ProviderCardProps {
  index: number;
  provider: Provider;
  onEdit?: (provider: Provider) => void;
  onDelete?: (provider: Provider) => void;
}

export const ProviderCard = ({
  index,
  provider,
  onEdit,
  onDelete,
}: ProviderCardProps) => {
  return (
    <>
      <Box
        as="article"
        p={6}
        rounded="lg"
        bg="white"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        animation="fade-in"
        animationDuration="0.4s"
        style={{
          animationDelay: `${index * 0.03}s`,
          opacity: 0,
          animationFillMode: "forwards",
        }}
        _hover={{
          shadow: "md",
        }}
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box>
            <Heading
              as="h3"
              fontSize="lg"
              color="gray.900"
              fontWeight="semibold"
            >
              {provider.name}
            </Heading>
            <Text color="gray.500" fontSize="sm" mt={1}>
              Contact: {provider.contact_name}
            </Text>
          </Box>
        </Flex>

        <Flex direction="column" gap={2} mb={4}>
          <HStack gap={2} color="gray.600" fontSize="sm">
            <Icon fontSize="md" color="blue.500">
              <Mail size={16} />
            </Icon>
            <Text>{provider.contact_name}</Text>
          </HStack>

          <HStack gap={2} color="gray.600" fontSize="sm">
            <Icon fontSize="md" color="blue.500">
              <Phone size={16} />
            </Icon>
            <Text>{provider.phone_number}</Text>
          </HStack>

          {provider.address && (
            <HStack gap={2} color="gray.600" fontSize="sm">
              <Icon fontSize="md" color="blue.500">
                <MapPin size={16} />
              </Icon>
              <Text>{provider.address}</Text>
            </HStack>
          )}
        </Flex>

        <Flex
          w="full"
          gap={2}
          borderTop="1px solid"
          borderColor="gray.200"
          pt={4}
        >
          {onEdit && (
            <Button
              flex={1}
              size="sm"
              fontWeight="normal"
              colorPalette="green"
              variant="outline"
              onClick={() => onEdit(provider)}
            >
              <Pencil size={14} />
              Editar
            </Button>
          )}
          {onDelete && (
            <Tooltip content="Eliminar">
              <IconButton
                size="sm"
                variant="ghost"
                colorPalette="red"
                aria-label="Eliminar proveedor"
                onClick={() => onDelete(provider)}
              >
                <Trash2 size={14} />
              </IconButton>
            </Tooltip>
          )}
        </Flex>
      </Box>
    </>
  );
};
