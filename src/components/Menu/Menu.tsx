import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';

import { Colors, BOLD, REGULAR } from '../../constants';
import HeliusService from '../../services/helius.service';
import { WalletContext } from '../../context/WalletContext';

export const Menu = ({ navigation }: any) => {
  const { wallet } = useContext(WalletContext);
  const screenWidth = Dimensions.get('window').width;
  const innerSizeFontSizePercentage = 0.025;
  const headerSizeFontSizePercentage = 0.035;

  const innerSize = screenWidth * innerSizeFontSizePercentage || '14px';
  const headerSize = screenWidth * headerSizeFontSizePercentage || '14px';
  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false}>
      <View style={styles.appWrapper}>
        <TouchableOpacity
          style={[styles.innerApp, styles.searching]}
          onPress={() => navigation.navigate('Search')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Search Inventory
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.innerApp, styles.marketplace]}
          onPress={() => navigation.navigate('Marketplace')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Marketplace
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.appWrapper, { marginTop: 10 }]}>
        <TouchableOpacity
          style={[styles.innerApp, { backgroundColor: '#A91079' }]}
          onPress={() => navigation.navigate('Deposit Withdraw')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Deposit / Withdraw
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.innerApp, { backgroundColor: '#570A57' }]}
          onPress={() => navigation.navigate('Transfer')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        allowFontScaling={false}
        style={{
          fontSize: headerSize,
          color: Colors['dark'].text,
          textAlign: 'left',
          fontFamily: REGULAR,
          fontWeight: '700',
          paddingVertical: 20,
        }}>
        Game
      </Text>
      <View style={styles.appWrapper}>
        <TouchableOpacity
          style={[styles.innerApp, { backgroundColor: '#570A57' }]}
          onPress={() => navigation.navigate('Lucky Game')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Lucky Game
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.innerApp, { backgroundColor: '#570A57' }]}
          onPress={() => navigation.navigate('Racing')}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: innerSize,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            Racing Game
          </Text>
        </TouchableOpacity>
        <View style={styles.innerApp}></View>
        <View style={styles.innerApp}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 6, paddingVertical: 12 },
  appWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    flexWrap: 'wrap',
  },
  innerApp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0.8,
    height: '20vh',
    width: '15%',
    padding: 13,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
    cursor: 'pointer',
  },
  searching: {
    backgroundColor: '#66347F',
  },
  marketplace: {
    backgroundColor: '#9E4784',
  },
});
