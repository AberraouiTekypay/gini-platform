import { View, Animated } from 'react-native'
import React, {useEffect, useRef} from 'react'

interface AnimatedDotsProps {
  animated: boolean;
}

const AnimatedDots: React.FC<AnimatedDotsProps> = ({animated}) => {
    const firstDotWidth = useRef(new Animated.Value(40)).current;
    const middleDotWith = useRef(new Animated.Value(8)).current;
    const lastDotWidth = useRef(new Animated.Value(8)).current;
    

    useEffect(() => {
      if (!animated) {
        Animated.timing(firstDotWidth, {
          toValue: 8,
          duration: 100,
          useNativeDriver: false,
        }).start(() => {
          Animated.parallel([
            Animated.timing(middleDotWith, {
              toValue: 8,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(lastDotWidth, {
              toValue: 40,
              duration: 200,
              useNativeDriver: false,
            })
          ]).start();
        });
      } else {
        Animated.timing(lastDotWidth, {
          toValue: 8,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.parallel([
            Animated.timing(middleDotWith, {
              toValue: 8,
              duration: 0,
              useNativeDriver: false,
            }),
            Animated.timing(firstDotWidth, {
              toValue: 40,
              duration: 100,
              useNativeDriver: false,
            })
          ]).start();
        });
      }
    }, [animated])

  
    return (
        <View className={"flex-row"}>
          <Animated.View className={animated ? "bg-white h-2" : "bg-[#ccc] h-2"} style={{width: firstDotWidth, borderRadius:40}} />
          <Animated.View className={"bg-[#ccc] h-2 mx-1"} style={{width: middleDotWith, borderRadius:40}} />
          <Animated.View className={animated ? "bg-[#ccc] h-2" : "bg-white h-2"} style={{width: lastDotWidth,  borderRadius:40}} />
        </View>
    );
  };

export default AnimatedDots
