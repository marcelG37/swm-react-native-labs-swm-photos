import { useMeasureImageLoadTime } from "@/utils/useMeasureImageLoadTime";
import { memo } from "react";
import { Image as RNImage, StyleSheet } from "react-native";
import { ImageViewProps } from "./types";

export const RNImageComponent = memo(function RNImageComponent({
  uri,
  itemSize,
}: ImageViewProps) {
  const { onLoadEnd, onLoadStart } = useMeasureImageLoadTime("Image");

  return (
    <RNImage
      source={{ uri, cache: "reload" }}
      fadeDuration={0}
      style={[styles.image, { width: itemSize, height: itemSize }]}
      onLoadStart={onLoadStart}
      onLoadEnd={onLoadEnd}
    />
  );
});

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    borderColor: "grey",
  },
});
