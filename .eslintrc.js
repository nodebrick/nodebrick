module.exports = {
    //  as per https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
    extends: [
        "eslint:recommended",
    ],
    env: {
        "node": true,
        "es6": true,
    },
    parserOptions: {
        "ecmaVersion": 2018,
    },
    rules: {},
    overrides: [{
        extends: [
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
            "plugin:@typescript-eslint/recommended-requiring-type-checking",
        ],
        //  use the typescript parser
        parser: "@typescript-eslint/parser",
        //  which tsconfig to use, the main and per packages ones
        parserOptions: {
            "ecmaVersion": 2018,
            "project": [
                "./tsconfig.eslint.json",
            ],
            "tsconfigRootDir": __dirname,
            "sourceType": "module"
        },
        plugins: [
            //  to be able to lint typescript files
            "@typescript-eslint"
        ],
        files: ["**/*.ts"],
        rules: {
            //  DEFINED IN TYPESCRIPT ESLINT
            "brace-style": "off", // defined in eslint ts - https://eslint.org/docs/rules/brace-style#require-brace-style-brace-style
            "camelcase": "off", // defined in eslint ts
            "indent": "off", // defined in eslint ts - https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent
            "member-ordering": "off",
            "no-empty-function": "off",
            "no-extra-parens": "off",
            "no-magic-numbers": "off", // https://eslint.org/docs/rules/no-magic-numbers#disallow-magic-numbers-no-magic-numbers
            "no-unused-expressions": "off",
            "quotes": "off",
            "require-await": "off",
            "semi": "off",
            "space-before-function-paren": "off",

            //  ESLINT RULES
            "arrow-body-style": ["error", "as-needed"],
            "arrow-parens": ["error", "as-needed"], // https://eslint.org/docs/rules/arrow-parens#require-parens-in-arrow-function-arguments-arrow-parens
            "capitalized-comments": "off", // https://eslint.org/docs/rules/capitalized-comments#enforce-or-disallow-capitalization-of-the-first-letter-of-a-comment-capitalized-comments
            "complexity": "error",
            "constructor-super": "error",
            "curly": "error",
            "dot-notation": "error",
            "no-multi-str": "off", // https://eslint.org/docs/rules/no-multi-str
            "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }], // https://eslint.org/docs/rules/no-multiple-empty-lines#disallow-multiple-empty-lines-no-multiple-empty-lines
            "no-param-reassign": "off", // https://eslint.org/docs/rules/no-param-reassign
            "space-in-parens": ["error", "never"], // https://eslint.org/docs/rules/space-in-parens

            // TYPESCRIPT ESLINT RULES
            "@typescript-eslint/adjacent-overload-signatures": "error", //https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
            "@typescript-eslint/array-type": ["error", { "default": "array-simple" }], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
            "@typescript-eslint/await-thenable": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
            "@typescript-eslint/ban-ts-ignore": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-ignore.md
            "@typescript-eslint/ban-types": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
            "@typescript-eslint/brace-style": ["error", "allman"], // already set in eslint - https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
            "@typescript-eslint/consistent-type-assertions": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
            "@typescript-eslint/explicit-function-return-type": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
            "@typescript-eslint/explicit-member-accessibility": [ // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
                "error",
                {
                    "accessibility": "explicit",
                    "overrides": {
                        "accessors": "explicit",
                        "constructors": "explicit",
                        "parameterProperties": "explicit"
                    }
                }
            ],
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/func-call-spacing": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
            "@typescript-eslint/generic-type-naming": "off", // ["error", "^T[A-Z][a-zA-Z]+$"], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
            "@typescript-eslint/indent": [ // https://eslint.org/docs/rules/indent#enforce-consistent-indentation-indent
                "error",
                4,
                {
                    "SwitchCase": 1,
                    "ArrayExpression": "first",
                    "ObjectExpression": "first",
                    "FunctionDeclaration": {
                        "parameters": "first"
                    },
                    "FunctionExpression": {
                        "parameters": "first"
                    }
                }
            ],
            "@typescript-eslint/member-delimiter-style": [ // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
                "error",
                {
                    "multiline": {
                        "delimiter": "semi",
                        "requireLast": true
                    },
                    "singleline": {
                        "delimiter": "semi",
                        "requireLast": false
                    }
                }
            ],
            "@typescript-eslint/member-ordering": ["error", {
                "default": [
                    // Fields
                    'static-field', // = ['public-static-field', 'protected-static-field', 'private-static-field'])
                    'abstract-field', // = ['public-abstract-field', 'protected-abstract-field', 'private-abstract-field'])
                    'instance-field', // = ['public-instance-field', 'protected-instance-field', 'private-instance-field'])

                    // Constructors
                    'constructor', // = ['public-constructor', 'protected-constructor', 'private-constructor'])

                    // Methods
                    'static-method', // = ['public-static-method', 'protected-static-method', 'private-static-method'])
                    'abstract-method', // = ['public-abstract-method', 'protected-abstract-method', 'private-abstract-method'])
                    'instance-method', // = ['public-instance-method', 'protected-instance-method', 'private-instance-method'])
                ],
            }], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
            "@typescript-eslint/naming-convention": [
                "error",
                {
                    "selector": "class",
                    "modifiers": [],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "forbid",
                    "trailingUnderscore": "forbid"
                },
                {
                    "selector": "class",
                    "modifiers": ["abstract"],
                    "prefix": ["I"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "forbid",
                    "trailingUnderscore": "forbid"
                },
                {
                    "selector": "interface",
                    "prefix": ["I"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "forbid",
                    "trailingUnderscore": "forbid"
                },
                {
                    "selector": "memberLike",
                    "modifiers": [],
                    "format": ["camelCase"],
                    "leadingUnderscore": "require",
                },
                {
                    "selector": "memberLike",
                    "modifiers": ["public"],
                    "format": ["camelCase"],
                    "leadingUnderscore": "forbid"
                },
                {
                    "selector": "memberLike",
                    "modifiers": ["static"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "memberLike",
                    "modifiers": ["static", "public"],
                    "format": ["UPPER_CASE"],
                    "leadingUnderscore": "forbid"
                },
                {
                    "selector": "property",
                    "modifiers": ["static", "protected"],
                    "format": ["UPPER_CASE"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "property",
                    "modifiers": ["static", "private"],
                    "format": ["UPPER_CASE"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "method",
                    "modifiers": [],
                    "format": ["camelCase"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "method",
                    "modifiers": ["public"],
                    "format": ["camelCase"],
                    "leadingUnderscore": "forbid"
                },
                {
                    "selector": "method",
                    "modifiers": ["static"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "require"
                },
                {
                    "selector": "method",
                    "modifiers": ["static", "public"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "forbid"
                },
                {
                    "selector": "enum",
                    "suffix": ["Enum"],
                    "format": ["PascalCase"],
                    "leadingUnderscore": "forbid",
                    "trailingUnderscore": "forbid"
                },
                {
                    "selector": "enumMember",
                    "format": ["UPPER_CASE"]
                }
            ],
            "@typescript-eslint/no-array-constructor": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
            "@typescript-eslint/no-dynamic-delete": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
            "@typescript-eslint/no-empty-function": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
            "@typescript-eslint/no-empty-interface": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
            "@typescript-eslint/no-explicit-any": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
            "@typescript-eslint/no-extra-non-null-assertion": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
            "@typescript-eslint/no-extra-parens": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
            "@typescript-eslint/no-extraneous-class": ["error", { "allowStaticOnly": true, "allowEmpty": true }], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
            "@typescript-eslint/no-floating-promises": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
            "@typescript-eslint/no-for-in-array": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
            "@typescript-eslint/no-inferrable-types": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
            "@typescript-eslint/no-magic-numbers": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
            "@typescript-eslint/no-misused-new": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
            "@typescript-eslint/no-misused-promises": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
            "@typescript-eslint/no-namespace": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
            "@typescript-eslint/no-parameter-properties": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
            "@typescript-eslint/no-require-imports": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
            "@typescript-eslint/no-this-alias": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
            "@typescript-eslint/no-type-alias": ["error", {
                "allowAliases": "always",
                "allowMappedTypes": "always",
                "allowConstructors": "always",
                "allowCallbacks": "always",
            }], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
            "@typescript-eslint/no-unnecessary-condition": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
            "@typescript-eslint/no-unnecessary-qualifier": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
            "@typescript-eslint/no-unnecessary-type-arguments": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
            "@typescript-eslint/no-unnecessary-type-assertion": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
            "@typescript-eslint/no-unsafe-assignment": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
            "@typescript-eslint/no-unsafe-call": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
            "@typescript-eslint/no-unsafe-member-access": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
            "@typescript-eslint/no-unused-expressions": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-untyped-public-signature.md
            "@typescript-eslint/no-unused-vars-experimental": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars-experimental.md
            "@typescript-eslint/no-unused-vars": ["error", { "args": "none" }], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
            "@typescript-eslint/no-use-before-define": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
            "@typescript-eslint/no-useless-constructor": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
            "@typescript-eslint/no-var-requires": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
            "@typescript-eslint/prefer-for-of": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
            "@typescript-eslint/prefer-function-type": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
            "@typescript-eslint/prefer-includes": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
            "@typescript-eslint/prefer-namespace-keyword": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
            "@typescript-eslint/prefer-nullish-coalescing": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
            "@typescript-eslint/prefer-optional-chain": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
            "@typescript-eslint/prefer-readonly": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
            "@typescript-eslint/prefer-regexp-exec": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
            "@typescript-eslint/prefer-string-starts-ends-with": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
            "@typescript-eslint/promise-function-async": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
            "@typescript-eslint/quotes": ["error", "backtick"], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
            "@typescript-eslint/require-array-sort-compare": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
            "@typescript-eslint/require-await": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
            "@typescript-eslint/restrict-plus-operands": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
            "@typescript-eslint/restrict-template-expressions": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
            "@typescript-eslint/return-await": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
            "@typescript-eslint/semi": ["error", "always"], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
            "@typescript-eslint/space-before-function-paren": ["error", "never"], // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
            "@typescript-eslint/strict-boolean-expressions": "off", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
            "@typescript-eslint/triple-slash-reference": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
            "@typescript-eslint/type-annotation-spacing": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
            "@typescript-eslint/typedef": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
            "@typescript-eslint/unbound-method": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
            "@typescript-eslint/unified-signatures": "error", // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
        }
    }],
};