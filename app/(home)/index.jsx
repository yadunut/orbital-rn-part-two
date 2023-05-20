import { FlatList, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
    const [todos, setTodos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    async function fetchTodos() {
        setRefreshing(true);
        let { data } = await supabase.from('todos').select('*');
        setRefreshing(false);
        setTodos(data);
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        if (refreshing) {
            fetchTodos();
            setRefreshing(false);
        }
    }, [refreshing]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList
                data={todos}
                renderItem={({ item }) => <Text>{item.task}</Text>}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
            />
        </View>
    );
}