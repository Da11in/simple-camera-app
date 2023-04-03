import { Pressable, StyleSheet } from "react-native";
import React from "react";

type Props = {
  icon: React.ReactNode;
  onPress: () => void;
};

const CameraButton: React.FC<Props> = ({ onPress, icon }): React.ReactElement => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      {icon}
    </Pressable>
  );
};

export default CameraButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
