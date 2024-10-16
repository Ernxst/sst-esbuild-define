/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-esbuild-define",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },
  async run() {
    const mailer = new sst.cloudflare.Worker("Mailer", {
      handler: "packages/functions/worker.tsx",
      url: true,
      build: {
        esbuild: {
          define: {
            "process.env.NODE_ENV": "'production'"
          }
        }
      },
    });

    const web = new sst.cloudflare.StaticSite("Web", {
      path: "packages/web",
      build: { output: ".", command: 'echo "Built!"' },
    })

    return {
      mailer: mailer.url,
      web: web.url,
    };
  },
});
