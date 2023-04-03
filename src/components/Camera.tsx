import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera as ExpoCamera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import CameraToolbar from "./CameraToolbar";

const { width, height } = Dimensions.get("screen");

const CAMERA_HEIGHT = (width * 4) / 3;

const PADDING_TOP = (height - CAMERA_HEIGHT) / 2 - 20;

type CameraProps = {
  onImageLoaded: (image: ImagePicker.ImagePickerAsset) => void;
};

const Camera: React.FC<CameraProps> = ({ onImageLoaded }): React.ReactElement => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [cameraPermissions, requestCameraPermissions] = ExpoCamera.useCameraPermissions();
  const [camera, setCamera] = useState<ExpoCamera>(null);

  const takePhoto = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      onImageLoaded(image);
    }
  };

  const changeCameraType = () =>
    setCameraType((prev) => (prev === CameraType.back ? CameraType.front : CameraType.back));

  const openGallery = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync();
      onImageLoaded(photo.assets[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const requestPermissions = async () => {
    if (cameraPermissions && !cameraPermissions.granted) {
      requestCameraPermissions();
    }
  };

  useEffect(() => {
    requestPermissions();
  }, [cameraPermissions]);

  if (!cameraPermissions) {
    return (
      <View style={[styles.container, styles.permissions]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!cameraPermissions.granted) {
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
    <View style={styles.container}>
      <ExpoCamera style={styles.camera} type={cameraType} ref={(ref) => setCamera(ref)} />
      <CameraToolbar
        onCameraFlip={changeCameraType}
        onOpenGallery={openGallery}
        onTakePhoto={takePhoto}
      />
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: PADDING_TOP,
    backgroundColor: "#222",
  },
  camera: {
    height: CAMERA_HEIGHT,
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
