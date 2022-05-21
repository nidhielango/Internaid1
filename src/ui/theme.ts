// 1. Import `extendTheme`
import '@fontsource/raleway/300.css';
import '@fontsource/raleway/500.css';
import '@fontsource/raleway/800.css';
import { extendTheme } from "@chakra-ui/react"
import { Button } from './button';

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#000000", // black color 
    },
  },
  fonts: {
      body: "Raleway, sans-serif",
  }, 
  styles: {
      global: () => ({
          body: {
              bg: 'gray.600', // dark gray for background
          }
      })
  },
  components: {
    Button,
  }
})

