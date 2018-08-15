import React, { Component } from "react";
import { ListItem } from "react-native-elements";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from "react-native";

export default class App extends React.Component {
  state = {
    modalVisible: false,

    pokemon: [
      {
        number: "1",
        name: "Bulbasaur",
        image: "https://www.serebii.net/sunmoon/pokemon/001.png"
      },
      {
        number: "2",
        name: "Ivysaur",
        image: "https://www.serebii.net/sunmoon/pokemon/002.png"
      },
      {
        number: "3",
        name: "Venusaur",
        image: "https://www.serebii.net/sunmoon/pokemon/003.png"
      },
      {
        number: "4",
        name: "Charmander",
        image: "https://www.serebii.net/sunmoon/pokemon/004.png"
      },
      {
        number: "5",
        name: "Charmeleon",
        image: "https://www.serebii.net/sunmoon/pokemon/005.png"
      },
      {
        number: "6",
        name: "Charizard",
        image: "https://www.serebii.net/sunmoon/pokemon/006.png"
      },
      {
        number: "7",
        name: "Squirtle",
        image: "https://www.serebii.net/sunmoon/pokemon/007.png"
      },
      {
        number: "8",
        name: "Wartortle",
        image: "https://www.serebii.net/sunmoon/pokemon/008.png"
      },
      {
        number: "9",
        name: "Blastoise",
        image: "https://www.serebii.net/sunmoon/pokemon/009.png"
      }
    ]
  };

  handleListTap = item => {
    console.log(item.name);
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri:
              "https://cdn.iconscout.com/icon/premium/png-512-thumb/pokeball-5-580785.png"
          }}
        />
        <Text style={styles.textColor}>This is a Pokedex test!</Text>

        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.list}
          data={this.state.pokemon}
          keyExtractor={item => item.number}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => this.handleListTap(item)}
            >
              <Image
                style={{ width: 80, height: 80 }}
                source={{
                  uri: item.image
                }}
              />
              <Text style={styles.textColor}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

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
