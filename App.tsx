// import Navigation from './navigation';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
  Modal,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import Navbar from './src/components/navbar/navbar';

type Product = {
  nome: string;
  preco: string;
  fibra: string;
  caloria: string;
  gordura: string;
  proteina: string;
  carboidrato: string;
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [alimentos, setProducts] = useState<Product[]>([]);
  const [alimentoNome, setProductNome] = useState('');
  const [alimentoPreco, setProductPreco] = useState('');
  const [alimentoCaloria, setProductCaloria] = useState('');
  const [alimentoProteina, setProductProteina] = useState('');
  const [alimentoCarboidrato, setProductCarboidrato] = useState('');
  const [alimentoGordura, setProductGordura] = useState('');
  const [alimentoFibra, setProductFibra] = useState('');
  const [editingProductIndex, setEditingProductIndex] = useState<number | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProduct = () => {
    if (
      alimentoNome &&
      alimentoPreco &&
      alimentoFibra &&
      alimentoCaloria
    ) {
      const newProduct: Product = {
        nome: alimentoNome,
        preco: alimentoPreco,
        caloria: alimentoCaloria,
        proteina: alimentoProteina,
        carboidrato: alimentoCarboidrato,
        gordura: alimentoGordura,
        fibra: alimentoFibra,
      };
      setProducts([...alimentos, newProduct]);
      setProductNome('');
      setProductPreco('');
      setProductCaloria('');
      setProductProteina('');
      setProductCarboidrato('');
      setProductGordura('');
      setProductFibra('');
    }
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...alimentos];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleEditProduct = (index: number) => {
    setEditingProductIndex(index);
    setIsModalVisible(true);
  };

  const handleSaveProduct = () => {
    if (
      alimentoNome &&
      alimentoPreco &&
      alimentoFibra &&
      alimentoCaloria &&
      editingProductIndex !== null
    ) {
      const newProducts = [...alimentos];
      newProducts[editingProductIndex] = {
        nome: alimentoNome,
        preco: alimentoPreco,
        caloria: alimentoCaloria,
        proteina: alimentoProteina,
        carboidrato: alimentoCarboidrato,
        gordura: alimentoGordura,
        fibra: alimentoFibra,
      };
      setProducts(newProducts);
      setProductNome('');
      setProductPreco('');
      setProductCaloria('');
      setProductProteina('');
      setProductCarboidrato('');
      setProductGordura('');
      setProductFibra('');
      setEditingProductIndex(null);
      setIsModalVisible(false);
    }
  };

  const renderProductItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <View style={styles.alimentoItem}>
      <Text style={styles.alimentoNome}>{item.nome}</Text>
      <Text style={styles.alimentoPreco}>Preço: {item.preco}</Text>
      <Text style={styles.alimentoCaloria}>Calorias: {item.caloria}</Text>
      <Text style={styles.alimentoFibra}>Proteinas: {item.proteina}</Text>
      <Text style={styles.alimentoFibra}>
        Carboidratos: {item.carboidrato}
      </Text>
      <Text style={styles.alimentoFibra}>Gorduras: {item.gordura}</Text>
      <Text style={styles.alimentoFibra}>Fibras: {item.fibra}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditProduct(index)}>
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveProduct(index)}>
          <Text style={styles.removeButtonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text style={styles.sectionTitle}>Cadastro de alimentos</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nome do alimento"
              value={alimentoNome}
              onChangeText={(text) => setProductNome(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Preço do alimento"
              value={alimentoPreco}
              onChangeText={(text) => setProductPreco(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Calorias do alimento"
              value={alimentoCaloria}
              onChangeText={(text) => setProductCaloria(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Proteinas do alimento"
              value={alimentoProteina}
              onChangeText={(text) => setProductProteina(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Carboidratos do alimento"
              value={alimentoCarboidrato}
              onChangeText={(text) => setProductCarboidrato(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Gorduras do alimento"
              value={alimentoGordura}
              onChangeText={(text) => setProductGordura(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Fibras do alimento"
              value={alimentoFibra}
              onChangeText={(text) => setProductFibra(text)}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddProduct}>
              <Text style={styles.addButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={alimentos}
            renderItem={renderProductItem}
            keyExtractor={(item, index) => `${item.nome}-${index}`}
          />
          <Navbar />
          <Modal visible={isModalVisible} animationType="slide">
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar alimento</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nome do alimento"
                value={alimentoNome}
                onChangeText={(text) => setProductNome(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Preço do alimento"
                value={alimentoPreco}
                onChangeText={(text) => setProductPreco(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Calorias do alimento"
                value={alimentoCaloria}
                onChangeText={(text) => setProductCaloria(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Proteinas do alimento"
                value={alimentoProteina}
                onChangeText={(text) => setProductProteina(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Carboidratos do alimento"
                value={alimentoCarboidrato}
                onChangeText={(text) => setProductCarboidrato(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Gorduras do alimento"
                value={alimentoGordura}
                onChangeText={(text) => setProductGordura(text)}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Fibras do alimento"
                value={alimentoFibra}
                onChangeText={(text) => setProductFibra(text)}
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleSaveProduct}>
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    margin: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alimentoItem: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  alimentoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  alimentoPreco: {
    fontSize: 16,
    marginBottom: 4,
  },
  alimentoFibra: {
    fontSize: 16,
    marginBottom: 4,
  },
  alimentoCaloria: {
    fontSize: 16,
    marginBottom: 4,
  },
  removeButton: {
    backgroundColor: 'red',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  modalButton: {
    backgroundColor: 'blue',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;