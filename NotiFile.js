import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import NotifPopup from './NotifPopup'; // Import your NotifPopup component

const NotiFile = () => {
  const [showToast, setShowToast] = useState(false);

  const handleShowToast = () => {
    setShowToast(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <NotifPopup showToast={showToast} setShowToast={setShowToast} />
      <Text>Click the button to show the toast</Text>
      <Button title="Show Toast" onPress={handleShowToast} />

    </View>
  );
};

export default NotiFile;