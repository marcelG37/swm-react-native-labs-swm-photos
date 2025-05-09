import { EmptyGalleryList } from "@/components/EmptyGalleryList";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import { ExpoImageComponent } from "@/components/image/ExpoImageComponent";
import { LAUNCH_GALLERY_ON_START } from "@/config/constants";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { useGalleryUISettings } from "@/providers/GalleryUISettingsProvider";
import { FlashList } from "@shopify/flash-list";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

/**
 * Duplicate of {@link FlashListLayout}
 */
export default function PhotosGalleryLayout() {
  const { cachedPhotos } = useCachedPhotos();
  const {
    numberOfColumns,
    singleImageSize,
    listOffscreenDrawDistance,
    galleryGap,
  } = useGalleryUISettings();

  const renderItem = useCallback(
    ({ item }: { item: (typeof cachedPhotos)[number] }) => (
      <ExpoImageComponent
        uri={item.cachedPhotoUri}
        itemSize={singleImageSize}
      />
    ),
    [singleImageSize],
  );

  const keyExtractor = useCallback(
    (item: (typeof cachedPhotos)[number]) => item.originalPhotoUri,
    [],
  );

  const handleLoad = useCallback(() => {
    if (LAUNCH_GALLERY_ON_START) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, []);

  return (
    <ImagesGalleryContainer title="Your photos">
      <FlashList
        data={cachedPhotos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numberOfColumns}
        estimatedItemSize={singleImageSize}
        contentContainerStyle={{ paddingLeft: galleryGap }}
        /**
         * @see https://shopify.github.io/flash-list/docs/usage#drawdistance
         */
        drawDistance={listOffscreenDrawDistance}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={ListEmptyComponent}
        onLoad={handleLoad}
      />
    </ImagesGalleryContainer>
  );
}

const ItemSeparator = () => {
  const { galleryGap } = useGalleryUISettings();
  return <View style={{ height: galleryGap }} />;
};

const ListEmptyComponent = () => {
  const { singleImageSize, numberOfColumns } = useGalleryUISettings();
  return (
    <EmptyGalleryList
      itemSize={singleImageSize}
      numberOfColumns={numberOfColumns}
      numberOfItems={100}
    />
  );
};
