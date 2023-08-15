import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import { BOLD, Colors } from '../constants';

export function FullScreenLoadingIndicator({ variantBackground }: { variantBackground?: boolean }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: variantBackground ? Colors.dark.innerBackground : Colors.dark.background,
      }}>
      <ActivityIndicator color="#eee" />
    </View>
  );
}

/** App header components */

export const HeaderLeft = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 55,
        marginLeft: 10,
      }}>
      <Text
        style={{
          color: Colors.dark.text,
          fontSize: 20,
          paddingLeft: 5,
          fontFamily: BOLD,
        }}>
        {title}
      </Text>
    </div>
  );
};

export const ItemSeparatorComponent = () => (
  <View
    style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
  />
);

