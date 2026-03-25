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
  IconButton,
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/shared/stores/AuthStore";
import { ROUTES } from "@/shared/config/routes";

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Flex minH="100vh" bgColor="mainBg">
      <Box display={{ base: "none", md: "block" }}>
        <SidebarContent
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      </Box>
      <Flex
        direction="column"
        flex="1"
        ml={{ base: 0, md: isCollapsed ? 20 : 64 }}
        transition="margin-left 0.3s ease"
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
  isCollapsed: boolean;
}

const NavItem = ({ icon, label, isActive, isCollapsed }: NavItemProps) => {
  return (
    <Flex
      align="center"
      justify={isCollapsed ? "center" : "flex-start"}
      px={isCollapsed ? 2 : 4}
      py={3}
      borderRadius="md"
      cursor="pointer"
      transition="all 0.3s ease"
      bg={isActive ? "accentColor" : "transparent"}
      color={isActive ? "white" : "primaryText"}
      _hover={{
        bg: isActive ? "accentColorHover" : "purple.100",
      }}
      position="relative"
    >
      <Icon fontSize="xl">{icon && <Box as={icon} />}</Icon>
      {!isCollapsed && (
        <Text
          fontSize="sm"
          fontWeight="medium"
          ml={3}
          opacity={isCollapsed ? 0 : 1}
          transition="opacity 0.2s ease"
        >
          {label}
        </Text>
      )}
    </Flex>
  );
};

interface UserMenuProps {
  isCollapsed: boolean;
}

const UserMenu = ({ isCollapsed }: UserMenuProps) => {
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
          justifyContent={isCollapsed ? "center" : "flex-start"}
          px={isCollapsed ? 2 : 4}
          py={2}
        >
          {isCollapsed ? (
            <Icon fontSize="lg">
              <Box as={User} />
            </Icon>
          ) : (
            <HStack gap={2}>
              <Icon fontSize="lg">
                <Box as={User} />
              </Icon>
              <Text fontSize="sm" fontWeight="medium" truncate>
                {user?.username || "Usuario"}
              </Text>
            </HStack>
          )}
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

interface SidebarContentProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const SidebarContent = ({ isCollapsed, onToggle }: SidebarContentProps) => {
  const navItems = [
    { icon: BarChart3, label: "Dashboard", path: ROUTES.DASHBOARD },
    { icon: Package, label: "Productos", path: ROUTES.PRODUCTS },
    { icon: Grid3x3, label: "Categorías", path: ROUTES.CATEGORIES },
    { icon: Zap, label: "Medidas", path: ROUTES.MEASURES },
    { icon: Truck, label: "Proveedores", path: ROUTES.SUPPLIERS },
    { icon: TrendingUp, label: "Movimientos", path: ROUTES.STOCK_MOVEMENT },
    { icon: Users, label: "Usuarios", path: ROUTES.USERS },
  ];

  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={isCollapsed ? 20 : 64}
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      transition="width 0.3s ease"
    >
      <Box p={6} borderBottom="1px" borderColor="gray.200" position="relative">
        <Heading
          size="2xl"
          color="accentColor"
          fontWeight="bold"
          textAlign="center"
        >
          HW
        </Heading>
        <IconButton
          position="absolute"
          right={-5}
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="solid"
          bgColor="white"
          border="1px"
          borderColor="gray.200"
          shadow="md"
          onClick={onToggle}
          aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
          _hover={{
            bgColor: "purple.100",
          }}
          zIndex={10}
          rounded="full"
        >
          {isCollapsed ? (
            <ChevronRight color="purple" size={16} />
          ) : (
            <ChevronLeft color="purple" size={16} />
          )}
        </IconButton>
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
                isCollapsed={isCollapsed}
              />
            )}
          </RouterNavLink>
        ))}
      </VStack>

      <Box p={4} borderTop="1px" borderColor="gray.200">
        <UserMenu isCollapsed={isCollapsed} />
        {!isCollapsed && (
          <Text fontSize="xs" color="secondaryText" textAlign="center" mt={2}>
            Hardware Inventory v1.0
          </Text>
        )}
      </Box>
    </Box>
  );
};
