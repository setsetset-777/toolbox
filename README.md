# Toolbox

A set of reusable tools in the setsetset organization.

## Packages

A pnpm workspace for @setsetset-777 shared npm modules.

### Package setup
Each package should have:
`package.json`
```json
{
  "name": "@your-org/logger",
  "version": "0.0.0",
  "private": false,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc"
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```
`tsconfig.json`
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  },
  "include": ["src"]
}
```
Example `src/index.ts`
```json
export default {
  info: console.log,
  warn: console.warn,
  error: console.error,
};
```

### Versioning with Changesets

Install and initialize Changesets:
```sh
pnpm add -D @changesets/cli
pnpm changeset init
```

Add a changeset for any package change:
```sh
pnpm changeset
```
- Select affected package(s)
- Choose patch, minor, or major

- Provide a short description

Apply version bumps:
```sh
pnpm version
```

### Day-to-Day Workflow

1. Create a branch for your feature/fix:
```sh
git checkout -b feat/payloader-timeout
```

2. Add a changeset:
```sh
pnpm changeset
```

3. Commit and merge:
```sh
git commit -am "feat(payloader): add timeout"
git push
```

4. Merge to main → GitHub Action publishes automatically.
