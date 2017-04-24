import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, Button, Icon, H1, Card, CardItem, Body, Header, Left, Right, Title } from 'native-base';

import api from './service/api';

class DetailPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postDetails: {},
            postComments: [],
            showComments: false,
            animating: true,
            showLoader: false,
            showPost: false
        }
    }

    /* Rendering initial posts  */
    componentDidMount() {
        this.setState({
            showLoader: true,
        })
        api.getDetailPost(this.props.post).then((res) => {
            res.title = res.title.replace(/\n/g, ' ');
            res.body = res.body.replace(/\n/g, ' ');
            this.setState({
                postDetails: res,
                showLoader: false,
                showPost: true
            })
        });
    }

    // Calling comment API 
    getPostComments() {
        if (this.state.postComments.length == 0) {
            this.setState({
                showLoader: true
            })
            api.getCommentsPost(this.props.post).then((res) => {
                console.log(res);
                this.setState({
                    postComments: res,
                    showComments: true,
                    showLoader: false
                })

            });
        }
        else {
            return false;
        }
    }

    // looping through array of comments list and binding it in the view.
    showCommentPost() {
        return this.state.postComments.map(function (post, i) {
            post.name = post.name.replace(/\n/g, ' ');
            post.body = post.body.replace(/\n/g, ' ');
            return (
                <Card key={i}>
                    <CardItem>
                        <Body>
                            <Text><Text style={styles.titleContent}>Name : </Text><Text style={styles.detailContent}>{post.name}</Text></Text>
                            <Text><Text style={styles.titleContent}>E-Mail Id : </Text><Text style={styles.detailContent}>{post.email}</Text></Text>
                            <Text><Text style={styles.titleContent}>Message : </Text><Text style={styles.detailContent}>{post.body}</Text></Text>
                        </Body>
                    </CardItem>
                </Card>
            );
        }, this);
    }

    // Navigating components

    navigate(routeName) {
        this.props.navigator.push({
            name: routeName
        })
    }


    // Binding post detail in the view.
    // Clicking the comments button will display Post Comments.
    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(63,81,181)' }}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.navigate.bind(this, 'viewPost')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>POST DETAIL</Title>
                    </Body>
                </Header>
                <Content>
                    <ScrollView >
                        <Card>
                            {this.state.showPost ?
                                <CardItem>
                                    <Body>
                                        <Text><Text style={styles.titleContent}>User Id : </Text><Text style={styles.detailContent}>{this.state.postDetails.userId}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Id : </Text><Text style={styles.detailContent}>{this.state.postDetails.id}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Title : </Text><Text style={styles.detailContent}>{this.state.postDetails.title}</Text></Text>
                                        <Text><Text style={styles.titleContent}>Body : </Text><Text style={styles.detailContent}>{this.state.postDetails.body}</Text></Text>
                                    </Body>
                                </CardItem>
                                : null}
                            <CardItem header style={{ alignSelf: 'flex-end' }}>
                                <Button transparent onPress={this.getPostComments.bind(this)}>
                                    <Icon active name="chatbubbles" />
                                    <Text style={{ fontSize: 15, color: 'rgb(63,81,181)' }}>Comments</Text>
                                </Button>
                            </CardItem>
                        </Card>
                        {this.state.showLoader ? <ActivityIndicator color='white' animating={this.state.animating} size='large' /> : null}
                        {this.state.showComments ? this.showCommentPost() : null}
                    </ScrollView>
                </Content>
            </Container>
        );
    }
}

/*                 STYLE                            */

var styles = StyleSheet.create({
    titleContent: {
        fontSize: 20,
        color: 'rgb(63,81,181)',
        fontWeight: 'bold'
    },
    detailContent: {
        fontSize: 20,
        color: 'black'
    },
});


export default DetailPost