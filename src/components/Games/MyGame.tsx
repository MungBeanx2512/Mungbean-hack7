import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Button,
  Text,
  Animated,
} from 'react-native';

import dice1 from '../../assets/dice/dice1.png';
import dice2 from '../../assets/dice/dice2.png';
import dice3 from '../../assets/dice/dice3.png';
import dice4 from '../../assets/dice/dice4.png';
import dice5 from '../../assets/dice/dice5.png';
import dice6 from '../../assets/dice/dice6.png';

import ban from '../../assets/avatar/ban.jpg';
import nguoikhac from '../../assets/avatar/nguoikhac.jpg';
import { Balance } from '../Balance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WalletContext } from '../../context/WalletContext';

export default function MyGame() {
  const [player1Number, setPlayer1Number] = useState<number | null>(null);
  const [player2Number, setPlayer2Number] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const randomImages = [dice1, dice2, dice3, dice4, dice5, dice6];
  const [image1, setImage1] = useState(randomImages[0]);
  const [image2, setImage2] = useState(randomImages[1]);
  const [number, setNumber] = useState('');
  const [diceAnimation] = useState(new Animated.Value(0));
  const [myChoose, setMyChoose] = useState('');
  const [winner, setWinner] = useState<string | boolean>(false)
  const { setWallet } = useContext(WalletContext);

  const generateRandomNumber = (choose: string) => {
    setMyChoose(choose);
    setIsLoading(true);
    setIsButtonDisabled(true);
    setPlayer1Number(null);
    setPlayer2Number(null);

    setTimeout(() => {
      const player1 = Math.floor(Math.random() * 6) + 1;
      const player2 = Math.floor(Math.random() * 6) + 1;
      setPlayer1Number(player1);
      setPlayer2Number(player2);
      setImage1(randomImages[player1 - 1]);
      setImage2(randomImages[player2 - 1]);

      setIsLoading(false);
      setIsButtonDisabled(false);
      if (player1 > player2) {
        setWinner('player');
      } else if (player1 < player2) {
        setWinner('banker');
      }

      handleWallet(choose === winner);
    }, 2000);
  };

  const determineWinner = (): string => {
    if (player1Number === null || player2Number === null) {
      return '';
    }
    let winner = '';

    if (player1Number > player2Number) {
      winner = 'player';
    } else if (player1Number < player2Number) {
      winner = 'banker';
    }
    switch (winner) {
      case 'player':
        return 'Player win!';
        break;
      case 'banker':
        return 'Banker win!';
        break;
      default:
        return 'Tie!';
    }
  };

  const handleWallet = async (type: boolean) => {
    const currentBalance = await AsyncStorage.getItem('appBalance');
    let newBalance = 0;
    if (type) {
      newBalance = Number(currentBalance) + 0.1;
    } else {
      newBalance = Number(currentBalance) - 0.1;
    }

    await AsyncStorage.setItem('appBalance', JSON.stringify(newBalance));
    setWallet((prev: any) => ({
      ...prev,
      appBalance: newBalance.toFixed(2),
    }));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      position: 'relative',
    },
    leftHalf: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightHalf: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playerContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    playerImageU: {
      width: 150,
      height: 150,
      borderRadius: 75,
      marginBottom: '0px',
    },
    playerName: {
      fontFamily: 'Futura-Medium',
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 10,
    },
    diceImage: {
      marginTop: 10,
      width: 100,
      height: 100,
    },
    resultContainer: {
      alignItems: 'center',
      position: 'absolute',
      zIndex: 9999,
      left: '50%',
      top: '50%',
      transform: [{translateX: -50},{translateY: 25}],
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#ccc',
    },
    resultText: {
      fontSize: 30,
      color: 'white',
      textAlign: 'center'
    },
    loading: {
      transform:[{translateX:-25}, {translateY:25}]
    },
    hasResult: {
      transform:[{translateX: -75}]
    },
    buttonContainer: {
      marginRight: 700,
      marginTop: 20,
      alignSelf: 'center',
    },
    diceContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    playerImageCompu: {
      width: 150,
      height: 150,
      borderRadius: 75,
    },
  });

  return (
    <>
      <Balance />
      <View style={styles.container}>
            <View style={[styles.resultContainer,isLoading && styles.loading,winner && styles.hasResult]}>
              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="black"
                />
              ) : (
                <Text style={styles.resultText}>Result: <br/>{determineWinner()}</Text>
              )}
            </View>
        <View style={styles.leftHalf}>
          <View style={[styles.playerContainer]}>
            <Image style={styles.playerImageU} source={ban} />
            <Text style={styles.playerName}>Player</Text>
            {/* <Text style={styles.playerName}>Choose Value</Text> */}
            {/* <View>
            <select  name="coin" id="coin">
              <option value='coin'>1SOL</option>
              <option value="coin">5SOL</option>
              <option value="coin">10SOL</option>
              <option value="coin">50SOL</option>
            </select>
          </View> */}
            <Animated.Image style={styles.diceImage} source={image1} />
            <Text style={styles.playerName}>Score: {player1Number}</Text>
          </View>
        </View>
        <View style={styles.rightHalf}>
          <View style={[styles.playerContainer]}>
            <Image style={styles.playerImageCompu} source={nguoikhac} />
            <Text style={styles.playerName}>Banker</Text>
            <View style={styles.diceContainer}>
              <Image style={styles.diceImage} source={image2} />
              <Text style={styles.playerName}>Score: {player2Number}</Text>
            </View>
          </View>
        </View>
        <View style={{ position: 'absolute', left: '45.5%', top: '70%' }}>
          <View style={[styles.buttonContainer, { borderRadius: 12, overflow: 'hidden' }]}>
            <Button
              title="Banker"
              onPress={() => generateRandomNumber('banker')}
              disabled={isButtonDisabled}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="0.1 SOL" disabled={true} />
          </View>
          <View style={[styles.buttonContainer, { borderRadius: 12, overflow: 'hidden' }]}>
            <Button
              title="Player"
              onPress={() => generateRandomNumber('player')}
              disabled={isButtonDisabled}
            />
          </View>
        </View>
      </View>
    </>
  );
}
