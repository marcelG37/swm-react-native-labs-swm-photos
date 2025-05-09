import { DelayedImageComponent } from "@/components/image/DelayedImageComponent";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import {
  GALLERY_UI_SETTINGS,
  useGalleryUISettings,
} from "@/providers/GalleryUISettingsProvider";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { ScrollView, StyleSheet, View } from "react-native";
import { DelayedContentRenderer } from "@/components/DelayedContentRenderer";
import { colors } from "@/config/colors";

const BACKGROUND_COLORS = [
  colors.yellow,
  colors.sea,
  colors.pink,
  colors.green,
];

export default function StaticImagePlaceholderLayout() {
  const { cachedPhotos } = useCachedPhotos();
  const { singleImageSize, galleryGap, mipMapsEnabled } =
    useGalleryUISettings();

  const photosToShow = cachedPhotos
    .toReversed()
    .slice(0, GALLERY_UI_SETTINGS.originalPhotosInScrollViewLimit);

  return (
    <ImagesGalleryContainer
      title="Static image"
      subtitle={`${photosToShow.length} items`}
    >
      <DelayedContentRenderer>
        <ScrollView>
          <View style={[styles.imageGrid, { gap: galleryGap }]}>
            {photosToShow.map((item, index) => (
              <DelayedImageComponent
                key={item.originalPhotoUri}
                uri={
                  mipMapsEnabled ? item.cachedPhotoUri : item.originalPhotoUri
                }
                itemSize={singleImageSize}
                placeholder={require("@/assets/images/adaptive-icon.png")}
                style={{
                  backgroundColor:
                    BACKGROUND_COLORS[index % BACKGROUND_COLORS.length],
                }}
              />
            ))}
          </View>
        </ScrollView>
      </DelayedContentRenderer>
    </ImagesGalleryContainer>
  );
}

const styles = StyleSheet.create({
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
