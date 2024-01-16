import React, {createContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';
import HomeScreen from './src/pages/home';
import NavBar from './src/components/navbar';
import CreateBook from './src/pages/create-book';
import UpdateBook from './src/pages/update-book';
import FindBook from './src/pages/find-book';
import {Book, CreateCommand} from './src/books/domain';
import BookService from './src/books/service';
export type RootStackParamList = {
  Home: undefined;
  CreateBook: undefined;
  UpdateBook: {id: string};
  FindBook: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const booksService = new BookService();
export const BooksContext = createContext({
  books: [] as Book[],
});

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const createBook = (book: CreateCommand) => {
    const newBook = {...book, id: 'custom'};
    setBooks([...books, newBook]);
  };
  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };
  const fetchData = async () => {
    const response = await booksService.getAll();
    return response.books;
  };

  useEffect(() => {
    fetchData().then(response => setBooks(response));
  }, []);
  return (
    <BooksContext.Provider value={{books}}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} deleteBook={deleteBook} />}
            </Stack.Screen>
            <Stack.Screen name="CreateBook">
              {props => <CreateBook {...props} createBook={createBook} />}
            </Stack.Screen>
            <Stack.Screen name="UpdateBook" component={UpdateBook} />
            <Stack.Screen name="FindBook" component={FindBook} />
          </Stack.Navigator>
          <NavBar />
        </NavigationContainer>
      </GluestackUIProvider>
    </BooksContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
