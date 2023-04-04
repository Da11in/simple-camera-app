import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import { manipulateAsync, FlipType } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import CameraToolbar from "./CameraToolbar";
import { ActivityIndicator } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import CameraGrid from "./CameraGrid";
import CameraAccelerometer from "./CameraAccelerometer";

const { width, height } = Dimensions.get("screen");

const CAMERA_HEIGHT = (width * 4) / 3;

const PADDING_TOP = (height - CAMERA_HEIGHT) / 2 - 20;

type CameraProps = {
  onImageLoaded: (image: ImagePicker.ImagePickerAsset) => void;
};

const Camera: React.FC<CameraProps> = ({ onImageLoaded }): React.ReactElement => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [camera, setCamera] = useState<ExpoCamera>(null);
  const [permissions, setPermissions] = useState(false);
  const [loading, setLoading] = useState(true);

  const requestCameraPermissions = async () => {
    const perm = await ExpoCamera.requestCameraPermissionsAsync();
    setPermissions(perm.granted);
    setLoading(false);
  };

  const takePhoto = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();

      if (cameraType === CameraType.front) {
        const flippedImage = await manipulateAsync(image.uri, [{ flip: FlipType.Horizontal }]);
        onImageLoaded(flippedImage);
      } else {
        onImageLoaded(image);
      }
    }
  };

  const changeCameraType = () =>
    setCameraType((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back));

  const openGallery = async () => {
    setLoading(true);
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!photo.canceled) {
        onImageLoaded(photo.assets[0]);
      }
    } catch (err) {
      console.error("catch - ", err);
    }
    setLoading(true);
  };

  useEffect(() => {
    requestCameraPermissions();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#7DAF9C" />
      </View>
    );
  }

  if (!permissions) {
    return (
      <View style={[styles.container, styles.permissions]}>
        <Text style={styles.permissionsText}>
          The application cannot use the camera because the appropriate permissions have not been
          given.
        </Text>

        <TouchableOpacity style={styles.permissionsBtn} onPress={requestCameraPermissions}>
          <Text style={styles.permissionsBtnText}>Give a permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Animated.View style={styles.container} entering={FadeIn}>
      <ExpoCamera style={styles.camera} type={cameraType} ref={(ref) => setCamera(ref)}>
        <CameraGrid enabled size={3} />
        <CameraAccelerometer enabled />
      </ExpoCamera>

      <CameraToolbar
        onCameraFlip={changeCameraType}
        onOpenGallery={openGallery}
        onTakePhoto={takePhoto}
      />
    </Animated.View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP,
    backgroundColor: "#222",
  },
  loading: {
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    height: CAMERA_HEIGHT,
    position: "relative",
  },
  permissions: {
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  permissionsText: {
    textAlign: "center",
    fontSize: 24,
  },
  permissionsBtn: {
    backgroundColor: "#50A2A7",
    marginTop: 40,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  permissionsBtnText: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
  },
});
