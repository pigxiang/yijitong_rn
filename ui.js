/**
 * Created by TianXX on 2017/4/25.
 */

import React, {Component} from "react";
import {AsyncStorage, Button, StatusBar, StyleSheet, Text, TextInput, ToolbarAndroid, View} from "react-native";
import {attendance, clientLogin, realLogin, spawn} from "./yjt.js";

import native from "./nativeModules";


export default class UI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            iccid: '',
            console: '一起呵呵7笑',
        };
        this._console = this._console.bind(this)
    }

    componentDidMount() {
        this._restoreData();
    }

    async _restoreData() {
        let newState = {};
        for (let key in this.state) {
            newState[key] = await AsyncStorage.getItem(key)
        }
        this.setState(newState);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={themeColor}

                />
                <ToolbarAndroid
                    // logo={require('./res/logo.png')}
                    title="翼鷄通"
                    style={{
                        height: 40,
                        backgroundColor: themeColor,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    // actions={[{title: 'Settings', icon: require('./icon_settings.png'), show: 'always'}]}
                    // onActionSelected={this.onActionSelected}
                />
                <View style={styles.pair}>
                    <Text style={styles.text}>Phone: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({phone: text})}
                        value={this.state.phone}
                    />
                </View>
                <View style={styles.pair}>
                    <Text style={styles.text}>Password: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({password: text})}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.pair}>
                    <Text style={styles.text}>ICCID: </Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({iccid: text})}
                        value={this.state.iccid}
                    />
                    <Button style={styles.getIccid} title="GET" onPress={this._getIccid}/>
                </View>
                <Text style={styles.console} ref="console">{this.state.console}</Text>
                <Button
                    style={styles.go}
                    onPress={this._go}
                    title="GO"
                    color={themeColor}
                    // accessibilityLabel="Learn more about this purple button"
                />
            </View>
        )
    }

    _go = (event) => {
        spawn(this.state.phone, this.state.password, this.state.iccid, 1, this._console)
            .then(clientLogin)
            .then(realLogin)
            .then(attendance)

        this._saveData();

    }

    _saveData() {
        for (let key  in this.state) {
            AsyncStorage.setItem(key, this.state[key]);
        }
    }

    _getIccid = event => {
        native.getIccid(iccid => {
            this.setState({iccid: iccid});
        })
    }


    _console = text => {
        this.setState({console: text});
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f0f0f0'
    },
    toolbar: {},
    pair: {
        flexDirection: 'row'
    },
    text: {
        // fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'center',
        margin: 5,
        height: 40,
        // width: 80,
    },
    textInput: {
        flex: 1,
        height: 40,
    },
    console: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    go: {
        flex: 3,
    },
    getIccid: {
        width: 100,
    },
});

let themeColor = '#66bb6a';