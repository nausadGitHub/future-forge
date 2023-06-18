import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
        appId: 'io.ionic.starter',
        appName: 'weChat',
        webDir: 'www',
        bundledWebRuntime: false,
        plugins: {
                SplashScreen: {
                        launchShowDuration: 500,
                        launchAutoHide: true,
                        androidScaleType: "CENTER_CROP",
                        splashImmersive: true,
                        backgroundColor: "#ffffff"
                }
        },
};

export default config;
