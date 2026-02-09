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

1. Add a changeset:
```sh
pnpm changeset
```

2. Commit and merge:
```sh
git add .
git commit -m "feat(payloader): add timeout"
git push
```

3. Push -> changeset will automatically create a new PR

4. Merge the PR when you are ready to publish

### Install NPM package

1. Add reference to the registry in a `.npmrc` file
```sh
@setsetset-777:registry=https://npm.pkg.github.com
```

2. If you run your app in docker, you need a [PERSONAL ACCESS TOKEN](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with repo and package:read access to authenticate to the registry.

3. Add the authentication to the `.npmrc` file
```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

4. Add GITHUB_TOKEN to the `.env` file with the PAT value
```
GITHUB_TOKEN=ghp_xxx
```

5. Install package
```sh
pnpm add @setsetset-777/<package>
```
