import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import type { DotenvParseOutput } from "dotenv";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig((mode) => {
  console.log("当前在什么环境运行", mode.mode);

  // 拼接当前环境文件名
  const envFileName: string = ".env";
  const curEnvFileName = `${envFileName}.${mode.mode}`;

  const envConf: DotenvParseOutput = dotenv.parse(
    fs.readFileSync(curEnvFileName)
  );

  // 开发环境配置
  const curEnv: string = mode.mode;
  let server: Record<string, any> = {};
  if (curEnv === "development") {
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
      proxy: {
        [envConf.VITE_BASE_URL]: {
          target: envConf.VITE_PROXY_DOMAIN,
        },
      },
    };
  } else if (curEnv === "production") {
    // 生产环境
    server = {
      port: envConf.VITE_PORT,
      host: envConf.VITE_HOST,
    };
  }
  return {
    plugins: [vue()],
    server,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
