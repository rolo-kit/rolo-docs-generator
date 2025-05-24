import fs from 'fs-extra';
import path from 'path';

/**
 * For each subdirectory in commandsDir, if a README.md exists, copy it to docsDir as <command>.md
 */
async function generateDocs(commandsDir, docsDir, sourceFile = 'README.md', outputExtension = '.md') {
  const commandDirs = await fs.readdir(commandsDir);
  for (const dir of commandDirs) {
    const commandPath = path.join(commandsDir, dir);
    const stat = await fs.stat(commandPath);
    if (stat.isDirectory()) {
      const readmePath = path.join(commandPath, sourceFile);
      if (await fs.pathExists(readmePath)) {
        const destPath = path.join(docsDir, `${dir}${outputExtension}`);
        await fs.copy(readmePath, destPath);
        console.log(`Copied ${readmePath} -> ${destPath}`);
      }
    }
  }
}

// Read config and call generateDocs
async function main() {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const configPath = path.join(__dirname, 'rolo-docs-gen.config.json');
  const config = await fs.readJson(configPath);
  const commandsDir = config.sourceDirectory;
  const docsDir = config.docsDirectory;
  const sourceFile = config.sourceFile || 'README.md';
  const outputExtension = config.outputExtension || '.md';
  await generateDocs(commandsDir, docsDir, sourceFile, outputExtension);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
