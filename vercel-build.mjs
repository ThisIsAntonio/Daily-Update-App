// vercel-build.mjs
import { $ } from "execa";

await $`pnpm prisma generate`;
await $`pnpm build`;
