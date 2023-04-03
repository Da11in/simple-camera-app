import { useState } from "react";
import { StyleSheet, View } from "react-native";

import type { ImagePickerAsset } from "expo-image-picker";

import Toast from "react-native-toast-message";

import ImagePreview from "./src/components/ImagePreview";
import Camera from "./src/components/Camera";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [image, setImage] = useState<ImagePickerAsset>(null);

  const closePreview = () => setImage(null);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {image ? (
        <ImagePreview image={image} onCancel={closePreview} />
      ) : (
        <Camera onImageLoaded={setImage} />
      )}

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
