/* screen/MovieScreen.js */
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
import Constants from 'expo-constants';
import Loading from '../components/Loading';
import ProgressBar from '../components/ProgressBar';
import ProfileThumb from '../components/ProfileThumb';
import BackButton from '../components/BackButton';
import InfoCard from '../components/InfoCard';
const screen = Dimensions.get('window');

import { fetchCredits } from '../services/services';

export default function MovieScreen({ navigation, route }) {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [director, setDirector] = useState('');
  /**
   * below, we are getting the params that we passed
   * while navigating from HomeScreen.
   * we will use it to make an fetch request to
   * get crew and cast list based on movie.id.
   */
  const { movie } = route.params;

  useEffect(() => {

    setLoading(true);
    /**
     * we will pass movie.id to fetchCredits()
     * which will return us the list of cast, crew, and director
     */
    fetchCredits(movie.id).then((data) => {
      console.log('credit data: ', data)
      setCredits(data.credits);
      setDirector(data.director);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        {/**
      render <BackButton/>
      we will pass navition prop too, so that we can 
      return back to HomeScreen
       */}
        <BackButton navigation={navigation} />
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        {/**
        <InfoCard/> component takes movie and director
        props, which we used in the previous section.
         */}
        <InfoCard movie={movie} director={director} />
      </View>
      <View style={styles.credit}>
        <>
          <Text style={styles.title}>CAST</Text>
          {credits && (
            <FlatList
              data={credits.cast}
              renderItem={({ item }) => <ProfileThumb item={item} />}
              horizontal
            />
          )}
        </>
        <>
          <Text style={styles.title}>CREW</Text>
          {credits && (
            <FlatList
              data={credits.crew}
              renderItem={({ item }) => <ProfileThumb item={item} />}
              horizontal
            />
          )}
        </>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { width: window.width, height: 200 },
  credit: {
    flex: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#212121',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
