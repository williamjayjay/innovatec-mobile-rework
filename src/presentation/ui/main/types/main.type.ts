import { IRoute } from "@/presentation/ui/routes/types/route.type";

export namespace IMain {
    export interface Input {
        awaitSplashTimer?: number;
    }

    export interface Output {
        onLayoutRootView: () => Promise<void>;
        isLoaded: boolean | null;
        initialRoute: IRoute.Input['initialRoute']

    }
}
