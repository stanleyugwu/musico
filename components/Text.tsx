//import libraries
import { FontFamily } from "@/app/_layout";
import React from "react";
import {
  Text as _Text,
  TextStyle as _TextStyle,
  TextProps as _TextProps,
} from "react-native";

interface TextProps extends _TextProps {
  color?: string;
  size?: _TextStyle["fontSize"];
  font?: FontFamily;
}

// Text Component
const Text = ({
  color = "white",
  font = "InterRegular",
  size = 18,
  style,
  ...otherProps
}: TextProps) => {
  return (
    <_Text
      style={[{ fontFamily: font, fontSize: size, color: color }, style]}
      {...otherProps}
    />
  );
};

export default Text;
