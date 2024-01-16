import {Text, View} from '@gluestack-ui/themed';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

function DetailsScreen({route}: {route: DetailsScreenRouteProp}) {
  const {id} = route.params;
  console.log('roeeute', id);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>id:{JSON.stringify(id)}</Text>
    </View>
  );
}

export default DetailsScreen;
