import { EmptyGalleryList } from "@/components/EmptyGalleryList";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import { ExpoImageComponent } from "@/components/image/ExpoImageComponent";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { useGalleryUISettings } from "@/providers/GalleryUISettingsProvider";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { View } from "react-native";

export default function FlashListLayout() {
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

  return (
    <ImagesGalleryContainer title="Your photos (FlashList)">
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
