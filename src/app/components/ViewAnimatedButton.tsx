import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet
} from "react-native";

interface props {
    outputRange: number[]
    colorBackground: string
}
export default function ViewAnimatedButton ({outputRange, colorBackground}:props){

    
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

    const styles = StyleSheet.create({
      pulseCircle: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colorBackground,
      }
    });

    
      useEffect(() => {
        createPulse(pulse1).start();
        setTimeout(() => createPulse(pulse2).start(), 800);
      }, []);
    return (<>
        <Animated.View
                style={[
                  styles.pulseCircle,
                  {
                    transform: [
                      {
                        scale: pulse1.interpolate({
                          inputRange: [0, 1],
                          outputRange: outputRange,
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
            </>
    )
}

