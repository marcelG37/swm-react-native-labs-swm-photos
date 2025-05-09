import { EmptyGalleryList } from "@/components/EmptyGalleryList";
import { ExpoImageComponent } from "@/components/image/ExpoImageComponent";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { useGalleryUISettings } from "@/providers/GalleryUISettingsProvider";
import { LegendList } from "@legendapp/list";
import { useCallback } from "react";

export default function LegendListLayout() {
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
    <ImagesGalleryContainer title="Your photos (LegendList)">
      <LegendList
        data={cachedPhotos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={numberOfColumns}
        contentContainerStyle={{
          paddingHorizontal: galleryGap / 2,
          gap: galleryGap,
        }}
        /**
         * @see https://www.legendapp.com/open-source/list/api/props/#drawdistance
         */
        drawDistance={listOffscreenDrawDistance}
        recycleItems
        /**
         * @seehttps://www.legendapp.com/open-source/list/api/props/#estimateditemsize
         */
        estimatedItemSize={singleImageSize}
        ListEmptyComponent={
          <EmptyGalleryList
            itemSize={singleImageSize}
            numberOfColumns={numberOfColumns}
            numberOfItems={100}
          />
        }
      />
    </ImagesGalleryContainer>
  );
}
