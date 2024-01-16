import {ScrollView, Text, View} from '@gluestack-ui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BooksContext, RootStackParamList} from '../../App';

import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import BookCard from '../components/book-card';

export type ProfileScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

function HomeScreen(props: {deleteBook: (id: string) => void}) {
  const books = useContext(BooksContext).books;

  return (
    <View style={styles.container}>
      <ScrollView>
        {books ? (
          books.map(book => (
            <BookCard key={book.id} book={book} deleteBook={props.deleteBook} />
          ))
        ) : (
          <Text>There's no books</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
