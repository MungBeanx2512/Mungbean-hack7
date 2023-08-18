import React, { useContext } from 'react';
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '../constants/Colors';
import { BOLD, MEDIUM, REGULAR } from '../constants';
import { FullScreenLoadingIndicator } from '../utils';
import { LoadingContext } from '../context/LoadingContext';
import { ShyftService } from '../services/shyft.service';
import { WalletContext } from '../context/WalletContext';
import { useWallet } from '@solana/wallet-adapter-react';

const NFTDetail = ({ route }: any) => {
  const { item } = route.params;
  const { nft } = item;
  const { wallet: walletInfo }: any = useContext(WalletContext);
  const {wallet}: any = useWallet();
  const { loading, setLoading } = useContext(LoadingContext);

  const handleBuy = async() => {
    setLoading(true);
    try{
      const dataBuy = {
        nftAddress: item.nft_address,
        sellerWallet: item.seller_address,
        price: item.price,
        buyerWallet: walletInfo.address
      };
      const buyRes: any = await ShyftService.buyNFT(dataBuy);
      if(buyRes.encoded_transaction) {
        await ShyftService.signContract(buyRes.encoded_transaction,wallet.adapter);
      }
    }catch(e) {
      console.log(e)
    }finally {
      setLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      {loading && <FullScreenLoadingIndicator />}
      <View style={styles.item}>
        <Image source={nft.image_uri} style={styles.image} />
        <View style={styles.itemInfo}>
          <Text style={{
            color: 'white',
            fontSize: 32,
            fontFamily: BOLD,
          }}>{nft.name}</Text>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: MEDIUM
            }}>
            Decription: {nft?.description}
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontFamily: MEDIUM,
            }}>
            {item?.price}
            <Text
              style={{
                color: '#9548FC',
                fontSize: 20,
                fontFamily: MEDIUM,
                marginLeft: 4
              }}>
              {item?.currency_symbol}
            </Text>
          </Text>
          <Button onPress={handleBuy} title='Buy' />
        </View>
      </View>
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const scrollViewHeight = windowHeight - 150;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    maxWidth: '100vw',
    padding: 20
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    height: '60%',
    gap: 20
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    width: '35%'
  },
  image: {
    width: '60%',
    height: '100%',
    borderRadius: 12
  }
});

export default NFTDetail;
