import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginPrettier.configs.recommended,
	{
		rules: {
			"prettier/prettier": [
				"error",
				{
					singleQuote: true,
					trailingComma: "es5",
					tabWidth: 2,
					useTabs: false,
					semi: true,
					arrowParens: "always",
				},
			],
		},
	},
];
