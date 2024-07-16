export namespace IMain {
    export interface Input {
        awaitSplashTimer?: number;
    }

    export interface Output {
        fontsLoaded: boolean | null;
        fontError: Error | null;
        onLayoutRootView: () => Promise<void>;

    }
}
