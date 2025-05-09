import { ImagesGalleryContainer } from "@/components/ImagesGalleryContainer";
import {
  GALLERY_UI_SETTINGS,
  useGalleryUISettings,
} from "@/providers/GalleryUISettingsProvider";
import { ScrollView } from "react-native";
import { DelayedContentRenderer } from "@/components/DelayedContentRenderer";
import { EmptyGalleryList } from "@/components/EmptyGalleryList";

export default function SkeletonPlaceholderLayout() {
  const { singleImageSize, numberOfColumns } = useGalleryUISettings();

  const photosToShowCount = GALLERY_UI_SETTINGS.originalPhotosInScrollViewLimit;

  return (
    <ImagesGalleryContainer
      title="Skeleton"
      subtitle={`${photosToShowCount} items`}
    >
      <DelayedContentRenderer>
        <ScrollView>
          <EmptyGalleryList
            itemSize={singleImageSize}
            numberOfColumns={numberOfColumns}
            numberOfItems={photosToShowCount}
          />
        </ScrollView>
      </DelayedContentRenderer>
    </ImagesGalleryContainer>
  );
}
