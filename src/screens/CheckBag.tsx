import React, { Fragment, useContext, useState } from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import ItemCard from '../components/Card/ItemCard';
import HeliusService from '../services/helius.service';
import { LoadingContext } from '../context/LoadingContext';
import { FullScreenLoadingIndicator } from '../utils';

export const CheckBag = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData]: any = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await HeliusService.getProfile(searchValue);
      setData(response);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Screen style={styles.container}>
      <Balance />
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.innerSearch}
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Wallet Address"
          placeholderTextColor={Colors.dark.greyText}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appWrapper}>
          {loading && <FullScreenLoadingIndicator />}
          {data &&
            data.items.map((item: any, idx: number) => (
              <Fragment key={idx}>
                <ItemCard item={item} />
              </Fragment>
            ))}
        </View>
      </ScrollView>
    </Screen>
  );
};

const windowHeight = Dimensions.get('window').height;
const scrollViewHeight = windowHeight - 150;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    display: 'flex',
    flexDirection: 'column',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  scrollViewContent: {
    height: scrollViewHeight,
    paddingVertical: 10,
  },
  appWrapper: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  innerSearch: {
    color: Colors.dark.text,
    paddingHorizontal: 10,
    flexGrow: 1,
    height: '100%',
    borderWidth: 1,
    borderColor: '#303030',
    marginRight: 20,
  },
  searchBtn: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  searchBtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
