export const msalConfig = {
    auth: {
        clientId: "f31558bd-3a9e-43e9-b096-9f9c47065b72",
        authority: "https://login.microsoftonline.com/a9531b3d-965b-4eb8-8c10-a8f55a606e94",
        redirectUri: process.env.VUE_APP_REDIRECT_URI,
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false, // Set to true if you are using Internet Explorer
    },
};