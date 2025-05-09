import { EmptyGalleryList } from "@/components/EmptyGalleryList";
import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import { ExpoImageComponent } from "@/components/image/ExpoImageComponent";
import { useCachedPhotos } from "@/providers/CachedPhotosProvider";
import { useGalleryUISettings } from "@/providers/GalleryUISettingsProvider";
import { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function FlatListLayout() {
  const {
    singleImageSize,
    numberOfColumns,
    offscreenDrawDistanceWindowSize,
    galleryGap,
  } = useGalleryUISettings();
  const { cachedPhotos } = useCachedPhotos();

  /**
   * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#use-keyextractor-or-key
   */
  const renderItem = useCallback(
    ({ item }: { item: (typeof cachedPhotos)[number] }) => (
      <ExpoImageComponent
        uri={item.cachedPhotoUri}
        itemSize={singleImageSize}
      />
    ),
    [singleImageSize],
  );

  /**
   * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#use-getitemlayout
   */
  const getItemLayout = useCallback(
    (
      _: ArrayLike<(typeof cachedPhotos)[number]> | null | undefined,
      index: number,
    ) => ({
      length: singleImageSize,
      offset: singleImageSize * index,
      index,
    }),
    [singleImageSize],
  );

  /**
   * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#use-keyextractor-or-key
   */
  const keyExtractor = useCallback(
    (item: (typeof cachedPhotos)[number]) => item.originalPhotoUri,
    [],
  );

  return (
    <ImagesGalleryContainer title="Your photos (FlatList)">
      <FlatList
        data={cachedPhotos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        numColumns={numberOfColumns}
        columnWrapperStyle={{ gap: galleryGap }}
        contentContainerStyle={[styles.content, { gap: galleryGap }]}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#initialnumtorender
         * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#initialnumtorender
         */
        initialNumToRender={10}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#maxtorenderperbatch
         * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#maxtorenderperbatch
         */
        maxToRenderPerBatch={10}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#updatecellsbatchingperiod
         * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#updatecellsbatchingperiod
         */
        updateCellsBatchingPeriod={50}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#removeclippedsubviews
         * @see https://reactnative.dev/docs/optimizing-flatlist-configuration#removeclippedsubviews
         */
        removeClippedSubviews={true}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#debug
         */
        debug={false}
        /**
         * @see https://reactnative.dev/docs/virtualizedlist#windowsize
         */
        windowSize={1 + 2 * offscreenDrawDistanceWindowSize}
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

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
  },
});
