import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5A94F2',
    },
    infoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#555',
        width: 300,
        height: 620,
        padding: 10,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 10,
    },
    userName: {
        color: 'white',
        marginBottom: 10,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2,
    },
    gridItem: {
        flex: 1,
        backgroundColor: '#2E2E2E',
        padding: 10,
        marginHorizontal: 1,
    },
    infoLabel: {
        fontWeight: 'bold',
        color: 'white',
    },
    infoText: {
        color: 'white',
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


    title: {
        fontStyle: 'Century Gothic',
        fontSize: 55,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },
    Button: {
        backgroundColor: '#62626E',
        width: 100,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
        color: 'black',
    },
    modalInput: {
        width: '80%',
        height: 40,
        color: 'black',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default styles;