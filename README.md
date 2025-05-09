# Software Mansion React Native Labs - SWM Photos

<div align="center">
  <img src="./assets/demos/episode-1-demo.gif" width="600" />
</div>

## A React Native demo project replicating images gallery app behavior known from [Apple Photos](https://apps.apple.com/us/app/photos/id1584215428) or [Google Photos](https://play.google.com/store/apps/details?id=com.google.android.apps.photos&pli=1)

This repository is given to you in chapters, each chapter being hosted on a different branch:

1. [SWM React Native Labs #1: image list in minutes](https://github.com/software-mansion-labs/swm-react-native-labs-swm-photos/tree/episode-1)

## Project structure

<pre>
.
├── <a href="./scripts">scripts/</a> # utility scripts for the project
├── <a href="./assets">assets/</a> # static assets used in the app (images and fonts)

├── <a href="./src">src/</a> # mobile application source code
│   ├── <a href="./src/app">app/</a> # app routing
│   │   ├── <a href="./src/app/settings.tsx">settings.tsx</a> # App settings screen
│   │   ├── <a href="./src/app/photos-gallery.tsx">photos-gallery.tsx</a> # Main photos gallery view
│   │   └── <a href="./src/app/list-scenarios">list-scenarios/</a> # Various list implementation demos
│   ├── <a href="./src/components">components/</a> # reusable components
│   ├── <a href="./src/hooks">hooks/</a>
│   │   └── <a href="./src/hooks/usePersistedState.ts">usePersistedState</a> # A hook that persists state to disk and restores it on mount, used for saving user preferences and app state

│   ├── <a href="./src/providers">providers/</a> # app-wide state and data providers
│   │   ├── <a href="./src/providers/MediaLibraryPhotosProvider">MediaLibraryPhotosProvider</a> # Loads and manages access to the device's photo library, including permissions and photo data
│   │   ├── <a href="./src/providers/CachedPhotosProvider">CachedPhotosProvider</a> # Handles optimized (cached/resized) versions of photos for fast gallery rendering and efficient memory usage
│   │   └── <a href="./src/providers/GalleryUISettingsProvider">GalleryUISettingsProvider</a> # Manages gallery UI settings such as number of columns, image size, gaps, and offscreen rendering distance, persisting user preferences
</pre>

## Running the project

1. Check out the episode branch you want to focus on
2. Install dependencies using `bun install`
3. **Set up your unique bundle identifier** (required for iOS builds):
   - Copy `.env.example` to `.env`
   - Update `EXPO_BUNDLE_IDENTIFIER` with your unique identifier (e.g., `com.swmansion.photos.<SOME_SUFFIX>`)
4. Run the project using `bun android`, `bun ios`
   - This command builds the `Release` version of the app.
5. (Optional) reconfigure the app to launch only the Photos gallery screen by tweaking `EXPO_PUBLIC_LAUNCH_GALLERY_ON_START` env variable.
6. (Optional) seed the device with images, see [Photos seed](#photos-seed) section

## Performance measurements

We've tested the performance using the following preset:

1. Using [`Release`](https://docs.expo.dev/guides/local-app-development/#local-app-compilation) version of the app ([React Native docs recommendation](https://reactnative.dev/docs/performance#running-in-development-mode-devtrue))
2. Set of testing devices
   1. Android Google Pixel 4a
   2. Android Google Pixel 9
   3. iPhone 13 mini
   4. iPhone 16 plus
3. Device orchestration
   1. on Android we use [./scrips/android-adb-orchestration](./scrits/android-adb-orchestration)
   2. on iOS we use manual gestures (there's no known way to automate this)
4. Some measurements were done via JS by storing some timestamps and calculating the average time between several runs of the same procedure.

### iOS Performance profiling

1. Build and run the app on iOS in the Release mode (`bun ios`).
2. In `Xcode` open [`Instruments`](https://developer.apple.com/tutorials/instruments)
3. We've used following ones:
   - `Allocations` - for memory measurements
   - `Time Profiler` - for CPU measurements

### Android Performance profiling

1. Build and run the app on Android in the Release mode (`bun android`).
2. In `Android Studio` open [`Profiler`](https://developer.android.com/studio/profile).
3. We've used following ones:
   - `View Live Telemetry` - for memory and CPU measurements.

## Photos seed

Images we use to demonstrate the application are fetched from [Unsplash](https://unsplash.com/).
Several images are available in the repository and could be treated a seed for a photos gallery:

- https://unsplash.com/photos/foggy-mountain-summit-1Z2niiBPg5A
- https://unsplash.com/photos/gray-concrete-bridge-and-waterfalls-during-daytime-cssvEZacHvQ
- https://unsplash.com/photos/aerial-photo-of-seashore-sLAk1guBG90
- https://unsplash.com/photos/ocean-wave-at-beach-GyDktTa0Nmw
- https://unsplash.com/photos/forest-heat-by-sunbeam-RwHv7LgeC7s
- https://unsplash.com/photos/landscape-photo-of-mountain-alps-vddccTqwal8
- https://unsplash.com/photos/body-of-water-surrounding-with-trees-_LuLiJc1cdo

You can use them to populate your device or simulator with number of photos.
Follow [./scripts/populate-device-with-images](./scripts/populate-device-with-images.ts) to do so.

## [License](LICENSE)

SWM Photos is licensed under [The MIT License](LICENSE).

## [Community Discord](https://discord.swmansion.com)

[Join the Software Mansion Community Discord](https://discord.swmansion.com) to chat about SWM Photos and other Software Mansion solutions.

## SWM Photos is created by [Software Mansion](https://swmansion.com)

Since 2012 [Software Mansion](https://swmansion.com) is a software agency with experience in building web and mobile apps. We are Core React Native Contributors and experts in dealing with all kinds of React Native issues. We can help you build your next dream product – [Hire us](https://swmansion.com/contact/projects?utm_source=swm_photos&utm_medium=readme).
