import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin, // nome do plugin corretamente associado
    },
    rules: {
      ...js.configs.recommended.rules,
      "prettier/prettier": "error", // aplica a regra do prettier
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "no-unused-vars": ["warn"],
      "no-console": "off",
    },
  },
]);
