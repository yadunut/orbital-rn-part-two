import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>You should only see this if you're logged in</Text>
        </View>
    );
}
