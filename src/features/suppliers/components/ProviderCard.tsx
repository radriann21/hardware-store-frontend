import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Pencil, Mail, Phone, MapPin, Copy } from "lucide-react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { EditProviderDialog } from "./EditProviderDialog";
import type { Provider } from "@/features/suppliers/interfaces/interfaces";
import { useState } from "react";

export const ProviderCard = (provider: Provider) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

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
        _hover={{
          shadow: "md",
        }}
      >
        <Flex justifyContent="space-between" alignItems="flex-start" mb={4}>
          <Box>
            <Heading as="h3" fontSize="lg" color="gray.900" fontWeight="semibold">
              {provider.name}
            </Heading>
            <Text color="gray.500" fontSize="sm" mt={1}>
              Contact: {provider.contact_name}
            </Text>
          </Box>
          <Button
            size="xs"
            variant="ghost"
            colorPalette="blue"
            aria-label="Copy"
          >
            <Copy size={14} />
          </Button>
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

        <Flex w="full" gap={2} borderTop="1px solid" borderColor="gray.200" pt={4}>
          <Button
            flex={1}
            size="sm"
            fontWeight="normal"
            colorPalette="green"
            variant="outline"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil size={14} />
            Edit
          </Button>
          <ConfirmDeleteDialog id={provider.id} />
        </Flex>
      </Box>
      <EditProviderDialog 
        provider={provider} 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
      />
    </>
  );
};
