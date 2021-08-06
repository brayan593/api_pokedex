import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ProgressBarAndroid,
} from 'react-native';

const Pokemons = ({navigation}) => {
  const [pokemons, setPokemons] = useState([]);
  const [searchfeild, setSearchfeild] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=25')
      .then(response => response.json())
      .then(pokemons => setPokemons(pokemons.results));
  };

  const getNumber = num => {
    num = num.toString();
    const paddednum = num.padStart(3, '0');
    return paddednum;
  };

  const getRandomeValue = () => {
    let value = Math.random();
    value = value.toString();
    value = Number(
      value
        .split('')
        .splice(0, 3)
        .join(''),
    );
    return value;
  };

  return (
    <View style={{backgroundColor: '#00aae4'}}>
      <View style={styles.searchCont}>
        <TextInput
          style={styles.searchfeild}
          placeholder="Buscar Pokemones"
          onChangeText={value => setSearchfeild(value)}
          value={searchfeild}
        />
      </View>

      <ScrollView style={styles.pokeWrapper}>
        <View style={styles.container}>
          {pokemons
            .filter(pokemon =>
              pokemon.name.toLowerCase().includes(searchfeild.toLowerCase()),
            )
            .map((pokemon, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={index}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate('Details', {
                      pokemon: pokemon.name,
                      image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
                        pokemon.name
                      }.png`,
                    })
                  }>
                  <View style={styles.CpCont}>
                    <Text style={{color: '#ffa904', fontSize: 10, top: 5}}>
                      LP
                    </Text>
                    <Text
                      style={{fontSize: 22, color: '#ffa904', marginLeft: 3}}>
                      {getRandomeValue() * 100}
                    </Text>
                  </View>
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${
                        pokemon.name
                      }.png`,
                    }}
                  />
                  <Text>{pokemon.name}</Text>
                  <ProgressBarAndroid
                    styleAttr="Horizontal"
                    style={{width: '90%'}}
                    indeterminate={false}
                    color="#002e64"
                    animating={true}
                    progress={1}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Pokemons;

const styles = StyleSheet.create({
  searchfeild: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 140,
    backgroundColor: '#d8d06b',
    width: 143,
    margin: 20,
    borderRadius: 20,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  pokeWrapper: {
    backgroundColor: '#fff',
    marginHorizontal: 7,
    borderRadius: 20,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 5,
  },
  image: {
    width: 70,
    height: 70,
  },
  pokeball: {
    position: 'absolute',
    right: '45%',
    bottom: 0,
    zIndex: 1,
  },
  CpCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
});
