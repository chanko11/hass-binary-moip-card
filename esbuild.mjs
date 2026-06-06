import { build } from "esbuild";

const dev = process.argv.includes("--watch");
const opts = {
  entryPoints: ["src/binary-moip-source-card.ts"],
  bundle: true,
  format: "esm",
  target: "es2021",
  outfile: "dist/binary-moip-source-card.js",
  minify: !dev,
  sourcemap: dev,
  legalComments: "none",
};

if (dev) {
  const ctx = await (await import("esbuild")).context(opts);
  await ctx.watch();
  console.log("watching…");
} else {
  await build(opts);
  console.log("built dist/binary-moip-source-card.js");
}
