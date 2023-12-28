
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../pages/styles';

const BottomBar = ({ activeTab, navigation }) => {
  return (
    <View style={styles.bottombar}>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Dieta')}
      >

        <Text style={styles.textbottombar} >Dieta</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 1 && styles.activeTabButton]}
        onPress={() => navigation.navigate('AlimentosCrud')}
      >
        <Text style={styles.textbottombar}>Alimentos</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 2 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Perfil')}
      >
        <Text style={styles.textbottombar}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 3 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Mercados')}
      >
        <Text style={styles.textbottombar}>Mercados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 4 && styles.activeTabButton]}
        onPress={() => navigation.navigate('HomeInicial')}
      >
        <Text style={styles.textbottombar}>Logout</Text>
      </TouchableOpacity>


    </View>
  );
};

export default BottomBar;