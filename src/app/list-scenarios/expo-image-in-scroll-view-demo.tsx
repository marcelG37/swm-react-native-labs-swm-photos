import { ExpoImageComponent } from "@/components/image/ExpoImageComponent";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import {
  GALLERY_UI_SETTINGS,
  useGalleryUISettings,
} from "@/providers/GalleryUISettingsProvider";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { DelayedContentRenderer } from "@/components/DelayedContentRenderer";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ExpoImageInScrollViewLayout() {
  const { cachedPhotos } = useCachedPhotos();
  const { singleImageSize, galleryGap, mipMapsEnabled } =
    useGalleryUISettings();

  const photosToShow = cachedPhotos
    .toReversed()
    .slice(0, GALLERY_UI_SETTINGS.originalPhotosInScrollViewLimit);

  return (
    <ImagesGalleryContainer
      title={`Expo Image ${mipMapsEnabled ? "(mipmaps enabled)" : ""}`}
      subtitle={`${photosToShow.length} photos`}
    >
      <DelayedContentRenderer>
        <ScrollView>
          <View style={[styles.imageGrid, { gap: galleryGap }]}>
            {photosToShow.map((item) => (
              <ExpoImageComponent
                key={item.originalPhotoUri}
                uri={
                  mipMapsEnabled ? item.cachedPhotoUri : item.originalPhotoUri
                }
                itemSize={singleImageSize}
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
