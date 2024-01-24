//import libraries
import React from "react";
import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
} from "react-native";
import tile from "@/assets/images/tile.png";

// MyComponent Component
const Screen = ({ children, style, ...otherProps }: ImageBackgroundProps) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={tile}
      style={[styles.container, style]}
      {...otherProps}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
  },
});

export default Screen;
