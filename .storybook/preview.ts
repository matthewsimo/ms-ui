import type { Preview } from "@storybook/react";
import "../src/styles.css";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "light",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
  withThemeByClassName({
    themes: {
      // nameOfTheme: 'classNameForTheme',
      light: "",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];

export default preview;
