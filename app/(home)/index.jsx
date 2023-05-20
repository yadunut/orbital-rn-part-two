import { FlatList, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';

export default function HomeScreen() {
    const [todos, setTodos] = useState([]);

    async function fetchTodos() {
        let { data } = await supabase.from('todos').select('*');
        setTodos(data);
    }

    useEffect(() => {
        fetchTodos();
    }, []);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <FlatList data={todos} renderItem={({ item }) => <Text>{item.task}</Text>} />
        </View>
    );
}