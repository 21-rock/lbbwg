// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/git_repository/uzx_frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/git_repository/uzx_frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/git_repository/uzx_frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/git_repository/uzx_frontend/node_modules/unplugin-auto-import/dist/vite.js";
import path from "path";
import { envParse } from "file:///D:/git_repository/uzx_frontend/node_modules/vite-plugin-env-parse/dist/index.js";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
        console.log("error", error);
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// vite.config.ts
import { createSvgIconsPlugin } from "file:///D:/git_repository/uzx_frontend/node_modules/vite-plugin-svg-icons/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\git_repository\\uzx_frontend";
var vite_config_default = defineConfig(({ mode }) => {
  console.log("--mode--", mode);
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  console.log(111, viteEnv.VITE_BASE_API);
  return {
    plugins: [
      vue(),
      vueJsx(),
      envParse({
        dtsPath: "types/env.d.ts"
      }),
      AutoImport({
        // 可以自定义文件生成的位置，默认是根目录下，使用ts的建议放src目录下
        dts: "types/auto-imports.d.ts",
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/core"
          // '@vueuse/components'
        ],
        // 解决eslint报错问题
        eslintrc: {
          enabled: true
        }
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src"),
        comps: path.resolve(__vite_injected_original_dirname, "src/components"),
        "#": path.resolve(__vite_injected_original_dirname, "type")
      }
    },
    server: {
      host: "0.0.0.0",
      // https: true,
      port: 5173,
      cors: true,
      proxy: {
        "/api": {
          target: "http://www.huajinzhenquan.net",
          ws: true,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "/api")
          // secure: false
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0X3JlcG9zaXRvcnlcXFxcdXp4X2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRfcmVwb3NpdG9yeVxcXFx1enhfZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2dpdF9yZXBvc2l0b3J5L3V6eF9mcm9udGVuZC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IENvbmZpZ0VudiwgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuLy8gdnVlIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVxyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG4vLyBcdTc1MjhcdTRFOEVcdTg5RTNcdTY3OTBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdUZGMENcdTRGN0ZcdTVGOTdpbXBvcnQubWV0YS5lbnZcdTgwRkRcdTU5MUZcdTY3MDlcdTYzRDBcdTc5M0FcclxuaW1wb3J0IHsgZW52UGFyc2UgfSBmcm9tICd2aXRlLXBsdWdpbi1lbnYtcGFyc2UnXHJcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL2dldEVudidcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zb2xlLmxvZygnLS1tb2RlLS0nLCBtb2RlKVxyXG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KVxyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudilcclxuXHJcbiAgY29uc29sZS5sb2coMTExLCB2aXRlRW52LlZJVEVfQkFTRV9BUEkpXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICB2dWVKc3goKSxcclxuICAgICAgZW52UGFyc2Uoe1xyXG4gICAgICAgIGR0c1BhdGg6ICd0eXBlcy9lbnYuZC50cydcclxuICAgICAgfSksXHJcbiAgICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICAgIC8vIFx1NTNFRlx1NEVFNVx1ODFFQVx1NUI5QVx1NEU0OVx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1NzY4NFx1NEY0RFx1N0Y2RVx1RkYwQ1x1OUVEOFx1OEJBNFx1NjYyRlx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1RkYwQ1x1NEY3Rlx1NzUyOHRzXHU3Njg0XHU1RUZBXHU4QkFFXHU2NTNFc3JjXHU3NkVFXHU1RjU1XHU0RTBCXHJcbiAgICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxyXG4gICAgICAgIGltcG9ydHM6IFtcclxuICAgICAgICAgICd2dWUnLFxyXG4gICAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICAgJ3BpbmlhJyxcclxuICAgICAgICAgICdAdnVldXNlL2NvcmUnXHJcbiAgICAgICAgICAvLyAnQHZ1ZXVzZS9jb21wb25lbnRzJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8gXHU4OUUzXHU1MUIzZXNsaW50XHU2MkE1XHU5NTE5XHU5NUVFXHU5ODk4XHJcbiAgICAgICAgZXNsaW50cmM6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH0pLFxyXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XHJcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZncycpXSxcclxuICAgICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgICB9KVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgICBjb21wczogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICAgJyMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAndHlwZScpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogJzAuMC4wLjAnLFxyXG4gICAgICAvLyBodHRwczogdHJ1ZSxcclxuICAgICAgcG9ydDogNTE3MyxcclxuICAgICAgY29yczogdHJ1ZSxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly93d3cuaHVhamluemhlbnF1YW4ubmV0JyxcclxuICAgICAgICAgIHdzOiB0cnVlLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcvYXBpJylcclxuICAgICAgICAgIC8vIHNlY3VyZTogZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcZ2l0X3JlcG9zaXRvcnlcXFxcdXp4X2Zyb250ZW5kXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRfcmVwb3NpdG9yeVxcXFx1enhfZnJvbnRlbmRcXFxcYnVpbGRcXFxcZ2V0RW52LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRfcmVwb3NpdG9yeS91enhfZnJvbnRlbmQvYnVpbGQvZ2V0RW52LnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gIHJldHVybiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Byb2RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICByZXR1cm4gbW9kZSA9PT0gJ3Rlc3QnXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIHRvIGdlbmVyYXRlIHBhY2thZ2UgcHJldmlld1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVwb3J0TW9kZSgpOiBib29sZWFuIHtcclxuICByZXR1cm4gcHJvY2Vzcy5lbnYuVklURV9SRVBPUlQgPT09ICd0cnVlJ1xyXG59XHJcblxyXG4vLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBJbXBvcnRNZXRhRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9XHJcblxyXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xyXG4gICAgbGV0IHJlYWxOYW1lID0gZW52Q29uZltlbnZOYW1lXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJylcclxuICAgIHJlYWxOYW1lID1cclxuICAgICAgcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcclxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QT1JUJykgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUFJPWFknKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmVhbE5hbWUgPSBKU09OLnBhcnNlKHJlYWxOYW1lKVxyXG4gICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3IpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lXHJcbiAgfVxyXG4gIHJldHVybiByZXRcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB1c2VyIHJvb3QgZGlyZWN0b3J5XHJcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdFBhdGgoLi4uZGlyOiBzdHJpbmdbXSkge1xyXG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1IsU0FBb0IsY0FBYyxlQUEyQjtBQUMvVSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBRW5CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sVUFBVTtBQUVqQixTQUFTLGdCQUFnQjs7O0FDZWxCLFNBQVMsV0FBVyxTQUFvQztBQUM3RCxRQUFNLE1BQVcsQ0FBQztBQUVsQixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMxQyxRQUFJLFdBQVcsUUFBUSxPQUFPLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDcEQsZUFDRSxhQUFhLFNBQVMsT0FBTyxhQUFhLFVBQVUsUUFBUTtBQUM5RCxRQUFJLFlBQVksWUFBYSxZQUFXLE9BQU8sUUFBUTtBQUN2RCxRQUFJLFlBQVksY0FBYztBQUM1QixVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFBQSxNQUNoQyxTQUFTLE9BQVk7QUFDbkIsZ0JBQVEsSUFBSSxTQUFTLEtBQUs7QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLE9BQU8sSUFBSTtBQUFBLEVBQ2pCO0FBQ0EsU0FBTztBQUNUOzs7QUQvQkEsU0FBUyw0QkFBNEI7QUFUckMsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQTZCO0FBQy9ELFVBQVEsSUFBSSxZQUFZLElBQUk7QUFDNUIsUUFBTSxPQUFPLFFBQVEsSUFBSTtBQUN6QixRQUFNLE1BQU0sUUFBUSxNQUFNLElBQUk7QUFDOUIsUUFBTSxVQUFVLFdBQVcsR0FBRztBQUU5QixVQUFRLElBQUksS0FBSyxRQUFRLGFBQWE7QUFFdEMsU0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBLE1BQ0QsV0FBVztBQUFBO0FBQUEsUUFFVCxLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBO0FBQUEsUUFFRjtBQUFBO0FBQUEsUUFFQSxVQUFVO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QscUJBQXFCO0FBQUEsUUFDbkIsVUFBVSxDQUFDLEtBQUssUUFBUSxRQUFRLElBQUksR0FBRyxpQkFBaUIsQ0FBQztBQUFBLFFBQ3pELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsUUFDbEMsT0FBTyxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsUUFDL0MsS0FBSyxLQUFLLFFBQVEsa0NBQVcsTUFBTTtBQUFBLE1BQ3JDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBO0FBQUEsTUFFTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixJQUFJO0FBQUEsVUFDSixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLE1BQU07QUFBQTtBQUFBLFFBRWxEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K
