module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "comma-dangle": ["warn", "always-multiline"],
    "semi": ["warn","never", { "beforeStatementContinuationChars": "never" }],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
}
