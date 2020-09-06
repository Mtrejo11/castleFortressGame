
import React, { Component, use } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const AppContext = React.createContext();


export default class AppProvider extends Component {
    state = {
        token: null,
        saveToken: async (token) => {
            try {
                const resp = await AsyncStorage.setItem('userToken', token);
                return resp;
            }
            catch (error) {
                this.setState({ error })
            }

        },
        removeToken: async () => {
            console.log('REMOVINF TOKEN');
            try {
                const resp = await AsyncStorage.removeItem('userToken');
                return resp
            }
            catch (error) {
                this.setState({ error })
            }
        },
        getToken: async () => {
            try {
                const resp = await AsyncStorage.getItem('userToken');
                return resp;
            }
            catch (error) {
                this.setState({ error })
            }
        }

    }


    componentDidMount() {
        AsyncStorage.getItem('userToken')
            .then((token) => {
                this.setState({ token })
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}