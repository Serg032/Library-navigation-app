import {Button, ButtonText, ScrollView, Text, View} from '@gluestack-ui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import BookService from '../books/service';
import {Book} from '../books/domain';
import {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import BookCard from '../components/book-card';

type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const booksService = new BookService();

function HomeScreen({navigation}: {navigation: ProfileScreenNavigationProp}) {
  const [books, setBooks] = useState<Book[]>([]);
  const fetchData = async () => {
    const response = await booksService.getAll();
    return response.books;
  };
  const refreshData = async () => {
    const response = await booksService.getAll();
    setBooks(response.books);
  };
  useEffect(() => {
    fetchData().then(response => setBooks(response));
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {books ? (
          books.map(book => <BookCard key={book.id} book={book} />)
        ) : (
          <Text>Theres no books</Text>
        )}
        <Button
          onPress={() => {
            navigation.navigate('Details', {
              id: '86',
            });
          }}>
          <ButtonText>Go to details</ButtonText>
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
