import React, { useState, useEffect, forwardRef } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

const NotifPopup = forwardRef((props, ref) => {
  const { showToast, setShowToast } = props;

  const [notificationQueue, setNotificationQueue] = useState([]);
  const [notificationId, setNotificationId] = useState(0);

  const dismissNotification = (id) => {
    setNotificationQueue((prevQueue) => prevQueue.filter((notif) => notif.id !== id));
  };

  useEffect(() => {
    if (showToast) {
      const newNotification = {
        type: 'success',
        text1: 'This is a success toast',
        text2: 'This toast was triggered from another file',
        visibilityTime: 2000,
        position: 'top',
        id: notificationId,
      };

      setNotificationQueue((prevQueue) => [...prevQueue, newNotification]);
      setNotificationId(notificationId + 1);

      setShowToast(false); // Reset the showToast state
    }
  }, [showToast]);

  useEffect(() => {
    if (notificationQueue.length > 0) {
      const notification = notificationQueue[0];

      Toast.show({
        text1: notification.text1,
        text2: notification.text2,
        position: notification.position,
        type: notification.type,
        onHide: () => {
          dismissNotification(notification.id);
        },
      });
    }
  }, [notificationQueue]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', position:"absolute", top:0, alignItems: 'center' }}>
      <Toast ref={ref} />
    </View>
  );
});

export default NotifPopup;
