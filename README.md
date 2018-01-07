# Next.js SSR app on Cloud Functions for Firebase with Firebase Hosting

Host a Next.js SSR React app on Cloud Functions for Firebase with Firebase Hosting.

~~Here is the accompanying [Medium Post](https://medium.com/@jthegedus/next-js-on-cloud-functions-for-firebase-with-firebase-hosting-7911465298f2)~~ A new post is being written to describe the new project structure, Firebase partial deployments, Firebase support of pre/post-deploy hooks and what problems these new features solve.

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

Unfortunately I have been unable to get any combination of

```bash
firebase serve --only functions,hosting
```

to work as expected. [This issue is where solutions are being explored](https://github.com/firebase/firebase-tools/issues/535) and they will be shared here and on the [Next.js repo's similar issue](https://github.com/zeit/next.js/issues/3167) when discovered.

In the meantime you'll just have to do a full deployment and test online. The new project structure of v2.0.0 and partial deployments reduces the deployment time significantly so this is not too bad. I'm continually looking into a solution to this.

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
