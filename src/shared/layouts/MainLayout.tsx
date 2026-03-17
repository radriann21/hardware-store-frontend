import {
  Box,
  Flex,
  Icon,
  Text,
  VStack,
  HStack,
  Heading,
  Menu,
  Button,
} from "@chakra-ui/react";
import { Outlet, NavLink as RouterNavLink } from "react-router";
import {
  BarChart3,
  Package,
  Grid3x3,
  Zap,
  Truck,
  TrendingUp,
  Users,
  LogOut,
  User,
} from "lucide-react";
import { useAuthStore } from "@/shared/stores/AuthStore";
import { ROUTES } from "@/shared/config/routes";

export const MainLayout = () => {
  return (
    <Flex minH="100vh" bgColor="mainBg">
      <Box display={{ base: "none", md: "block" }}>
        <SidebarContent />
      </Box>
      <Flex
        direction="column"
        flex="1"
        ml={{ base: 0, md: 64 }}
        transition="margin-left 0.2s ease"
      >
        <Box as="main" p={8}>
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
};

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem = ({ icon, label, isActive }: NavItemProps) => {
  return (
    <Flex
      align="center"
      px={4}
      py={3}
      borderRadius="md"
      cursor="pointer"
      transition="all 0.2s"
      bg={isActive ? "accentColor" : "transparent"}
      color={isActive ? "white" : "primaryText"}
      _hover={{
        bg: isActive ? "accentColorHover" : "gray.100",
      }}
    >
      <HStack gap={3}>
        <Icon fontSize="xl">{icon && <Box as={icon} />}</Icon>
        <Text fontSize="sm" fontWeight="medium">
          {label}
        </Text>
      </HStack>
    </Flex>
  );
};

const UserMenu = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="outline"
          width="full"
          justifyContent="flex-start"
          px={4}
          py={2}
        >
          <HStack gap={2}>
            <Icon fontSize="lg">
              <Box as={User} />
            </Icon>
            <Text fontSize="sm" fontWeight="medium" truncate>
              {user?.username || "Usuario"}
            </Text>
          </HStack>
        </Button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item
          value="logout"
          onClick={handleLogout}
          color="red.600"
          _hover={{ bg: "red.50" }}
        >
          <HStack gap={2}>
            <Icon fontSize="md">
              <Box as={LogOut} />
            </Icon>
            <Text fontSize="sm">Cerrar sesión</Text>
          </HStack>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
};

const SidebarContent = () => {
  const navItems = [
    { icon: BarChart3, label: "Dashboard", path: ROUTES.DASHBOARD },
    { icon: Package, label: "Products", path: ROUTES.PRODUCTS },
    { icon: Grid3x3, label: "Categories", path: ROUTES.CATEGORIES },
    { icon: Zap, label: "Measures", path: ROUTES.MEASURES },
    { icon: Truck, label: "Suppliers", path: ROUTES.SUPPLIERS },
    { icon: TrendingUp, label: "Stock Movement", path: ROUTES.STOCK_MOVEMENT },
    { icon: Users, label: "Users", path: ROUTES.USERS },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={64}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
    >
      <Box p={6} borderBottom="1px" borderColor="gray.200">
        <Heading
          size="2xl"
          color="accentColor"
          fontWeight="bold"
          textAlign="center"
        >
          HW
        </Heading>
      </Box>

      <VStack gap={1} p={4} flex={1} align="stretch">
        {navItems.map((item) => (
          <RouterNavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <NavItem
                icon={item.icon}
                label={item.label}
                isActive={isActive}
              />
            )}
          </RouterNavLink>
        ))}
      </VStack>

      <Box p={4} borderTop="1px" borderColor="gray.200">
        <UserMenu />
        <Text fontSize="xs" color="secondaryText" textAlign="center" mt={2}>
          Hardware Inventory v1.0
        </Text>
      </Box>
    </Box>
  );
};
