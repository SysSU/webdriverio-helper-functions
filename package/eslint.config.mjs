import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        "$": "true",
      }
    },

    rules: {
      "@typescript-eslint/no-explicit-any": "warn"
    },

  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: {
        ...globals.jasmine,
      }
    }
  },

];