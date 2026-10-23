import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const exportDirectory = path.resolve("out");

for (const directory of ["books", "content"]) {
    const target = path.join(exportDirectory, directory);
    if (!target.startsWith(`${exportDirectory}${path.sep}`)) {
        throw new Error(`Refusing to remove a path outside the static export: ${target}`);
    }

    await rm(target, { recursive: true, force: true });
}

console.log("Removed build-only EPUB and content data from the static export.");

// GitHub Pages serves this project below /hola-lector-agua/. Next.js applies
// basePath to its own routes and chunks, but public/ URLs written as /assets/ do
// not get rewritten automatically. Prefix those URLs in the exported files.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (basePath) {
    const textExtensions = new Set([".html", ".js", ".css", ".json"]);

    async function prefixPublicAssetUrls(directory) {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
            const target = path.join(directory, entry.name);
            if (entry.isDirectory()) {
                await prefixPublicAssetUrls(target);
                continue;
            }
            if (!textExtensions.has(path.extname(entry.name))) continue;

            let contents = await readFile(target, "utf8");
            for (const assetRoot of ["/assets/", "/images/books/"]) {
                let offset = 0;
                while ((offset = contents.indexOf(assetRoot, offset)) !== -1) {
                    if (contents.slice(Math.max(0, offset - basePath.length), offset) !== basePath) {
                        contents = `${contents.slice(0, offset)}${basePath}${contents.slice(offset)}`;
                        offset += basePath.length;
                    }
                    offset += assetRoot.length;
                }
            }
            await writeFile(target, contents);
        }
    }

    await prefixPublicAssetUrls(exportDirectory);
}

// Prevent GitHub Pages' Jekyll processor from dropping Next's _next directory.
await writeFile(path.join(exportDirectory, ".nojekyll"), "");
