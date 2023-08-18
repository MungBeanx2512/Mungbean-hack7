import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import ItemCard from '../components/Card/ItemCard';
import { LoadingContext } from '../context/LoadingContext';
import { FullScreenLoadingIndicator } from '../utils';
import { useNavigation } from '@react-navigation/native';
import { ShyftService } from '../services/shyft.service';

export const Marketplace = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData]: any = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigation: any = useNavigation();

  useEffect(() => {
    setLoading(true);
    (async () => {
      const list = await ShyftService.getActiveListings();
      // const data = [
      //   {
      //     "network": "devnet",
      //     "marketplace_address": "BxRyen3PgGj5h7ENbP9PzyxiRh5ERVyac1QkDKksqEhD",
      //     "seller_address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //     "price": 200,
      //     "currency_symbol": "MBE",
      //     "nft_address": "GrunSuAGXc1LwZfrRAGiuvNtp1t61KLVAvkJzJ4sPwrd",
      //     "nft": {
      //       "name": "APC 2",
      //       "symbol": "APC 2",
      //       "royalty": 10,
      //       "image_uri": "https://gifdb.com/images/high/pe6r1851ghj1mmv7.gif",
      //       "cached_image_uri": "https://cdn.shyft.to/img/https%253A%252F%252Fnftstorage.link%252Fipfs%252Fbafkreihfbd6dxdh5ggbjrwfqdrfqp67h7yn3ls3fkye5x4ovms4e5xtexu",
      //       "animation_url": "",
      //       "cached_animation_url": "",
      //       "metadata_uri": "https://nftstorage.link/ipfs/bafkreifqgablzvf2xx6yjcdotfssfhnehi7k7jtadcqm22novnmf22gdpm",
      //       "description": "APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2APC 2",
      //       "mint": "GrunSuAGXc1LwZfrRAGiuvNtp1t61KLVAvkJzJ4sPwrd",
      //       "owner": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "update_authority": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "creators": [
      //         {
      //           "address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //           "share": 100,
      //           "verified": true
      //         }
      //       ],
      //       "collection": {},
      //       "attributes": {},
      //       "attributes_array": [],
      //       "files": [
      //         {
      //           "uri": "https://nftstorage.link/ipfs/bafkreihfbd6dxdh5ggbjrwfqdrfqp67h7yn3ls3fkye5x4ovms4e5xtexu",
      //           "type": "image/jpeg"
      //         }
      //       ],
      //       "external_url": "",
      //       "is_loaded_metadata": true,
      //       "primary_sale_happened": false,
      //       "is_mutable": true,
      //       "token_standard": "NonFungible",
      //       "is_compressed": false
      //     },
      //     "list_state": "3eiaPiiCmXoCzJABq1vYAnwBDXzfsHDS8DRTz5BvbGr4",
      //     "status": "active",
      //     "created_at": "2023-06-12T02:05:50.000Z",
      //     "receipt": "6vtVmjjNp8P4oFoYoZSjmwio81HDwVDzSAbYF9nvFjux"
      //   },
      //   {
      //     "network": "devnet",
      //     "marketplace_address": "BxRyen3PgGj5h7ENbP9PzyxiRh5ERVyac1QkDKksqEhD",
      //     "seller_address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //     "price": 200,
      //     "currency_symbol": "MBE",
      //     "nft_address": "6UQP11U8fcL21542okj7hKWGJPd7bTYKEWuxctf1AiLT",
      //     "nft": {
      //       "name": "Chung",
      //       "symbol": "Chung",
      //       "royalty": 10,
      //       "image_uri": "https://nftstorage.link/ipfs/bafkreiare34pw4qgx3wndozvx3hh73u2zzpicvdtlq7bazi6zbrn7zxwym",
      //       "cached_image_uri": "https://cdn.shyft.to/img/https%253A%252F%252Fnftstorage.link%252Fipfs%252Fbafkreiare34pw4qgx3wndozvx3hh73u2zzpicvdtlq7bazi6zbrn7zxwym",
      //       "animation_url": "",
      //       "cached_animation_url": "",
      //       "metadata_uri": "https://nftstorage.link/ipfs/bafkreidq4c5ywxmg2iwqr3cjaaudzo2el2wci6dgzwuk3kxjsnb6hsum3y",
      //       "description": "Chung",
      //       "mint": "6UQP11U8fcL21542okj7hKWGJPd7bTYKEWuxctf1AiLT",
      //       "owner": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "update_authority": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "creators": [
      //         {
      //           "address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //           "share": 100,
      //           "verified": true
      //         }
      //       ],
      //       "collection": {},
      //       "attributes": {},
      //       "attributes_array": [],
      //       "files": [
      //         {
      //           "uri": "https://nftstorage.link/ipfs/bafkreiare34pw4qgx3wndozvx3hh73u2zzpicvdtlq7bazi6zbrn7zxwym",
      //           "type": "image/jpeg"
      //         }
      //       ],
      //       "external_url": "",
      //       "is_loaded_metadata": true,
      //       "primary_sale_happened": false,
      //       "is_mutable": true,
      //       "token_standard": "NonFungible",
      //       "is_compressed": false
      //     },
      //     "list_state": "Gqvvsg2m5g4oBiDVqknHCYkgqoVTaWfEWYRDZekDsKE3",
      //     "status": "active",
      //     "created_at": "2023-06-12T02:07:37.000Z",
      //     "receipt": "8wNy1XsgjpkWkENm5pzVbSYEGzxinYjVkc2n8iuB3bh4"
      //   },
      //   {
      //     "network": "devnet",
      //     "marketplace_address": "BxRyen3PgGj5h7ENbP9PzyxiRh5ERVyac1QkDKksqEhD",
      //     "seller_address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //     "price": 200,
      //     "currency_symbol": "MBE",
      //     "nft_address": "9bHeoKaM22d7EGaco8RCY85KuquEu8TeLSDWatvs65F8",
      //     "nft": {
      //       "name": "My",
      //       "symbol": "My",
      //       "royalty": 10,
      //       "image_uri": "https://nftstorage.link/ipfs/bafkreia7wyp26pbcc6oh3mvmsgk55xv6jxmgnpe5pwd6hr6kpqdxvpc6tu",
      //       "cached_image_uri": "https://cdn.shyft.to/img/https%253A%252F%252Fnftstorage.link%252Fipfs%252Fbafkreia7wyp26pbcc6oh3mvmsgk55xv6jxmgnpe5pwd6hr6kpqdxvpc6tu",
      //       "animation_url": "",
      //       "cached_animation_url": "",
      //       "metadata_uri": "https://nftstorage.link/ipfs/bafkreid4sofuitlwwbqnszikjzc42qiizblvy5ptf4k5eaqteghzi6fnja",
      //       "description": "My",
      //       "mint": "9bHeoKaM22d7EGaco8RCY85KuquEu8TeLSDWatvs65F8",
      //       "owner": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "update_authority": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "creators": [
      //         {
      //           "address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //           "share": 100,
      //           "verified": true
      //         }
      //       ],
      //       "collection": {},
      //       "attributes": {},
      //       "attributes_array": [],
      //       "files": [
      //         {
      //           "uri": "https://nftstorage.link/ipfs/bafkreia7wyp26pbcc6oh3mvmsgk55xv6jxmgnpe5pwd6hr6kpqdxvpc6tu",
      //           "type": "image/png"
      //         }
      //       ],
      //       "external_url": "",
      //       "is_loaded_metadata": true,
      //       "primary_sale_happened": false,
      //       "is_mutable": true,
      //       "token_standard": "NonFungible",
      //       "is_compressed": false
      //     },
      //     "list_state": "Dw61u3Sf91Biu9qpFFN5SRDD49XLJcZMma61hEZd4jhC",
      //     "status": "active",
      //     "created_at": "2023-06-12T12:48:14.000Z",
      //     "receipt": "EAnm6BsVLbSTKuaCcV4SjnhsYbFZUk1G4BvDwn5k2kWs"
      //   },
      //   {
      //     "network": "devnet",
      //     "marketplace_address": "BxRyen3PgGj5h7ENbP9PzyxiRh5ERVyac1QkDKksqEhD",
      //     "seller_address": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //     "price": 200,
      //     "currency_symbol": "MBE",
      //     "nft_address": "B2GmmXGQom8KoFNmcFYewvUHisBGZP7KfobP4NXt7ZEz",
      //     "nft": {
      //       "name": "APC First Collection",
      //       "symbol": "APC",
      //       "royalty": 10,
      //       "image_uri": "https://nftstorage.link/ipfs/bafkreicatza4nt5la2rsa3yzifgn5hcekza6h4j65lot5o63jstbeoewkq",
      //       "cached_image_uri": "https://cdn.shyft.to/img/https%253A%252F%252Fnftstorage.link%252Fipfs%252Fbafkreicatza4nt5la2rsa3yzifgn5hcekza6h4j65lot5o63jstbeoewkq",
      //       "animation_url": "",
      //       "cached_animation_url": "",
      //       "metadata_uri": "https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee",
      //       "description": "APC First Collection",
      //       "mint": "B2GmmXGQom8KoFNmcFYewvUHisBGZP7KfobP4NXt7ZEz",
      //       "owner": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "update_authority": "2EDW3poG156KuZxN9jdgGVsLkKvBjnaRyod2ymxDRALd",
      //       "creators": [
      //         {
      //           "address": "EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m",
      //           "share": 100,
      //           "verified": true
      //         }
      //       ],
      //       "collection": {},
      //       "attributes": {},
      //       "attributes_array": [],
      //       "files": [
      //         {
      //           "uri": "https://nftstorage.link/ipfs/bafkreicatza4nt5la2rsa3yzifgn5hcekza6h4j65lot5o63jstbeoewkq",
      //           "type": "image/png"
      //         }
      //       ],
      //       "external_url": "",
      //       "is_loaded_metadata": true,
      //       "primary_sale_happened": false,
      //       "is_mutable": false,
      //       "token_standard": "NonFungibleEdition",
      //       "is_compressed": false
      //     },
      //     "list_state": "Dd99So9xGGVRfbVkvA1scoHyHqmE85kCUNx85UuiNpcZ",
      //     "status": "active",
      //     "created_at": "2023-07-05T14:03:25.000Z",
      //     "receipt": "Cifu6U3L7xd9RvoRFV19D5FAULoytdvd7LajwB719gjZ"
      //   }
      // ]
      setData(list.data);
      setLoading(false);
    })();
  }, []);

  const navigateToDetail = (item: any) => {
    navigation.navigate('NFT Detail', { item });
  }

  return (
    <Screen style={styles.container}>
      <Balance />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appWrapper}>
          {loading && <FullScreenLoadingIndicator />}
          {data && data.map((item: any, idx: number) => (
            <TouchableOpacity
              key={idx}
              onPress={() => navigateToDetail(item)}>
              <ItemCard item={item} />
            </TouchableOpacity>
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
  scrollViewContent: {
    height: scrollViewHeight,
    paddingVertical: 10,
  },
  appWrapper: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
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
