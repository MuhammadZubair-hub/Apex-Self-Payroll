import Ionicons from "@react-native-vector-icons/ionicons";
import React from "react";
import { ViewStyle } from "react-native";

const iconTypes = {
  Ionicons,
};

interface IconProps {
  type: any;
  name: string;
  size?: number;
  color: string;
  onPress?: any;
  style?: ViewStyle;
}

const Icon = ({
  type = "Ionicons",
  name,
  size = 24,
  color = "#000",
  onPress,
  style,
  ...props
}: IconProps) => {
  const IconComponent = iconTypes[type as keyof typeof iconTypes];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" is not supported.`);
    return null;
  }
  return (
    <IconComponent
      name={name as any}
      size={size}
      color={color}
      onPress={onPress}
      style={style}
      {...props}
    />
  );
};

export default Icon;
