import React, { useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { Colors, REGULAR } from '../constants';
import { WalletContext } from '../context/WalletContext';

export function Balance() {
  const { wallet }: any = useContext(WalletContext);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column', gap: 4 }}>
        <View style={styles.row}>
          <View style={{ paddingRight: 10, paddingLeft: 4 }}>
            <Text allowFontScaling={false} style={styles.text}>
              Wallet :
            </Text>
          </View>
          <View>
            <Image
              style={{ width: 20, height: 20, resizeMode: 'cover' }}
              source={require('../assets/sol-logo.png')}
            />
          </View>
          <View style={{ paddingRight: 10, paddingLeft: 4 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 13,
                color: Colors['dark'].text,
                textAlign: 'right',
                fontFamily: REGULAR,
                width: 70,
              }}>
              {(wallet && wallet.balance) || '0.00'} SOL
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ paddingRight: 10, paddingLeft: 4 }}>
            <Text allowFontScaling={false} style={styles.text}>
              App :
            </Text>
          </View>
          <View>
            <Image
              style={{ width: 20, height: 20, resizeMode: 'cover' }}
              source={require('../assets/sol-logo.png')}
            />
          </View>
          <View style={{ paddingRight: 10, paddingLeft: 4 }}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 13,
                color: Colors['dark'].text,
                textAlign: 'right',
                fontFamily: REGULAR,
                width: 70,
              }}>
              {(wallet && wallet.appBalance) || '0.00'} SOL
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors['dark'].inputBackground,
    minHeight: 50,
    maxWidth: '100vw',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    color: Colors['dark'].text,
    textAlign: 'right',
    fontFamily: REGULAR,
    width: 50,
  },
});
