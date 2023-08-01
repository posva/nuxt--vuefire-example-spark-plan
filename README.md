# Nuxt + VueFire Template

[Nuxt](https://nuxtjs.org/) template with [VueFire](https://vuefire.vuejs.org/) to get started with [Firebase](https://firebase.google.com/) using the Free **Spark Plan**. If you are looking for the same version with SSR and Cloud Functions, check the [Blaze Plan template instead](https://github.com/posva/nuxt--vuefire-example-blaze-plan).

## Cloning

## Provisioning Firebase

Always deploy once from the CLI as it might prompt you to create some roles. Once this is done, _link the hosting site_ with the app from the _Project Settings_, _Your apps_ section.

### App Check

Once you have completed the deployment as explained above, you can optionally register App Check. You will then need to register a _reCAPTCHA v3_ provider. You can find the instructions for this in [Firebase Documentation](https://firebase.google.com/docs/app-check#web), they will tell you [to register your site for reCAPTCHA v3](https://www.google.com/recaptcha/admin/create) and to copy your _secret key_ in the firebase console. Then, you will need to copy the _site key_ in your `nuxt.config.ts` file:

```ts{8} [nuxt.config.ts]
export default defineNuxtConfig({
  // ...
  vuefire: {
    // ...
    appCheck: {
      provider: 'ReCaptchaV3',
      // site key, NOT secret key
      key: '...',
      isTokenAutoRefreshEnabled: true,
    },
  },
})
```

It's also recommended to generate a debug token now from the Firebase Console, on the Apps tab, and add it to your `.env` file:

```text
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
FIREBASE_APPCHECK_DEBUG_TOKEN=...
```

Note you will need to enforce App Check on the _APIs_ tab of the Firebase Console for each service you want to protect.

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
