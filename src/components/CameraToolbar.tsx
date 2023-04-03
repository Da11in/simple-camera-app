import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import CameraButton from "./CameraButton";

type Props = {
  onTakePhoto: () => void;
  onCameraFlip: () => void;
  onOpenGallery: () => void;
};

const CameraToolbar: React.FC<Props> = ({
  onCameraFlip,
  onOpenGallery,
  onTakePhoto,
}): React.ReactElement => {
  return (
    <View style={styles.container}>
      <CameraButton
        onPress={onOpenGallery}
        icon={<MaterialIcons name="photo-library" size={30} color="white" />}
      />

      <CameraButton
        onPress={onTakePhoto}
        icon={<MaterialIcons name="camera" size={70} color="white" />}
      />

      <CameraButton
        onPress={onCameraFlip}
        icon={<MaterialIcons name="flip-camera-ios" size={30} color="white" />}
      />
    </View>
  );
};

export default CameraToolbar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 30,
    position: "absolute",
    bottom: 0,
  },
});
