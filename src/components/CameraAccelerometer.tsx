import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

type CameraAccelerometerProps = {
  enabled: boolean;
};

const CameraAccelerometer: React.FC<CameraAccelerometerProps> = ({
  enabled,
}): React.ReactElement => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  useEffect(() => {
    console.log(x, y, z);
  }, [x, y, z]);

  return (
    <View>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
    </View>
  );
};

export default CameraAccelerometer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  text: {
    color: "#fff",
  },
});
