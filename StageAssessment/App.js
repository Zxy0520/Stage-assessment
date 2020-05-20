import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text, Button, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'


let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class Home extends React.Component {

  constructor(props) {
    super(props)
    this.url = "http://www.cjlly.com:3049/record"
    this.state = { 
      data: []
     }

  }

  componentDidMount() {
      fetch(this.url, { method: "GET" })
      .then(resp => resp.json())
      .then(data => this.setState({ data }))
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={({ item, index }) => index}
          ItemSeparatorComponent={this._ItemSeparatorComponent}
        />
      </View>
    )
  }

  // _endReached = () => {
  //   let data = this.state.data.splice(0)
    
  //   data.push(++this.max)
  //   this.setState({ data })
  // }

  _ItemSeparatorComponent = () => {
    return <View style={{ height: 1, backgroundColor: 'red' }}></View>
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._goSettings(item)}>
        <View style={{ height: 140, width: screenWidth, flexDirection: 'row' }}>
          <View style={{ width: 20, borderColor: 'red', borderRightWidth: 1, alignItems: 'center' }}>
            <Text style={{ color: 'red', fontSize: 15 }}>{item.id}</Text>
          </View>

          <View style={{ width: screenWidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Image source={{ uri: item.img }} style={{ height: 140, width: 140 }} />
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => this._delete(item)}>
              <View style={{ width: 50, height: 30, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center', marginRight: 30 }}>
                <Text style={{ color: 'white' }}>删除</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>

    )
  }

  _delete = (item) => {
    let data = this.state.data.splice(0)
    let index = data.indexOf(item)
    data.splice(index, 1)
    this.setState({ data })
  }

  _goSettings(item) {
    this.props.navigation.navigate("Settings", {name: item.name, img: item.img, singer: item.singer})
  }
}



class Settings extends React.Component {
  render() {
    return (
      <View style={{alignItems:'center'}}>
        <Image source={{uri:this.props.route.params.img}} style={{width:300,height:300}}/>
        <Text>歌曲名：{this.props.route.params.name}</Text>
        <Text>歌手名：{this.props.route.params.singer}</Text>
      </View>
      )
  }
}

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={Home} options={{
          title: '流行音乐排行榜'
        }} />

        <Stack.Screen name="Settings" component={Settings} options={{
          title: '音乐详情'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}