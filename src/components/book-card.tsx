import {
  Box,
  Button,
  ButtonGroup,
  ButtonText,
  Heading,
  Image,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {Book} from '../books/domain';
import {colors} from '../theme';
import {ProfileScreenNavigationProp} from '../pages/home';
import {useNavigation} from '@react-navigation/native';

interface BookCardProps {
  book: Book;
}

const BookCard = (props: BookCardProps) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
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
            uri: props.book.img,
          }}
          alt="Book cover"
        />
      </Box>
      <VStack px="$6" pt="$4" pb="$6">
        <Heading $dark-color="$textLight200" size="sm">
          {props.book.name}
        </Heading>
        <Text
          $dark-color="$textLight200"
          my="$1.5"
          fontSize="$sm"
          isTruncated={false}>
          {props.book.author}
        </Text>
        <Text
          $dark-color="$textLight200"
          my="$1.5"
          fontSize="$sm"
          isTruncated={false}>
          Publisher: {props.book.publisher}
        </Text>
        <Text
          $dark-color="$textLight200"
          my="$1.5"
          fontSize="$sm"
          isTruncated={false}>
          Pages: {props.book.pages}
        </Text>
        <ButtonGroup display="flex" flexDirection="column" alignItems="center">
          <Button
            width={100}
            onPress={() => {
              navigation.navigate('UpdateBook', {
                id: props.book.id,
              });
            }}>
            <ButtonText>Update</ButtonText>
          </Button>
          <Button bgColor={colors.accent} width={100}>
            <ButtonText>Delete</ButtonText>
          </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};

export default BookCard;
