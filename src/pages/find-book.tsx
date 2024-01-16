import {
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Image,
  Input,
  InputField,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import {useState} from 'react';
import BookService from '../books/service';
import {Book} from '../books/domain';
import {StyleSheet} from 'react-native';

const bookService = new BookService();

const FindBook = () => {
  const [id, setId] = useState('');
  const [book, setBook] = useState<Book | undefined>();

  const fetchBook = async () => {
    try {
      const response = await bookService.getById(id);
      console.log(response);
      setBook(response.book);
    } catch (error) {
      console.log(error);
    }
  };

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
            <FormControlLabelText>Book id</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="12323-123123-12312-12321"
              onChangeText={setId}
            />
          </Input>
        </FormControl>
        <Button onPress={fetchBook}>
          <ButtonText>Find</ButtonText>
        </Button>
      </Box>
      {book ? (
        <View style={styles.subContainer}>
          <Box
            maxWidth="$64"
            borderColor="$borderLight200"
            borderRadius="$lg"
            borderWidth="$1"
            my="$4"
            overflow="hidden"
            $base-mx="$5"
            $dark-bg="$backgroundDark900"
            $dark-borderColor="$borderDark800">
            <Box>
              <Image
                h={150}
                width={300}
                source={{
                  uri: book.img,
                }}
                alt="Book image"
              />
            </Box>
            <VStack px="$6" pt="$4" pb="$6">
              <Heading $dark-color="$textLight200" size="sm">
                {book.name}
              </Heading>
              <Text my="$1.5" $dark-color="$textLight200" fontSize="$xs">
                {book.author}
              </Text>
              <Text my="$1.5" $dark-color="$textLight200" fontSize="$xs">
                {book.publisher}
              </Text>
              <Text my="$1.5" $dark-color="$textLight200" fontSize="$xs">
                {book.pages}
              </Text>
            </VStack>
          </Box>
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  subContainer: {
    gap: 10,
    padding: 20,
    width: '100%',
  },
});

export default FindBook;
