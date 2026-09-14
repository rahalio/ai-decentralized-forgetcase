import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "dist",
  tsconfig: "./tsconfig.json",
  dts: false,
  external: [
    "undici",
    "@forgetcase/core",
    "@forgetcase/services",
    "@forgetcase/adapters",
    "@aws-sdk/client-cloudwatch",
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/client-s3",
    "@aws-sdk/lib-dynamodb",
    "@aws-sdk/s3-request-presigner",
  ],
});
