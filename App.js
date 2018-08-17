/*
  Alejandro Deloach Rivera
  PokedexApp v0.0.1
  Main App Class

*/

// Import necessary components:
import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import PokeModal from "./pokeModal.js";
function ImageType1(props) {
  var url = "https://www.serebii.net/sunmoon/pokemon/00" + props.index + ".png";
  return (
    <Image
      style={{ width: 80, height: 80 }}
      source={{
        uri: url
      }}
    />
  );
}

function ImageType2(props) {
  var url = "https://www.serebii.net/sunmoon/pokemon/0" + props.index + ".png";

  return (
    <Image
      style={{ width: 80, height: 80 }}
      source={{
        uri: url
      }}
    />
  );
}
function ImageType3(props) {
  var url = "https://www.serebii.net/sunmoon/pokemon/" + props.index + ".png";

  return (
    <Image
      style={{ width: 80, height: 80 }}
      source={{
        uri: url
      }}
    />
  );
}
function PokeImage(props) {
  if (props.index <= 9) {
    return <ImageType1 index={props.index} />;
  } else if (props.index <= 99) {
    return <ImageType2 index={props.index} />;
  } else {
    return <ImageType3 index={props.index} />;
  }
}

// Main App class:
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true, // App load state.

      modalVisible: false, // Modal default state.
      dataSource: null
    };
  }

  componentDidMount() {
    return fetch("http://pokeapi.co/api/v2/pokemon/?limit=802")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.results
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  // List tap handler:
  handleListTap = item => {
    console.log(item.name);
    this.setState({ modalVisible: true }); // Set modal to visible
  };

  // close modal handler:
  closeModal() {
    this.setState({ modalVisible: false }); // Set modal to hidden.
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // App Render method:
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        // Main container:
        <View style={styles.container}>
          {/* Pokeball icon.*/}
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri:
                "https://cdn.iconscout.com/icon/premium/png-512-thumb/pokeball-5-580785.png"
            }}
          />
          {/* Test text.*/}
          <Text style={styles.textColor}>This is a Pokedex test!</Text>

          {/* Begin List */}
          <FlatList
            /* Separator Component.*/
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            /* List Style */
            style={styles.list}
            /* Set list data. */
            data={this.state.dataSource}
            /* Set unique key. */
            keyExtractor={item => item.url}
            /*On End list handler:*/
            onEndReached={() => {
              data.fetchMore({
                variables: { offset: data.feed.length + 1 },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  // Don't do anything if there weren't any new items
                  if (!fetchMoreResult || fetchMoreResult.feed.length === 0) {
                    return previousResult;
                  }
                  return {
                    // Append the new feed results to the old one
                    feed: previousResult.feed.concat(fetchMoreResult.feed)
                  };
                }
              });
            }}
            /* List item render: */
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => this.handleListTap(item)}
              >
                <PokeImage index={index + 1} />
                <Text style={styles.textColor}>
                  {this.capitalize(item.name)}
                </Text>
              </TouchableOpacity>
            )}
          />

          {/* Add modal */}
          <PokeModal
            /* Modal props */
            modalVisible={this.state.modalVisible}
            closeModal={this.closeModal.bind(this)}
          />
        </View>
      );
    }
  }
}

// Styles object:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  },
  textColor: {
    color: "#fff"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  list: {
    width: "100%"
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#aaa"
  }
});
