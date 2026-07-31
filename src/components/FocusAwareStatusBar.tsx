import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

interface FocusAwareStatusBarProps extends StatusBarProps {
  // Option to explicitly control translucent state
  translucent?: boolean;
}

const FocusAwareStatusBar: React.FC<FocusAwareStatusBarProps> = ({
  translucent = false,
  animated = true,
  ...props
}) => {
  const isFocused = useIsFocused();

  if (!isFocused) return null;

  return <StatusBar animated={animated} translucent={translucent} {...props} />;
};

export default FocusAwareStatusBar;
