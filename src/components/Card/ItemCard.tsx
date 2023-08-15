import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { BOLD } from '../../constants';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';
import { NFTService } from '../../services/nft.service';
import mungbean from '../../assets/mungbean.png';
import { useRoute } from '@react-navigation/native';

export default function ItemCard({ item }: any) {
  const [info, setInfo]: any = useState(null);
  const route = useRoute();

  useEffect(() => {
    (async () => {
      if (!item?.content?.files?.length && !item?.nft?.image_uri) {
        const info = await NFTService.getInfo(item.uri);
        console.log(info);
        setInfo(info);
      } else {
        setInfo(item.content?.files[0]);
      }
    })();
  }, []);

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
                color: 'red',
                fontSize: 14,
                fontFamily: BOLD,
              }}>
              {item?.price}
            </Text>
            <Image source={mungbean} style={{ width: 20, height: 20 }} />
          </View>
        )}
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
    height: '85%',
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
});
