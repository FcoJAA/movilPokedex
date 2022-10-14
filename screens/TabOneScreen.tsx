import React, { useContext, useState } from 'react';
import { Button, StyleSheet, TextInput, Image } from 'react-native';
import { infoContext } from '../components/Provider';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  interface pokemonInterface{
    name: string;
    types:any;
  }
  
  const {setPoke}:any = useContext(infoContext) 
  const[numero, setNumero] = useState<any>(-1);
  const[pokemon, setPokemon] = useState<pokemonInterface>();
  const[image, setImage] = useState<any>();
  const notPokemonImagen = "https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png";

  async function getPoke() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}/`);
      const objectPokemon = await res.json();
      setPokemon(objectPokemon);
      setImage(objectPokemon.sprites.front_default)
      setPoke(objectPokemon);
    } catch (error) {
      setPokemon(undefined);
      setPoke(undefined);
      setImage(notPokemonImagen);
    }
  }

  function pokemonExiste(){
    try {
      if(pokemon!=null){
        return(
          <View>
            <Image style={{ width: 190, height: 190 }} source={{ uri: image }}/>
            <Text style={styles.text}>Name: {pokemon.name}</Text>
            <Text style={styles.text}>Type: {pokemon.types[0].type.name} {getSecondType()}</Text>
          </View>
        )
      } else{
        return(
          <View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: image }}/>
            <Text>No encontrado.</Text>
          </View> 
        )
      }
    } catch (error) {}
  }

  function getSecondType(){
    try {
      if(pokemon!=null && pokemon.types[1].type.name){
        return(
          <Text>/ {pokemon.types[1].type.name}</Text>
        )
      }
    } catch (error) {}
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Pokedex</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Enter a number' onChangeText={(numero) => setNumero(numero)}/>
        <Button title="submit" onPress={getPoke} />
      </View>
      {pokemonExiste()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: "space-evenly",
  },
  form:{
    flexDirection: 'row',
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text:{
    textAlign:"center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
