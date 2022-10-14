import { StyleSheet, Image, ScrollView } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Text, View } from '../components/Themed';
import { infoContext } from '../components/Provider';
//poke.moves[0].move.name

export default function TabThreeScreen() {

  const {poke}:any = useContext(infoContext);
  const [image, setImage] = useState();
  const [lengthMoves, setLengthMoves] = useState<any>();
  let items:any = [];

  useEffect(()=>{
    try {
      getLengthOfObject();
      setImage(poke.sprites.front_default);
    } catch (error) {}
  },[poke]);

  console.log(poke)
  function getLengthOfObject(){ 
    let lengthOfObject = Object.keys(poke.moves).length; 
    setLengthMoves(lengthOfObject);
    console.log(lengthMoves)
  }

  function getAllMoves(){
    try {
      for(let i = 0; i<lengthMoves; i++){
        items[i] = <Text>{poke.moves[i].move.name}</Text>
      }
      return items;
    } catch (error) {}
  }

  function getMoves(){
    try {
      if(poke!=null){
        return(
          <View>
            
            <Text>{poke.name}</Text>
            {getAllMoves()}
          </View>
        )
      }else{
        return(
          <View>
            <Text>No encontrado.</Text>
          </View> 
        )
      }
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Movimientos:</Text>
        <Image style={{ width: 150, height: 150 }} source={{ uri: image }}/>
        <ScrollView style={styles.scroll}>
        {getMoves()}
      </ScrollView>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scroll:{
    marginTop: 30,
    marginBottom: 40,
  }
});
