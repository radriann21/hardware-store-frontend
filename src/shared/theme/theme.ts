import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        mainBg: { value: "#F4EFF0" },
        primaryText: { value: "#000000" },
        secondaryText: { value: "#817f7f" },
        accentColor: { value: "#796FD2" },
        accentColorHover: { value: "#6a60b8" }
      }
    }
  }
})

export const system = createSystem(defaultConfig, theme);