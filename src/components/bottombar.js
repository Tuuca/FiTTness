
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import auth from '@react-native-firebase/auth';

const BottomBar = ({ activeTab, setActiveTab, navigation }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]}
        onPress={() => navigation.navigate('Dieta')}
      >
        {/* <Icon
          name='bowl-mix'
          type='material-icons'
          color='#ff4d88'
        /> */}
        <Text style={styles.text}>Dieta</Text>

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
        <Text style={styles.text}>Alimentos</Text>

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
        <Text style={styles.text}>Perfil</Text>
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
        <Text style={styles.text}>Mercados</Text>
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
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#ddd',
  },
  text: {
    color: '#ff4d88',
  }
});

export default BottomBar;