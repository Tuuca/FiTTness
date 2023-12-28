import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },

    title: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#fff',
    },

    link: {
        color: '#1ff',
        textDecorationLine: 'underline',
    },

    TextInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
        margin: 5,
        color: '#000',
    },

    button: {
        width: '70%',
        height: 40,
        backgroundColor: '#2c9cf4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
    },

    buttonDelete: {
        width: '70%',
        height: 40,
        backgroundColor: '#f44',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
    },

    buttonUpdate: {
        width: '70%',
        height: 40,
        backgroundColor: '#2cf',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        margin: 5,
    },

    listaDietasItem: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
        borderRadius: 10,
    },

    detalhesAlimentoContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#bbb',
        borderRadius: 10,
    },

    detalhesAlimentoItem: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },

    dietaContainer: {
        marginBottom: 20,
        padding: 10,
        borderColor: 'black 2px solid',
        borderRadius: 10,
        backgroundColor: '#fff'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 390,
        height: 40,
    },

    buttonText: {
        fontSize: 16,
        color: '#fff',
    },

    picker: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },

    scrollView: {
        width: '100%',
        marginBottom: 60,
    },

    alimentoItem: {
        backgroundColor: '#ddd',
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },

    alimentoNome: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },

    map: {
        flex: 1,
        width: '100%',
    },

    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        padding: 20,
    },

    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 10,  // Adicionado marginBottom para ajustar a posição
    },

    userName: {
        color: 'white',
        marginBottom: 10,  // Adicionado marginBottom para ajustar a posição
    },

    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
    },

    gridItem: {
        flex: 1,
        backgroundColor: '#EEE',
        padding: 10,
        marginHorizontal: 1,
    },

    infoLabel: {
        fontWeight: 'bold',
        color: 'black',
    },

    infoText: {
        color: 'black',
    },

    gridRowBaixo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
    },

    gridItemBaixo: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        padding: 10,
        marginHorizontal: 1,
    },

    bottombar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#222',
        borderTopWidth: 1,
        borderTopColor: '#fff',
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
        backgroundColor: '#222',
    },

    activeTabButton: {
        backgroundColor: '#ddd',
    },

    textbottombar: {
        fontSize: 17,
        color: '#fff',
    },

});

export default styles;