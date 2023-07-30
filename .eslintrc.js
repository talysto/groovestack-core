module.exports = {
    "ignorePatterns": ["dist/", "**/vendor/*.js", "*.config.*"],
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        '@typescript-eslint/no-explicit-any': 'warn',
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    },
    "settings": {
        "react": {
        //   "createClass": "createReactClass", // Regex for Component Factory to use,
        //                                      // default to "createReactClass"
        //   "pragma": "React",  // Pragma to use, default to "React"
        //   "fragment": "Fragment",  // Fragment to use (may be a property of <pragma>), default to "Fragment"
          "version": "detect", // React version. "detect" automatically picks the version you have installed.
                               // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                               // It will default to "latest" and warn if missing, and to "detect" in the future
        //   "flowVersion": "0.53" // Flow version
        }
    }
}
