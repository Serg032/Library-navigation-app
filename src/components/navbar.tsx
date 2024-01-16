import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Box,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import React from 'react';
import {colors} from '../theme';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ScreenProp = StackNavigationProp<RootStackParamList>;

const NavBar = () => {
  const navigation = useNavigation<ScreenProp>();
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const goToCreateBook = () => {
    navigation.navigate('CreateBook');
    handleClose();
  };
  const goToHome = () => {
    navigation.navigate('Home');
    handleClose();
  };

  const goToFindBook = () => {
    navigation.navigate('FindBook');
    handleClose();
  };

  return (
    <Box>
      <Button onPress={handleClose} bgColor={colors.primary}>
        <ButtonText>Menu</ButtonText>
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent h="$56" zIndex={999}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={goToHome}>
            <ActionsheetItemText>Home</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={goToCreateBook}>
            <ActionsheetItemText>Create Book</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={goToFindBook}>
            <ActionsheetItemText>Search by id</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default NavBar;
