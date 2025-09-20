/**
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-tailwindcss']
};

export default prettierConfig;
