import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

const pinkBase = "#ff4f7d";

export default function Home () {
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  const createPulse = (anim: Animated.Value): Animated.CompositeAnimation => {
    return Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
  };

  useEffect(() => {
    createPulse(pulse1).start();
    setTimeout(() => createPulse(pulse2).start(), 700);
  }, []);

  return (
    <View style={styles.wrapper}>
      {/* Animation 1 */}
      <Animated.View
        style={[
          styles.pulseCircle,
          {
            transform: [
              {
                scale: pulse1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2.5],
                }),
              },
            ],
            opacity: pulse1.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 0],
            }),
          },
        ]}
      />

      {/* Animation 2 */}
      <Animated.View
        style={[
          styles.pulseCircle,
          {
            transform: [
              {
                scale: pulse2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 2.5],
                }),
              },
            ],
            opacity: pulse2.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 0],
            }),
          },
        ]}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>SOS</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  pulseCircle: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: pinkBase,
  },

  button: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: pinkBase,

    shadowColor: pinkBase,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },

  text: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

