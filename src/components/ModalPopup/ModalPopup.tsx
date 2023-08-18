import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BOLD } from '../../constants';

export default function ModalPopup({ isVisible, closeModal, title, children }: any) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeModal} onPress={closeModal}>
            <Text style={{
              fontFamily: BOLD,
              fontSize: 24
            }}>X</Text>
          </TouchableOpacity>
          <Text style={{
            fontFamily: BOLD,
            fontSize: 24,
            marginBottom: 20
          }}>
            {title}
          </Text>
          {children}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    width: '80%'
  },
  closeModal: {
    position: 'absolute',
    right: 10,
    top: 4
  },
});