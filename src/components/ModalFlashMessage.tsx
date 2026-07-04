import React, { useEffect, useRef } from 'react';
import FlashMessage, { FlashMessageManager as FlashMessageManagerType } from 'react-native-flash-message';

// The package ships this as a singleton instance at runtime, but its .d.ts declares it as a
// class - so TS sees `hold`/`unhold` as static members that don't exist. Retype the singleton.
const FlashMessageManager = FlashMessageManagerType as unknown as {
  hold: (instance: FlashMessage) => void;
  unhold: () => void;
};

// react-native Modal renders in its own native window, above the whole app - including the
// root <FlashMessage /> mounted in App.tsx. Any toast shown while a Modal is open would be
// stuck behind it. Mounting one of these inside a Modal makes it the active toast target
// for as long as that Modal is visible, so showMessage() calls render on top of the Modal.
const ModalFlashMessage = ({ visible }: { visible: boolean }) => {
  const ref = useRef<FlashMessage>(null);

  useEffect(() => {
    if (!visible || !ref.current) return;
    FlashMessageManager.hold(ref.current);
    return () => FlashMessageManager.unhold();
  }, [visible]);

  return <FlashMessage ref={ref} position="top" />;
};

export default ModalFlashMessage;
