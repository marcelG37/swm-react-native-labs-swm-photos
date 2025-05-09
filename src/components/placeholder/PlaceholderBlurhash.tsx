import { PLACEHOLDER_BLURHASHES } from "@/config/constants";
import { Image } from "expo-image";
import { PlaceholderProps } from "./types";

export const PlaceholderBlurhash = ({ size, index }: PlaceholderProps) => {
  return (
    <Image
      source={{
        blurhash: PLACEHOLDER_BLURHASHES[index % PLACEHOLDER_BLURHASHES.length],
      }}
      style={{ width: size, height: size }}
    />
  );
};
