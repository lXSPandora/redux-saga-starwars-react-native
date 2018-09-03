import React, { Component } from 'react'
import { FlatList, Text, ActivityIndicator, Dimensions, View } from 'react-native'
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { getCharacters } from '../../actions/characters'
import Header from '../common/Header'
import { StarWarsConnection, Character } from '../../sagas/characters';

const { width } = Dimensions.get('window')

const Screen = styled.View`
  flex: 1;
  background-color: white;
`

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Card = styled.TouchableOpacity`
  padding: 15px;
  margin: 10px 10px;
  flex-direction: row;
  flex: 1;
  border-radius: 10;
  background-color: white;
  align-items: center;
`;

const CardTitle = styled.Text`
  font-size: 18;
  font-weight: 600;
  background-color: transparent;
  margin-bottom: 5;
  width: ${width - 130};
`;

const CardData = styled.Text`
  font-size: 14;
  background-color: transparent;
  font-weight: 600;
  color: grey;
`;

const CircularView = styled.View`
  width: 60;
  height: 60;
  border-radius: 30;
  align-items: center;
  background-color: black;
  margin-right: 10;
  justify-content: center;
`;

const Initals = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: white;
  background-color: transparent;
`;

interface Props {
  getCharacters: () => void,
  characters: StarWarsConnection<Character>,
  error: string,
}

interface Item {
  item: Character
}

const Types = {
  ['male']: 'Male',
  ['female']: 'Female',
  ['n/a']: 'Robot',
}

class Home extends Component<Props> {
  componentDidMount() {
    this.props.getCharacters();
    return null;
  }

  getInitials = (name: string) => {
    return name
    ? name
        .split(' ')
        .slice(0, 2)
        .map(namePart => namePart.charAt(0).toUpperCase())
        .join('')
    : '';
  }

  renderItem = ({ item }: Item) => {
    return (
      <Card style={{
        shadowOffset: { width: 1, height: 0.5 },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
        elevation: 5,
      }}>
        <CircularView>
          <Initals>{this.getInitials(item.name)}</Initals>
        </CircularView>
        <View>
          <CardTitle>{item.name}</CardTitle>
          <CardData>
            {Types[item.gender]}
          </CardData>
        </View>
      </Card>
    );
  }

  renderHeader = () => (
    <Header userInitials="SW" title="Characters" description="Star Wars Heroes" />
  )

  render() {
    const { characters, error } = this.props;
    if (error) {
      return (
        <Screen>
          {this.renderHeader()}
          <Wrapper>
            <Text>{error}</Text>
          </Wrapper>
        </Screen>
      )
    }
    if (!characters) {
      return (
        <Screen>
          {this.renderHeader()}
          <Wrapper>
            <ActivityIndicator animating color="black" />
          </Wrapper>
        </Screen>
      );
    }
    return (
      <Screen>
        {this.renderHeader()}
        <FlatList 
          data={characters.results}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.name}
        />
      </Screen>
      
    )
  }
}

const mapStateToProps = (state: Object) => {
  return {
    characters: state.characters.characters,
    error: state.characters.error,
  }
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getCharacters: () => dispatch(getCharacters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)