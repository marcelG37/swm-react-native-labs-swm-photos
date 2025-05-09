import { DelayedContentRenderer } from "@/components/DelayedContentRenderer";
import { RNImageComponent } from "@/components/image/RNImageComponent";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import {
  GALLERY_UI_SETTINGS,
  useGalleryUISettings,
} from "@/providers/GalleryUISettingsProvider";
import { ScrollView, StyleSheet, View } from "react-native";

export default function RNImageInScrollViewLayout() {
  const { cachedPhotos } = useCachedPhotos();
  const { singleImageSize, galleryGap, mipMapsEnabled } =
    useGalleryUISettings();

  const photosToShow = cachedPhotos
    .toReversed()
    .slice(0, GALLERY_UI_SETTINGS.originalPhotosInScrollViewLimit);

  return (
    <ImagesGalleryContainer
      title={`RNImage ${mipMapsEnabled ? "(mipmaps enabled)" : ""}`}
      subtitle={`${photosToShow.length} photos`}
    >
      <DelayedContentRenderer>
        <ScrollView>
          <View style={[styles.imageGrid, { gap: galleryGap }]}>
            {photosToShow.map((item) => (
              <RNImageComponent
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
