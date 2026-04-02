import React from 'react'
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Test = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1E201900', '#1E2019']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
});

export default Test