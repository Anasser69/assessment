import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from "@env";
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigation = useNavigation();

  useEffect(() => {
    fetch(API_URL + "posts")
      .then(response => response.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => {
        setError('Failed to fetch posts')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('second', { post: item })} style={styles.touchable}>
            <Text style={styles.item}>{item.title}</Text>
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
  item: {
    padding: 15,
    fontSize: 18,
    height: 60,
    marginVertical: 8, 
    backgroundColor: '#e6e6fa', 
    borderRadius: 10, 
    textAlign: 'center',
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