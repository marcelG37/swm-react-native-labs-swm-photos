import {
  PersistedStateStatus,
  usePersistedState,
} from "@/hooks/usePersistedState";
import {
  createContext,
  PropsWithChildren,
  use,
  useCallback,
  useMemo,
} from "react";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const availableOffscreenDrawDistanceWindowSizes = [
  0.25, 0.5, 1, 2, 3, 5, 10,
] as const;
const availableColumnCounts = [1, 2, 3, 5, 6, 8] as const;
const availableGalleryGaps = [1, 2, 4, 8, 12] as const;

const calculateOffscreenDrawDistanceFromWindowSize = (
  drawDistance: (typeof availableOffscreenDrawDistanceWindowSizes)[number],
) => {
  return Math.round(screenHeight * drawDistance);
};

export const GALLERY_UI_SETTINGS = {
  initialNumberOfColumns: availableColumnCounts[3],
  initialGalleryGap: availableGalleryGaps[0],

  initialOffscreenDrawDistanceWindowSize:
    availableOffscreenDrawDistanceWindowSizes[5],

  /**
   * These are available column counts used in the gallery lists.
   */
  availableColumnCounts,

  availableGalleryGaps,

  /**
   * The value is multiplied by {@link Dimensions.get("window").height} to determine offscreen rendering area.
   * A value of 0.25 means rendering extends to 25% of screen height beyond visible area to the top and bottom.
   * A value of `1` will pre-render content one full screen height above and below the viewport.
   */
  availableOffscreenDrawDistanceWindowSizes,

  /**
   * Number of photos we want to show in the ScrollView when we compare default Image with ExpoImage.
   */
  originalPhotosInScrollViewLimit: 200,

  mipMapsEnabled: false,
};

const calculateSingleImageSize = (
  numberOfColumns: (typeof GALLERY_UI_SETTINGS.availableColumnCounts)[number],
  galleryGap: number,
) => {
  return (windowWidth - numberOfColumns * galleryGap) / numberOfColumns;
};

const initialGalleryUISettings = {
  galleryGap: GALLERY_UI_SETTINGS.initialGalleryGap,

  numberOfColumns: GALLERY_UI_SETTINGS.initialNumberOfColumns,
  singleImageSize: calculateSingleImageSize(
    GALLERY_UI_SETTINGS.initialNumberOfColumns,
    GALLERY_UI_SETTINGS.initialGalleryGap,
  ),

  offscreenDrawDistanceWindowSize:
    GALLERY_UI_SETTINGS.initialOffscreenDrawDistanceWindowSize,
  listOffscreenDrawDistance: calculateOffscreenDrawDistanceFromWindowSize(
    GALLERY_UI_SETTINGS.initialOffscreenDrawDistanceWindowSize,
  ),

  mipMapsEnabled: GALLERY_UI_SETTINGS.mipMapsEnabled,
};

type GalleryUISettingsDataType = {
  /**
   * Information about the current state of the persisted state.
   * Especially useful when waiting for the state to be restored from the disk.
   */
  stateRestorationStatus: PersistedStateStatus;
  galleryGap: (typeof GALLERY_UI_SETTINGS.availableGalleryGaps)[number];
  setGalleryGap: (
    galleryGap: (typeof GALLERY_UI_SETTINGS.availableGalleryGaps)[number],
  ) => void;

  /**
   * Derived from the {@link numberOfColumns}.
   */
  singleImageSize: number;
  numberOfColumns: (typeof GALLERY_UI_SETTINGS.availableColumnCounts)[number];
  setNumberOfColumns: (
    numberOfColumns: (typeof GALLERY_UI_SETTINGS.availableColumnCounts)[number],
  ) => void;

  /**
   * The value is multiplied by {@link Dimensions.get("window").height} to determine offscreen rendering area.
   * A value of 0.25 means rendering extends to 25% of screen height beyond visible area to the top and bottom.
   * A value of `1` will pre-render content one full screen height above and below the viewport.
   */
  offscreenDrawDistanceWindowSize: (typeof GALLERY_UI_SETTINGS.availableOffscreenDrawDistanceWindowSizes)[number];

  /**
   * Derived from the {@link offscreenDrawDistanceWindowSize}.
   * The actual offscreen draw distance calculated by multiplying {@link offscreenDrawDistanceWindowSize} by {@link Dimensions.get("window").height}.
   */
  listOffscreenDrawDistance: number;
  setOffscreenDrawDistanceWindowSize: (
    drawDistance: (typeof GALLERY_UI_SETTINGS.availableOffscreenDrawDistanceWindowSizes)[number],
  ) => void;

  mipMapsEnabled: boolean;
  setMipMapsEnabled: (mipMapsEnabled: boolean) => void;
};

const GalleryUISettingsContext = createContext<
  GalleryUISettingsDataType | undefined
>(undefined);

/**
 * Provides the gallery UI settings (e.g. number of columns, single image size).
 */
export const GalleryUISettingsProvider = ({ children }: PropsWithChildren) => {
  const [value, setValue, stateRestorationStatus] = usePersistedState<{
    numberOfColumns: (typeof GALLERY_UI_SETTINGS.availableColumnCounts)[number];
    /**
     * Derived from the {@link numberOfColumns}.
     */
    singleImageSize: number;
    galleryGap: (typeof GALLERY_UI_SETTINGS.availableGalleryGaps)[number];

    offscreenDrawDistanceWindowSize: (typeof GALLERY_UI_SETTINGS.availableOffscreenDrawDistanceWindowSizes)[number];
    /**
     * Derived from the {@link offscreenDrawDistanceWindowSize}.
     */
    listOffscreenDrawDistance: number;

    mipMapsEnabled: boolean;
  }>("galleryUISettings", initialGalleryUISettings);

  const setNumberOfColumns = useCallback(
    (
      numberOfColumns: (typeof GALLERY_UI_SETTINGS.availableColumnCounts)[number],
    ) => {
      setValue((prev) => ({
        ...prev,
        numberOfColumns,
        singleImageSize: calculateSingleImageSize(
          numberOfColumns,
          prev.galleryGap,
        ),
      }));
    },
    [setValue],
  );

  const setGalleryGap = useCallback(
    (galleryGap: (typeof GALLERY_UI_SETTINGS.availableGalleryGaps)[number]) => {
      setValue((prev) => ({
        ...prev,
        galleryGap,
        singleImageSize: calculateSingleImageSize(
          prev.numberOfColumns,
          galleryGap,
        ),
      }));
    },
    [setValue],
  );

  const setOffscreenDrawDistanceWindowSize = useCallback(
    (
      windowSize: (typeof GALLERY_UI_SETTINGS.availableOffscreenDrawDistanceWindowSizes)[number],
    ) => {
      setValue((prev) => ({
        ...prev,

        offscreenDrawDistanceWindowSize: windowSize,
        listOffscreenDrawDistance:
          calculateOffscreenDrawDistanceFromWindowSize(windowSize),
      }));
    },
    [setValue],
  );

  const setMipMapsEnabled = useCallback(
    (mipMapsEnabled: boolean) => {
      setValue((prev) => ({ ...prev, mipMapsEnabled }));
    },
    [setValue],
  );

  return (
    <GalleryUISettingsContext
      value={useMemo(
        () => ({
          ...value,
          setNumberOfColumns,
          setGalleryGap,
          setOffscreenDrawDistanceWindowSize,
          stateRestorationStatus,
          setMipMapsEnabled,
        }),
        [
          value,
          stateRestorationStatus,
          setGalleryGap,
          setNumberOfColumns,
          setOffscreenDrawDistanceWindowSize,
          setMipMapsEnabled,
        ],
      )}
    >
      {children}
    </GalleryUISettingsContext>
  );
};

export const useGalleryUISettings = (): GalleryUISettingsDataType => {
  const context = use(GalleryUISettingsContext);

  if (context === undefined) {
    throw new Error(
      "useImagesGallery must be used within an ImagesGalleryProvider",
    );
  }

  return context;
};
