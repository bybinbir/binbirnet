import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    const siteKey = config.public.RECAPTCHA_SITE_KEY as string | undefined;

    if (!siteKey || siteKey.startsWith("6Lc...")) {
        return;
    }

    nuxtApp.vueApp.use(VueReCaptcha, {
        siteKey: siteKey,
        loaderOptions: {
            autoHideBadge: true,
        },
    });
});
