module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
    parserOptions: {
      requireConfigFile: "false",
    },
    // babelOptions: { "configFile": "./.babelrc", }
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/prefer-default-export": "off",
    "import/extensions": ["off"],
    "vue/multi-word-component-names": 0,
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
      {
        printWidth: 120,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        bracketSpacing: true,
        arrowParens: "avoid",
        trailingComma: "all",
        singleQuote: false,
      },
    ],
  },
};
