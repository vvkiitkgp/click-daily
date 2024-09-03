import React, { useState } from 'react';
import { Text, View } from 'react-native';

interface GuideAlertProps {
  message: string;
}

export const GuideAlert = ({ message }: GuideAlertProps) => {
  const [showMessage, setShowMessage] = useState<boolean>(true);

  setTimeout(() => {
    setShowMessage(false);
  }, 3000);

  if (showMessage) {
    return (
      <View
        style={{
          position: 'absolute',
          top: '48%%',
          height: 50,
          width: '100%',
          zIndex: 999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 15, color: 'white' }}>{message}</Text>
      </View>
    );
  }
};
