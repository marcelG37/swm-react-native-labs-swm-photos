import { colors } from "@/config/colors";
import { StyleSheet, Text, View } from "react-native";
import { Loader, LoaderPlaceholder } from "./Loader";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";

export type ImagesGalleryHeaderProps = {
  /**
   * Main text on the header
   * @default "Your photos"
   */
  title?: string;
  /**
   * Subtext on the header
   * @default `{cachedPhotos.length} items`
   */
  subtitle?: string;
};

export const ImagesGalleryHeader = ({
  title = "Your photos",
  subtitle,
}: ImagesGalleryHeaderProps) => {
  const { cachedPhotos, cachedPhotosLoadingState } = useCachedPhotos();

  const subtitleText = subtitle ?? `${cachedPhotos.length} items`;

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitleText}</Text>
      </View>
      {cachedPhotosLoadingState === "CALCULATING" ||
      cachedPhotosLoadingState === "RESTORING_FROM_CACHE" ? (
        <Loader />
      ) : (
        <LoaderPlaceholder />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.blue,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: colors.white,
    fontFamily: "Aeonik-Medium",
    fontSize: 30,
    lineHeight: 36,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: colors.white,
    fontFamily: "Aeonik-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
});
