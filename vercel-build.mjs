// vercel-build.mjs
import { execSync } from "node:child_process";

execSync("pnpm prisma generate", { stdio: "inherit" });
execSync("pnpm build", { stdio: "inherit" });
