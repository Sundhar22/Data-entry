import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",

      "react-hooks/exhaustive-deps": "off",

      "no-console": "off",
      "prefer-const": "off",
      curly: "off",
      "eslint-comments/no-unused-disable": "off",
    },
  },
]);
