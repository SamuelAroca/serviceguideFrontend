import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Solo las 2 reglas clasicas de hooks (validas desde siempre). El
      // preset "recommended" de la v7 de este plugin trae ademas un
      // paquete de reglas nuevas pensadas para React Compiler (que este
      // proyecto no usa) que marcan como ERROR patrones legitimos, como
      // llamar dentro de un useEffect a una función const declarada mas
      // abajo en el mismo componente (funciona por closure: el efecto
      // corre despues del render, cuando esa constante ya existe).
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
];
