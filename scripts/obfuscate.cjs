// Obfuscates the ncc bundle so the published action isn't readable source.
const fs = require("fs");
const JavaScriptObfuscator = require("javascript-obfuscator");

const input = fs.readFileSync("build-tmp/index.js", "utf8");
const out = JavaScriptObfuscator.obfuscate(input, {
  target: "node",
  compact: true,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  stringArray: true,
  stringArrayThreshold: 1,
  stringArrayEncoding: ["base64"],
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersType: "function",
  splitStrings: true,
  splitStringsChunkLength: 8,
  transformObjectKeys: true,
  numbersToExpressions: true,
  simplify: true,
  // Off: these slow the scan down a lot for little extra protection.
  controlFlowFlattening: false,
  deadCodeInjection: false,
  selfDefending: false,
  debugProtection: false,
  unicodeEscapeSequence: false,
}).getObfuscatedCode();

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.js", out);
fs.rmSync("build-tmp", { recursive: true, force: true });
console.log(`dist/index.js: ${(out.length / 1024).toFixed(0)} KB`);
