import React, { useContext, useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';
import { LoadingContext } from '../context/LoadingContext';
import { FullScreenLoadingIndicator } from '../utils';
import WormholeBridge from '@wormhole-foundation/wormhole-connect';

export const Transfer = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);

    
  }, []);

  return (
    <Screen style={styles.container}>
      <Balance />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {loading && <FullScreenLoadingIndicator />}
        <WormholeBridge />
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
});
