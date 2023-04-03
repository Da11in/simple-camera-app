import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import React from "react";
import type { ImagePickerAsset } from "expo-image-picker";
import Toast from "react-native-toast-message";
import * as MediaLibrary from "expo-media-library";

const { width } = Dimensions.get("screen");

type ImagePreviewProps = {
  image: ImagePickerAsset;
  onCancel: () => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onCancel }): React.ReactElement => {
  const saveToGallery = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();

    if (!granted) {
      Toast.show({ type: "error", text1: "Failed to save" });
      onCancel();
      return;
    }

    try {
      await MediaLibrary.saveToLibraryAsync(image.uri);
      onCancel();
      Toast.show({ type: "success", text1: "Saved" });
    } catch (err) {
      Toast.show({ type: "error", text1: "Failed to save" });
      onCancel();
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: image.uri,
          }}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onCancel} style={[styles.action, styles.cancel]}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveToGallery} style={[styles.action, styles.save]}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePreview;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#222" },
  imageContainer: {
    flex: 1,
  },
  image: {
    backgroundColor: "#000",
    width,
    height: (width * 4) / 3,
  },
  actions: {
    flexDirection: "row",
    marginBottom: 40,
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
  },
  action: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "uppercase",
  },
  cancel: {
    backgroundColor: "#EE6352",
  },
  save: {
    backgroundColor: "#758BFD",
  },
});
