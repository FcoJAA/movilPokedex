import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { infoContext } from '../components/Provider';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
 
  const {poke}:any = useContext(infoContext);
  const [image, setImage] = useState();

  useEffect(()=>{
    try {
      setImage(poke.sprites.front_default);
    } catch (error) {}
  },[poke])

  function getStats(){
    try {
      if(poke!=null){
        return(
          <View>
            <Image style={{ width: 190, height: 190 }} source={{ uri: image }}/>
            <Text style={styles.text}>{poke.name}</Text>
            <Text style={styles.text}>Stats:</Text>
            <Text style={styles.text}>HP: {poke.stats[0].base_stat}</Text>
            <Text style={styles.text}>Attack: {poke.stats[1].base_stat}</Text>
            <Text style={styles.text}>Defense: {poke.stats[2].base_stat}</Text>
            <Text style={styles.text}>Special-Attack: {poke.stats[3].base_stat}</Text>
            <Text style={styles.text}>Special-defense: {poke.stats[4].base_stat}</Text>
            <Text style={styles.text}>Speed: {poke.stats[5].base_stat}</Text>
          </View>
        )
      }else{
        return(
          <View>
            <Text>No encontrado.</Text>
          </View> 
        )
      }
    } catch (error) {
      alert("No se han podido obtener las stats.")
    }
  }

  function getAbilitys(){
    try {
      if(poke != null && poke.abilities[1].ability.name)
      return(
        <Text>Ability 2: {poke.abilities[1].ability.name}</Text>
      )
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      {getStats()}
      <Text>----</Text>
      <Text>Ability: {poke.abilities[0].ability.name}</Text>
      {getAbilitys()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
