import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants';
import { LoadingContext } from '../context/LoadingContext';
import { WalletContext } from '../context/WalletContext';
import { FullScreenLoadingIndicator } from '../utils';
import { ShyftService } from '../services/shyft.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Withdraw({ navigation }: any) {
  const { wallet, refresh }: any = useContext(WalletContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [amount, setAmount]: any = useState('');
  const handleSend = async () => {
    setLoading(true);
    const send: any = await ShyftService.withdraw(wallet.address, amount);
    const sign = await ShyftService.signWithPrivate(send.result.encoded_transaction);
    if (sign) {
      const appBalance = await AsyncStorage.getItem('appBalance');
      await AsyncStorage.setItem('appBalance', (Number(appBalance) - Number(amount)).toString());
      await refresh(0);
    }
    navigation.navigate('Home');
    setLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      {loading && <FullScreenLoadingIndicator />}
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(e) => setAmount(e)}
        placeholder="Amount"
        placeholderTextColor={Colors.dark.greyText}
      />
      <TouchableOpacity
        style={[styles.sendBtn, loading && styles.disableBtn]}
        disabled={loading}
        onPress={handleSend}>
        <Text style={styles.sendBtnText}>Withdraw</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: Colors.dark.background,
  },
  input: {
    color: Colors.dark.text,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#303030',
    width: '50%',
  },
  sendBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  sendBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disableBtn: {
    opacity: 0.2,
  },
});
