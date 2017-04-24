import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Navigator, Text, View, ActivityIndicator } from 'react-native';

// Importing components from the specified path.
import Home from './components/home';
import ViewPost from './components/viewPost';
import DetailPost from './components/detailPost'

export default class PostProject extends Component {

  // Below function to navigate components - ROUTE 
  renderScene(route, navigator) {
    if (route.name == 'home') {
      return <Home navigator={navigator} />
    }
    if (route.name == 'viewPost') {
      return <ViewPost navigator={navigator} />
    }
    if (route.name == 'detailPost') {
      return <DetailPost navigator={navigator} post={route.postId} />
    }
  }

  render() {
    return (
      /* This will set initial routing to Home Component which will be the landing page */
      <View style={styles.container}>
        <Navigator
          initialRoute={{ name: 'home' }}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('PostProject', () => PostProject);
