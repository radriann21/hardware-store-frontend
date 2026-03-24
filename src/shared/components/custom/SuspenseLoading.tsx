import { Box, Spinner } from "@chakra-ui/react"

export const SuspenseLoading = () => {
  return (
    <Box
      as="main"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Spinner size="lg" colorPalette="purple" />
    </Box>
  )
}