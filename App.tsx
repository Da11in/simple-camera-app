import { StyleSheet, View } from "react-native";
import Camera from "./src/components/Camera";
import { useState } from "react";
import ImagePreview from "./src/components/ImagePreview";

export default function App() {
  const [image, setImage] = useState(null);

  const saveToGallery = () => {};

  const closePreview = () => setImage(null);

  return (
    <View style={styles.container}>
      {image ? (
        <ImagePreview image={image} onSave={saveToGallery} onCancel={closePreview} />
      ) : (
        <Camera onImageLoaded={setImage} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
