// import React, { Component } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// class Login extends Component {
//   state = {
//     username: '',
//     password: '',
//   };

//   handleUsernameChange = (username) => {
//     this.setState({ username });
//   };

//   handlePasswordChange = (password) => {
//     this.setState({ password });
//   };

//   handleLogin = () => {
    
//   };

//   render() {
//     const { username, password } = this.state;

//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Login</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Nome de usuário"
//           value={username}
//           onChangeText={this.handleUsernameChange}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Senha"
//           secureTextEntry
//           value={password}
//           onChangeText={this.handlePasswordChange}
//         />
//         <Button title="Entrar" onPress={this.handleLogin} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   input: {
//     height: 40,
//     width: '80%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginTop: 8,
//     marginBottom: 8,
//     paddingLeft: 8,
//     paddingRight: 8,
//   },
// });

// export default Login;