import { createRequire } from "module";
const require = createRequire(import.meta.url);

const nextPlugin = require("@next/eslint-plugin-next");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

const eslintConfig = [
  {
    ignores: [
      ".next/**/*",
      "node_modules/**/*",
      // Transient Claude Code worktrees: stale full copies of app/, components/
      // and _build-brief/. ESLint used to walk into these and report their
      // problems as if they were real source.
      ".claude/worktrees/**/*",
      // Generated Playwright output
      "playwright-report/**/*",
      "test-results/**/*",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
