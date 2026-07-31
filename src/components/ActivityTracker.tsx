import React, { useRef } from 'react';
import { View, PanResponder, ViewProps } from 'react-native';

interface ActivityTrackerProps extends ViewProps {
  children: React.ReactNode;
  onActivity?: () => void;
}

export const ActivityTracker: React.FC<ActivityTrackerProps> = ({
  children,
  style,
  onActivity,
  ...props
}) => {
  const onActivityRef = useRef(onActivity);
  onActivityRef.current = onActivity;
  const lastTriggerTime = useRef<number>(0);

  const triggerActivity = () => {
    const now = Date.now();
    if (now - lastTriggerTime.current > 15000) {
      lastTriggerTime.current = now;
      onActivityRef.current?.();
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        triggerActivity();
        return false;
      },
      onMoveShouldSetPanResponderCapture: () => {
        triggerActivity();
        return false;
      },
    }),
  );

  return (
    <View style={style} {...panResponder.current.panHandlers} {...props}>
      {children}
    </View>
  );
};
