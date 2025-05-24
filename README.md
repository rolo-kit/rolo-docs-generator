# Rolo Generate Docs Utility

This utility automates the process of generating documentation markdown files for each CLI command in the Rolo project.

## How It Works
- Reads configuration from `rolo-docs-gen.config.json`.
- For each subdirectory in the source commands directory, if a `README.md` exists, it copies it to the docs directory as `<command>.md`.
- The output filenames and source filenames are configurable via the config file.

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure** `rolo-docs-gen.config.json`:
   ```json
   {
     "docsDirectory": "/absolute/path/to/rolo-docs/docs/",
     "sourceDirectory": "/absolute/path/to/rolo/packages/cli/commands/",
     "sourceFile": "README.md",
     "outputExtension": ".md"
   }
   ```
   - `docsDirectory`: Where generated docs will be placed.
   - `sourceDirectory`: Where command subdirectories are located.
   - `sourceFile`: The filename to look for in each command directory (default: `README.md`).
   - `outputExtension`: The extension for generated docs (default: `.md`).

3. **Run the generator:**
   ```sh
   npm start
   # or
   node index.js
   ```

## Example
If you have a command `init` with a `README.md` in your commands directory, it will be copied to your docs directory as `init.md`.

---

Feel free to modify or extend this utility for your documentation workflow!
