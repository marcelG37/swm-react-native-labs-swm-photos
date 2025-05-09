import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";

import { CachedPhotosProvider } from "@/providers/CachedPhotosProvider";
import { GalleryUISettingsProvider } from "@/providers/GalleryUISettingsProvider";
import { MediaLibraryPhotosProvider } from "@/providers/MediaLibraryPhotosProvider";
import "@/utils/logger";
import { LAUNCH_GALLERY_ON_START } from "@/config/constants";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

export default function RootLayout() {
  // Hide the splash screen after 200ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GalleryUISettingsProvider>
      <MediaLibraryPhotosProvider>
        <CachedPhotosProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: LAUNCH_GALLERY_ON_START ? "none" : "default",
              animationDuration: LAUNCH_GALLERY_ON_START ? 0 : 500,
            }}
          />
        </CachedPhotosProvider>
      </MediaLibraryPhotosProvider>
    </GalleryUISettingsProvider>
  );
}
