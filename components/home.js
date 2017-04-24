import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H1, Spinner } from 'native-base'; // Used native-base for styling.

class Home extends Component {

    // initializing state.
    constructor(props) {
        super(props);
        this.state = {
            animating: true,
            showLoader: false
        }
    }

    // This method is used to call renderScene in index Component for navigation.
    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        })
    }

    render() {
        return (
            /* This will be the landing page and on click of View Post button i will navigate to ViewPost Component */
            <Container style={{ flex: 1, alignItems: 'center', backgroundColor: "rgb(63,81,181)" }}>
                <Content style={{ flex: 1 }}>
                </Content>
                <Content style={{ flex: 4 }}>
                    <H1 style={{ color: 'white', textAlign: 'center' }}>Welcome To Post</H1>
                    {this.state.showLoader ? <ActivityIndicator color='white' animating={this.state.animating} size='large' /> : null}
                </Content>
                <Content style={{ flex: 1 }}>
                    <Button onPress={this.navigate.bind(this, 'viewPost')} iconLeft outline light bordered>
                        <Icon name='paper' />
                        <Text style={{ color: 'white' }}>View Post</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


export default Home