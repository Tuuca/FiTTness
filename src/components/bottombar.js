
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth';
import styles from '../pages/styles';

const BottomBar = ({ activeTab, setActiveTab, navigation }) => {
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
        {/* <Icon
          name='fruit-watermelon'
          type='material-icons'
          color='#ff4d88'
        /> */}
        <Text style={styles.textbottombar}>Alimentos</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 2 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Perfil')}
      >
        {/* <Icon
          name='profile'
          type='material-icons'
          color='#ff4d88'
        /> */}
        <Text style={styles.textbottombar}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 3 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Mercados')}
      >
        {/* <Icon
          name='map-marker'
          type='material-icons'
          color='#ff4d88'
        /> */}
        <Text style={styles.textbottombar}>Mercados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 4 && styles.activeTabButton]}
        onPress={() => navigation.navigate('HomeInicial')}
      >
        {/* <Icon
          name='map-marker'
          type='material-icons'
          color='#ff4d88'
        /> */}
        <Text style={styles.textbottombar}>Logout</Text>
      </TouchableOpacity>


    </View>
  );
};

export default BottomBar;