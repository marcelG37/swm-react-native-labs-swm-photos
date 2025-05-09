import { Button } from "@/components/Button";
import { HeaderText } from "@/components/HeaderText";
import { SegmentedButton } from "@/components/SegmentedButton";
import { Logo } from "@/components/Logo";
import { SWMLogo } from "@/components/SWMLogo";
import { useMediaLibraryPhotos } from "@/providers/MediaLibraryPhotosProvider";
import {
  GALLERY_UI_SETTINGS,
  useGalleryUISettings,
} from "@/providers/GalleryUISettingsProvider";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingProgressView from "@/components/LoadingProgressView";
import { useTimersData } from "@/utils/useMeasureImageLoadTime";
import { Label } from "@/components/Label";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { usePerformanceLogs } from "@/utils/logPerformance";

export default function SettingsLayout() {
  const {
    galleryGap,
    setGalleryGap,
    numberOfColumns,
    setNumberOfColumns,
    offscreenDrawDistanceWindowSize,
    setOffscreenDrawDistanceWindowSize,
    mipMapsEnabled,
    setMipMapsEnabled,
  } = useGalleryUISettings();
  const {
    mediaLibraryPermissionsStatus,
    mediaLibraryLoadingState,
    mediaLibraryPhotosCount,
    mediaLibraryPhotos,
    reloadMediaLibraryPhotos,
  } = useMediaLibraryPhotos();
  const { cachedPhotos, cachedPhotosLoadingState, recalculateCachedPhotos } =
    useCachedPhotos();

  const { resetTimers, timersData } = useTimersData();
  const { resetLogs, performanceLogs } = usePerformanceLogs();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Logo />

        <View style={styles.optionsContainer}>
          <HeaderText>Photos gallery columns count</HeaderText>
          <SegmentedButton
            options={GALLERY_UI_SETTINGS.availableColumnCounts.map((count) => ({
              label: count,
              value: count,
            }))}
            value={numberOfColumns}
            onChange={setNumberOfColumns}
          />
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>Photos gallery gap</HeaderText>
          <SegmentedButton
            options={GALLERY_UI_SETTINGS.availableGalleryGaps.map((gap) => ({
              label: gap,
              value: gap,
            }))}
            value={galleryGap}
            onChange={setGalleryGap}
          />
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>Lists draw distance window size</HeaderText>
          <SegmentedButton
            options={GALLERY_UI_SETTINGS.availableOffscreenDrawDistanceWindowSizes.map(
              (distance) => ({
                label: distance,
                value: distance,
              }),
            )}
            value={offscreenDrawDistanceWindowSize}
            onChange={setOffscreenDrawDistanceWindowSize}
          />
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>
            MediaLibrary permissions: {mediaLibraryPermissionsStatus}
          </HeaderText>
          <LoadingProgressView
            total={mediaLibraryPhotosCount ?? 0}
            current={mediaLibraryPhotos.length}
            label={mediaLibraryLoadingState}
          />
          <Button onPress={async () => await reloadMediaLibraryPhotos()}>
            Reload MediaGallery photos
          </Button>
        </View>

        <View style={styles.optionsContainer}>
          <LoadingProgressView
            total={mediaLibraryPhotosCount ?? 0}
            current={cachedPhotos.length}
            label={cachedPhotosLoadingState}
          />
          <Button onPress={() => recalculateCachedPhotos()}>
            Recalculate cached photos {"\n"}(delete the whole cache)
          </Button>
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>Image components timings</HeaderText>
          <Label>{getLoadTimesAverage("Image", timersData.Image)}</Label>
          <Label>
            {getLoadTimesAverage("ExpoImage", timersData.ExpoImage)}
          </Label>
          <Button onPress={resetTimers}>Reset timings</Button>
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>Performance logs</HeaderText>
          <Label>{JSON.stringify(performanceLogs)}</Label>
          <Button onPress={resetLogs}>Reset logs</Button>
        </View>

        <View style={styles.optionsContainer}>
          <HeaderText>MipMaps</HeaderText>
          <Label>
            Choose whether to use mipmaps for the Expo Image in ScrollView
            scenario (2).
          </Label>
          <SegmentedButton
            options={["on", "off"].map((value) => ({
              label: value,
              value,
            }))}
            value={mipMapsEnabled ? "on" : "off"}
            onChange={(value) => setMipMapsEnabled(value === "on")}
          />
        </View>

        <SWMLogo />
      </ScrollView>
    </SafeAreaView>
  );
}

function getLoadTimesAverage(
  componentName: string,
  loadTimes: {
    averageLoadTimeFromMount: number;
    averageLoadTimeFromStartLoading: number;
  },
) {
  const timeFromMount = isNaN(loadTimes.averageLoadTimeFromMount)
    ? "N/A"
    : `${loadTimes.averageLoadTimeFromMount.toFixed(2)}ms`;
  const timeFromLoadStart = isNaN(loadTimes.averageLoadTimeFromStartLoading)
    ? "N/A"
    : `${loadTimes.averageLoadTimeFromStartLoading.toFixed(2)}ms`;

  return `${componentName} average load time from mount: ${timeFromMount}\n${componentName}, average load time from start loading: ${timeFromLoadStart}`;
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: 16,
    padding: 16,
  },
  optionsContainer: {
    rowGap: 16,
    width: "100%",
  },
});
