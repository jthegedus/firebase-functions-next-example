<h1 align="center">Next.js SSR app on Cloud Functions for Firebase with Firebase Hosting</h1>

<p align="center">
Host a Next.js SSR React app on Cloud Functions for Firebase with Firebase Hosting.
</p>

<p align="center">
<s>Here is the accompanying <a href="https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2">Medium Post</a></s>A new post is being written to describe the new project structure, Firebase partial deployments, Firebase support of pre/post-deploy hooks and what problems these new features solve.
</p>

<p align="center">
  <a href="https://github.com/prettier/prettier"><img alt="styled with Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" /></a>
</p>

## Why?

Host your SSR Next.js app on Cloud Functions enabling a low-cost, auto-scaling SSR app experience leveraging Firebase's sweet developer experience.

## How?

Firebase Hosting can [rewrite routes to a Cloud Function](https://firebase.google.com/docs/hosting/url-redirects-rewrites#section-rewrites) that serves our Server-side Rendered Next.js app. Using a rewrite rule that catches **ALL** routes we can then host our SSR app on our Firebase Hosting URL instead of the Firebase Cloud Function URL.

instead of:

`https://us-central1-<project-name>.cloudfunctions.net/<function-name>`

we can use:

`<project-name>.firebaseapp.com/`

[Next.js](https://github.com/zeit/next.js/) can then be used to achieve SSR React with Hot-Module Reloading, server and client-side routing, route level code-splitting, route prefetching and more!

A number of issues with Hosting SSR on Firebase were overcome with this method. Please refer to the [Medium Post](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2) before creating issues here.

## Important!

* This example uses `firebase-tools` as a devDependency which is run from the `node_modules/.bin/` folder via `yarn`. Yarn will run scripts from either the `package.json` or binary scripts from `node_modules/.bin/`. `npm run` does not check the `.bin` folder for executables, so if you use `npm` you will either have to change the scripts to explicitly run the `firebase` binary from `node_modules/.bin/` or install `firebase-tools` globally and remove it from the devDeps list. Have a look [at the Next.js repo's example](https://github.com/zeit/next.js/tree/canary/examples/with-firebase-hosting) for how I recommend using `npm`.

* Ensure you're running Node `6.11.5` as the functions emulator requires this. I recommend [asdf as a version manager](https://github.com/asdf-vm/asdf) and have add an asdf `.tool-versions` file to define the Node runtime.

* If using `_app.js` you may receive the following error on your deployed Cloud Function:

    ```
    { Error: Cannot find module '@babel/runtime/regenerator'...
    ```
    
    Despite next.js having `@babel/runtime` as a dependency, you must install it as a dependency directly in this project.

## Installation

```bash
git clone https://github.com/jthegedus/firebase-functions-next-example
cd firebase-functions-next-example
yarn install
```

## Login to Firebase CLI

This is used as a dev-dependency instead of a global install. I've found this to be a much nicer dev experience.

```bash
yarn fblogin
```

## Next.js Development

Standard Next.js development with Hot-module Reloading etc

```bash
yarn dev
```

## Local Testing

```bash
yarn serve
```

This finally works now! Note: you must have a valid Firebase project id defined in the `.firebaserc` file as the `serve` command does check that the project exists. I believe this is to do with ensuring the relative routes align with your deployed application as the `<project id>` is used in your URLs.

For those who want to dig deeper into what's actually happening here run this command:

```bash
yarn serve --debug
```

## Deploy to Firebase

You will need to connect the project to your Firebase project. Edit the name in .firebaserc or run `firebase init` and choose not to override any files.

### Deploy Hosting resources and the rewrite Cloud Function

```bash
yarn deploy-app
```

### Deploy functions not used for the SSR

Deploy all functions specified in the function group. Edit this script to add more function groups. - see [Partial deploys docs](https://firebase.google.com/docs/cli/#partial_deploys) for how to use function groups.

```bash
yarn deploy-funcs
```

### Deploy everything to Firebase

```bash
yarn deploy-all
```

## Clean `dist` Folder

```bash
yarn clean
```

## A note on Code Compatibility

Everything was tested on Ubuntu 17.04 with Bash. This should work on [Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-au/commandline/wsl/about) without any changes. If you wish for Windows native support please [submit an issue](https://github.com/jthegedus/firebase-functions-next-example/issues/new) so we can work on Windows compatibility. Please report any macOS errors as I do not have access to a device to test. [My development environment can be found here](https://github.com/jthegedus/dotfiles).
