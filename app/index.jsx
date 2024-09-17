import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from "@env";
import { useNavigation } from '@react-navigation/native';
import i18n from '../utils/i18n';

const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState(i18n.locale)
  const navigation = useNavigation();

  useEffect(() => {
    console.log(API_URL);
    fetch(API_URL + "/posts")
      .then(response => response.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => {
        setError(i18n.t('error'))
        setLoading(false)
      })
  }, [])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    i18n.locale = newLanguage;
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
      <Button title={i18n.t('changeLanguage')} onPress={toggleLanguage} />
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