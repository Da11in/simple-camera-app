import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import type { ColorValue } from "react-native";

const { width } = Dimensions.get("screen");

const CAMERA_HEIGHT = (width * 4) / 3;

type CameraGridProps = {
  enabled: boolean;
  size?: 2 | 3 | 4;
  color?: ColorValue;
};

const CameraGrid: React.FC<CameraGridProps> = ({
  enabled = false,
  size = 3,
  color = "#fff",
}): React.ReactElement => {
  const _generateGrid = () => {
    const grid = [];

    for (let i = 0; i < size * size; i++) {
      grid.push(
        <View
          key={i}
          style={[
            styles.line,
            {
              width: width / size,
              height: CAMERA_HEIGHT / size,
              borderColor: color,
              borderRightWidth: (i + 1) % size === 0 ? 0 : 1,
              borderBottomWidth: i >= size * size - size ? 0 : 1,
            },
          ]}
        />
      );
    }

    return grid;
  };

  if (!enabled) {
    return null;
  }

  return <View style={styles.container}>{_generateGrid()}</View>;
};

export default CameraGrid;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  line: {
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});
