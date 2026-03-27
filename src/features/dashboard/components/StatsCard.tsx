import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  trend?: string;
  trendColor?: string;
}

export const StatsCard = ({
  title,
  value,
  icon: IconComponent,
  iconColor,
  iconBg,
  trend,
  trendColor = "green.500",
}: StatsCardProps) => {
  return (
    <Box
      bg="white"
      p={6}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.200"
      shadow="sm"
      _hover={{ 
        shadow: "lg",
        transform: "translateY(-2px)",
        borderColor: "gray.300"
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
    >
      <Flex justify="space-between" align="flex-start" mb={4}>
        <Text fontSize="sm" color="gray.600" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
          {title}
        </Text>
        <Flex
          w="48px"
          h="48px"
          align="center"
          justify="center"
          borderRadius="lg"
          bg={iconBg}
          transition="transform 0.2s"
          _groupHover={{ transform: "scale(1.1)" }}
        >
          <Icon as={IconComponent} color={iconColor} boxSize={6} />
        </Flex>
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" mb={2} color="gray.800">
        {value}
      </Text>
      {trend && (
        <Text fontSize="sm" color={trendColor} fontWeight="medium">
          {trend}
        </Text>
      )}
    </Box>
  );
};
