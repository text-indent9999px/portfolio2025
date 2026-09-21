// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16은 flat config 배열을 직접 내보낸다(FlatCompat 불필요).
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  ...storybook.configs["flat/recommended"],
  {
    ignores: [".next/**", "storybook-static/**", "public/code/**", "local-data/**"],
  },
];

export default eslintConfig;
