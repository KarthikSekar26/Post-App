import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H1, Card, CardItem, Body, Header, Left, Right, Title } from 'native-base';

// Importing api.js - maintained all api calls required for the project. 
import api from './service/api';


class ViewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            animating: true,
            showLoader: false,
            showPost: false
        }
    }

    navigate(routeName, post) {
        this.props.navigator.push({
            name: routeName,
            postId: post
        })
    }

    // Calling get all post api.
    componentDidMount() {
        this.setState({
            showLoader: true,
        })
        api.getAllPost().then((res) => {
            this.setState({
                postList: res,
                showLoader: false,
                showPost: true
            })
        });
    }


    // Looping through array of post list and binding it in the view.
    // Clicking the post title and body, will navigate to Detail Post Component.
    IteratePost() {
        return this.state.postList.map(function (post, i) {
            post.title = post.title.replace(/\n/g, ' ');
            post.body = post.body.replace(/\n/g, ' ');
            return (
                <Card key={i} >
                    <CardItem header button onPress={this.navigate.bind(this, 'detailPost', post.id)}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: 'rgb(63,81,181)' }}>{post.title.toUpperCase()}</Text>
                    </CardItem>
                    <CardItem button onPress={this.navigate.bind(this, 'detailPost', post.id)}>
                        <Body>
                            <Text style={{ textAlign: 'justify', color: 'black' }}>{post.body}</Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }, this);
    }


    // Showing loader till fetching data from api and its calling the function to render it in view.
    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(63,81,181)' }}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.navigate.bind(this, 'home')}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>LIST OF POST</Title>
                    </Body>
                </Header>
                <Content >
                    {this.state.showLoader ? <ActivityIndicator color='white' animating={this.state.animating} size='large' /> : null}
                    <ScrollView >
                        {this.state.showPost ? this.IteratePost() : null}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}


export default ViewPost