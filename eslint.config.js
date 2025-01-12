import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // 경고 수준 (필요시 'off' 또는 'error'로 변경 가능)
        {
          argsIgnorePattern: "^_", // _로 시작하는 매개변수 무시
          varsIgnorePattern: "^_", // _로 시작하는 변수 무시
        },
      ],
      "typescript-eslint/no-explicit-any": [
        "warn", // 경고 수준 (필요시 'off' 또는 'error'로 변경 가능)
      ],
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
