import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {Card} from 'react-native-paper';
import {EvilIcons} from '@expo/vector-icons';
import Constants from 'expo-constants';

import Loading from '../components/Loading';
import {fetchMovies} from "../services/services";

const screen = Dimensions.get('screen');


const HomeScreen = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm).then(data => {
      console.log('FETCH MOVIES DATA:', data);
      
      setMovies(data);

      setLoading(false);
    });

  }, [searchNow]);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        <View style={styles.bannerInfoCard}>
          <Text style={styles.bannerTitle}>
            {movies[0]?.original_title.substr(0, 20)}
          </Text>
          <Text style={styles.bannerOverview}>
            {movies[0]?.overview.substr(0, 80) + '...'}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder={'search movies'}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchNow(!searchNow);
            }}>
            <EvilIcons
              name={searchTerm ? 'search' : 'refresh'}
              size={20}
              color="black"
              style={{ alignSelf: 'center', marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>

         {/*rendering clickable poster thumbnails, when clicked, we will 
         be navigated to MovieScreen*/}

        <View style={styles.movieListCard}>
          <FlatList
            data={movies}
            numColumns={2}
            renderItem={({ item, index }) => {
              return (
                <Card style={styles.movieCard}>
                  <TouchableOpacity
                    onPress={() => {
                      /**
                        * here we are navigating to "MovieScreen", which has a path
                        * name of "Movie" which we set back in <Stack.Screen/>    
                        * of App.js.
                        * We are also passing the parameter with it, {movie: item}
                        * we will access it in MovieScreen
                       */
                      navigation.navigate('Movie', { movie: item });
                    }}>
                    <Image
                      source={{
                        uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                      }}
                      style={{ width: Constants.width, height: 200 }}
                    />
                  </TouchableOpacity>
                </Card>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  banner: { width: Constants.width, height: 200 },
  bannerInfoCard: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(21,21,21,0.5)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  bannerOverview: {
    color: 'grey',
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#212121',
  },
  inputCard: {
    position: 'absolute',
    top: -40,
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  movieCard: {
    flex: 1,
    height: 200,
    margin: 5,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 5,
  },
  movieListCard: {
    top: screen.height * 0.05,
  },
});