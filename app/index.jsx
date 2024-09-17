import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, toggleLanguage } from '../utils/store';
import { API_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
import i18n from '../utils/i18n';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const loading = useSelector(state => state.posts.loading);
  const error = useSelector(state => state.posts.error);
  const language = useSelector(state => state.language);
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchPostsStart());
    fetch(API_URL + "/posts")
      .then(response => response.json())
      .then(data => {
        dispatch(fetchPostsSuccess(data));
      })
      .catch(error => {
        dispatch(fetchPostsFailure(i18n.t('error')));
      });
  }, [dispatch]);

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{i18n.t('loading')}</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { direction: language === 'ar' ? 'rtl' : 'ltr' }]}>
      <Text style={styles.title}>{i18n.t('posts')}</Text>
      <Button title={i18n.t('changeLanguage')} onPress={handleToggleLanguage} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('second', { post: item })} style={styles.touchable}>
            <Text style={[styles.item, { textAlign: language === 'ar' ? 'right' : 'left' }]}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f0f8ff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    fontSize: 18,
    minHeight: 60,
    marginVertical: 8, 
    backgroundColor: '#e6e6fa', 
    borderRadius: 10, 
    color: '#333',
  },
  touchable: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
})