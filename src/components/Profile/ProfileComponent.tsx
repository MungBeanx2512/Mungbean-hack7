import { useNavigation, useRoute } from '@react-navigation/native';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';

import { Colors, BOLD } from '../../constants';
import { LoadingContext } from '../../context/LoadingContext';
import { WalletContext } from '../../context/WalletContext';
import { ShyftService } from '../../services/shyft.service';
import { FullScreenLoadingIndicator } from '../../utils';
import ItemCard from '../Card/ItemCard';

export const ProfileComponent = ({ navigation }: any) => {
  const { wallet: walletInfo } = useContext(WalletContext);
  const { publicKey } = useWallet();
  const wallet = useWallet();
  const [userProfile, setUserProfile]: any = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);

  const handleListing = async (item: any) => {
    try {
      // console.log(item)
      // console.log(publicKey);
      const sellerWallet = walletInfo?.address;
      const { encoded_transaction } = await ShyftService.listing({
        nftAddress: item.mintAddress,
        price: Number(item.price),
        sellerWallet,
      });
      if (encoded_transaction) {
        await ShyftService.signContract(encoded_transaction, wallet);
      }
      navigation.navigate('Marketplace');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (walletInfo?.address) {
        const userProfile = await ShyftService.getProfile(walletInfo.address);
        // const userProfile = [
        //   {
        //     model: 'metadata',
        //     address: '2qahsSohxXTHVFy1VTjob2SWwfZvUKtsTQfFxGzzHa72',
        //     mintAddress: 'HZyr2ASiGECwhtY25pXR1H2eH5zHidEWDW4p1bDJPaBj',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'BogS7r7gFU7uqhBpEzxKPkbYUpKfpQkg2P8Zk6WAcDNc',
        //     mintAddress: '4iLsBZ78pxJZwvqSBLiaRPJWa4UJN2wfKwabyKFiUj5K',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '7rvHzsqMJjwYqkKsxaj8mw5GFwiT2FtZCJfRsFFNYpjf',
        //     mintAddress: 'DtrriexpZghE9Xv3CHu4HsAJwBUncFC6q1ESgUWx35ku',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: true,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 0,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '41xwTEEnwEmGv3aACKLSLiJUCQG5z4wQ1EPMX9jVfcgr',
        //     mintAddress: '7P8dEVEBdHg4kCVnrZkRww6fgAFSxv5nGBEWSvy1ejRJ',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 252,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'Ayfy13fB5UNvY4VdEFFo8zGfNKM2qyuEGVZqvy8Zht2W',
        //     mintAddress: 'GJQXX7fPSG2YVLyAN49BUnfvRHeESdPcJJmms5udrr8d',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 253,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'J1v9HGtgLebQYWR3bpLrnGKrUvjdDCoZe3BY1MBytJbY',
        //     mintAddress: 'C2auejpUGXHAZ3sSMhAB8q4vxRNKbTNKeYS21BzEU727',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'BLwB88Kpm3x18yrk3gFGxXusy9TFfaopR48Kwau5uVY',
        //     mintAddress: 'CHbMCfe67mQGKyM7R1qz2L8YkKWdSteiNm1CTVgWD9pP',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC 2',
        //     symbol: 'APC 2',
        //     uri: 'https://nftstorage.link/ipfs/bafkreibfrzipvzdasfztdkbpaekhruqxldrd2mxgznooyv6tnyapkewl2y',
        //     isMutable: true,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 0,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '4GY6qgM23AjKkmxUuq4ELxHDj5Cx3yM7pm7vaTBFBnDf',
        //     mintAddress: '3ZZtDBQDJbuyM4mJQG4qGBHtZxnzd6HCRsTs6gtnk5J7',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 254,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'EAiXaura4oiaNxDbLpxKtDNj8bVeBcF5norPn2hAudXY',
        //     mintAddress: '86BSWNNFEPPyLnwZ86aX9RpMdyNgxZr5wsGnPu2U2wct',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 254,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '9HPzQwqsxR2mEkcr5Y5bLDEGJXAXqdsXk5PREMW5xJf2',
        //     mintAddress: 'aW2JJ5FU1JRXLFWRSof7ctWyriRsWoqUe3jErWFNDua',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 254,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '8xTESmEQ5HCCSE3jXs9vXyjPG58fvSJbua3c4ry1NYXP',
        //     mintAddress: 'FuxxsyrNkpAvSrSKkJGpVsd8jx38EU8sAcK3Cz5Jm3Dd',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 253,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: 'GbYm2t9Jk9HLX2syjUyLxcsFhCZRSUgWPVpkYvMq19J7',
        //     mintAddress: '4KgTBnZYfZqVva8Rh8rvYir9vGxnJJcKkAEKDh8Xqoai',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC First Collection',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreig2s4q357ophttk6435rwsfy6lqu2eusctrgwmtgklas43yr2rxee',
        //     isMutable: false,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 251,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 3,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        //   {
        //     model: 'metadata',
        //     address: '7ikkLZ2H6UCnzBb3CBj34bEsZFsCuK1wtAoL6bxHgJt5',
        //     mintAddress: 'BhitxNWrfyuR1ozfJWyokxnAD9a8Vnhs8aSBFBuLrfbS',
        //     updateAuthorityAddress: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //     json: null,
        //     jsonLoaded: false,
        //     name: 'APC 2',
        //     symbol: 'APC',
        //     uri: 'https://nftstorage.link/ipfs/bafkreihkuel65tzmdphxm46npdysanmq7g75ythbr6omunczikc2pv4ufe',
        //     isMutable: true,
        //     primarySaleHappened: false,
        //     sellerFeeBasisPoints: 1000,
        //     editionNonce: 255,
        //     creators: [
        //       {
        //         address: 'EbGWwCXS4YqRp2Kq7cYPuFmJsboPwJv4KeoyrV3cW45m',
        //         verified: true,
        //         share: 100,
        //       },
        //     ],
        //     tokenStandard: 0,
        //     collection: null,
        //     collectionDetails: null,
        //     uses: null,
        //   },
        // ];
        setUserProfile(userProfile);
        setLoading(false);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      {loading && <FullScreenLoadingIndicator />}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text
            style={{
              color: Colors.dark.text,
              fontSize: 20,
              paddingLeft: 5,
              fontFamily: BOLD,
            }}>
            NFT
          </Text>
          <View style={styles.listWrapper}>
            {userProfile &&
              userProfile.map((item: any, idx: number) => (
                <Fragment key={idx}>
                  <ItemCard handleListing={(item: any) => handleListing(item)} item={item} />
                </Fragment>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const scrollViewHeight = windowHeight - 170;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    width: '100%',
  },
  scrollViewContent: {
    height: scrollViewHeight,
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
});
