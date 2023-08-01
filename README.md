# Nuxt + VueFire Template

[Nuxt](https://nuxtjs.org/) template with [VueFire](https://vuefire.vuejs.org/) to get started with Firebase using the Free Spark Plan.

## Cloning

Always deploy once from the CLI as it might prompt you to create some roles.

## Development Server

If you added support for emulators, you will need to start them before starting the Nuxt development server.

You need `firebase-tools` installed globally or locally first

```bash
npm install -g firebase-tools
```

Then login to your Firebase account with `firebase login`.

Now you can start the emulators with `npm run emulators` or `firebase emulators:start`. Then start the server with `npm run dev`.

### Debugging

You can activate VueFire logs with:

```bash
CONSOLA_LEVEL=5 npm run dev
```

## Building for Production

### Previewing Locally

### Deploying to Firebase

### Automatic Deployments on GitHub
