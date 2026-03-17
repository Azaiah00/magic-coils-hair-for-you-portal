import { readFileSync } from "node:fs";

const runId = process.env.NETLIFY ? "netlify-build" : "local-build";
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));
const lockNextVersion =
  lock?.packages?.["node_modules/next"]?.version ?? lock?.dependencies?.next?.version ?? null;
const lockEslintNextVersion =
  lock?.packages?.["node_modules/eslint-config-next"]?.version ??
  lock?.dependencies?.["eslint-config-next"]?.version ??
  null;

// #region agent log
fetch("http://127.0.0.1:7543/ingest/16c75c26-59a4-4616-96a0-5d5b149b80d5",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"1fddd6"},body:JSON.stringify({sessionId:"1fddd6",runId,hypothesisId:"H1",location:"scripts/netlify-debug.mjs:14",message:"package.json dependency versions",data:{next:pkg?.dependencies?.next??null,eslintConfigNext:pkg?.devDependencies?.["eslint-config-next"]??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion

// #region agent log
fetch("http://127.0.0.1:7543/ingest/16c75c26-59a4-4616-96a0-5d5b149b80d5",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"1fddd6"},body:JSON.stringify({sessionId:"1fddd6",runId,hypothesisId:"H2",location:"scripts/netlify-debug.mjs:18",message:"lockfile resolved versions",data:{next:lockNextVersion,eslintConfigNext:lockEslintNextVersion,lockfileVersion:lock?.lockfileVersion??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion

// #region agent log
fetch("http://127.0.0.1:7543/ingest/16c75c26-59a4-4616-96a0-5d5b149b80d5",{method:"POST",headers:{"Content-Type":"application/json","X-Debug-Session-Id":"1fddd6"},body:JSON.stringify({sessionId:"1fddd6",runId,hypothesisId:"H3",location:"scripts/netlify-debug.mjs:22",message:"build environment snapshot",data:{node:process.version,netlify:Boolean(process.env.NETLIFY),ci:Boolean(process.env.CI),npmLifecycle:process.env.npm_lifecycle_event??null},timestamp:Date.now()})}).catch(()=>{});
// #endregion
