import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  View,
} from '@gluestack-ui/themed';
import {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import BookService from '../books/service';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {Book, UpdateCommand} from '../books/domain';

type UpdateBookScreenRouteProp = RouteProp<RootStackParamList, 'UpdateBook'>;

const booksService = new BookService();

const UpdateBook = ({
  route,
  updateContextFunction,
}: {
  route: UpdateBookScreenRouteProp;
  updateContextFunction: (
    book: Book | undefined,
    command: UpdateCommand,
  ) => void;
}) => {
  const {id} = route.params;

  const getBookToUpdateState = async () => {
    try {
      const response = await booksService.getById(id);
      return response.book;
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong');
    }
  };
  const updateBook = async () => {
    try {
      await booksService.update(
        {
          name: title !== '' ? title : undefined,
          author: author !== '' ? author : undefined,
          publisher: publisher !== '' ? publisher : undefined,
          pages: pages !== '' ? parseInt(pages) : undefined,
          img: img !== '' ? img : undefined,
        },
        id,
      );
      const bookToUpdateState = await getBookToUpdateState();
      updateContextFunction(bookToUpdateState, {
        name: title !== '' ? title : undefined,
        author: author !== '' ? author : undefined,
        publisher: publisher !== '' ? publisher : undefined,
        pages: pages !== '' ? parseInt(pages) : undefined,
        img: img !== '' ? img : undefined,
      });
      setTitle('');
      setAuthor('');
      setPublisher('');
      setPages('');
      setImg('');

      Alert.alert(
        'Book updated, go to home screen and refresh with refresh button at the bottom screen',
      );
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [img, setImg] = useState('');

  return (
    <View style={styles.container}>
      <Box style={styles.subContainer}>
        <FormControl
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Title</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Clean Code"
              onChangeText={setTitle}
            />
          </Input>
        </FormControl>
        <FormControl
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Author</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="Robert C. Martin"
              onChangeText={setAuthor}
            />
          </Input>
        </FormControl>
        <FormControl
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Publisher</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="The Pragmatic Programmer"
              onChangeText={setPublisher}
            />
          </Input>
        </FormControl>
        <FormControl
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Pages</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField type="text" placeholder="123" onChangeText={setPages} />
          </Input>
        </FormControl>
        <FormControl
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          isRequired={false}>
          <FormControlLabel mb="$1">
            <FormControlLabelText>Image url</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="https://bpkmyniar2345tvjoxcgm.supabase.co/storage/v1/object/public/bubbo-library/rust.jpg"
              onChangeText={setImg}
            />
          </Input>
        </FormControl>
        <Box style={styles.buttonBox}>
          <Button width={160} onPress={updateBook}>
            <ButtonText>Update book</ButtonText>
          </Button>
        </Box>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    width: '100%',
  },
  subContainer: {
    gap: 10,
    padding: 20,
    width: '100%',
  },
  buttonBox: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
  },
});

export default UpdateBook;
