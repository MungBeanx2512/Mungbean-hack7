import React, { useEffect, useState } from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { BOLD, MEDIUM } from '../../constants';
import { NFTService } from '../../services/nft.service';
import { useRoute } from '@react-navigation/native';
import ModalPopup from '../ModalPopup/ModalPopup';

export default function ItemCard({ item, handleListing }: any) {
  const [info, setInfo] = useState<any>(null);
  const [price, setPrice] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const route = useRoute();

  useEffect(() => {
    (async () => {
      if (!item?.content?.files?.length && !item?.nft?.image_uri) {
        const info = await NFTService.getInfo(item.uri);
        setInfo(info);
      } else {
        setInfo(item.content?.files[0]);
      }
    })();
  }, []);

  const handleShowPopUp = (type: boolean) => {
    return setShowPopup(type);
  }

  return (
    <View style={styles.cardWrapper}>
      <Image source={info?.uri || info?.image || item?.nft?.image_uri} style={styles.image} />
      <View style={route.name === 'Marketplace' && styles.marketBottomCard}>
        <Text
          style={{
            color: Colors.dark.text,
            fontSize: 14,
            fontFamily: BOLD,
            textAlign: 'center',
          }}>
          {item?.content?.metadata?.name || item?.nft?.name || info?.name}
        </Text>
        {item?.price && (
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <Text
              style={{
                color: Colors.dark.text,
                fontSize: 14,
                fontFamily: BOLD,
              }}>
              {item?.price}
            </Text>
            <Text
              style={{
                color: '#9548FC',
                fontSize: 14,
                fontFamily: BOLD,
                marginLeft: 4
              }}>
              {item?.currency_symbol}
            </Text>
            {/* <Image source={mungbean} style={{ width: 20, height: 20 }} /> */}
          </View>
        )}
        {route.name === 'Profile' &&
          <>
            <View style={{ marginTop: 10 }}>
              <Button onPress={() => handleShowPopUp(true)} title='Listing' />
            </View>
            <ModalPopup title={'List NFT'} isVisible={showPopup} closeModal={() => handleShowPopUp(false)}>
              <View style={styles.listItem}>
                <label style={styles.listingLabel}>Price</label>
                <input style={styles.listingInput} value={price} onChange={(e)=>setPrice(e.currentTarget.value)}/>
              </View>
              <View style={styles.listItem}>
                <label style={styles.listingLabel}>NFT Address</label>
                <input style={styles.listingInput} value={item.mintAddress} disabled />
              </View>
              <Button onPress={()=>{
                handleListing({...item, price,})
                handleShowPopUp(false)
              }} title='Listing' />
            </ModalPopup>
          </>
        }
      </View>
    </View>
  );
}

const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    // width: isMobile ? widthPercentageToDP('45%') : widthPercentageToDP('15%'),
    width: '40vw',
    height: '45vh',
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.dark.text,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

  },
  marketBottomCard: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },
  listingLabel: {
    fontFamily: MEDIUM,
    fontSize: 18,
    width: 120
  },
  listingInput: {
    flex: 1
  }
});
