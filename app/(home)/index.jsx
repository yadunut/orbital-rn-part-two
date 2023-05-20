import { Alert, FlatList, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useEffect, useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';

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
                renderItem={({ item }) => <TodoItem todo={item} />}
                onRefresh={() => setRefreshing(true)}
                refreshing={refreshing}
            />
        </View>
    );
}

function TodoItem({ todo }) {
    const [checked, setChecked] = useState(todo.is_complete)
    const handlePress = async () => {
        const { error } = await supabase.from('todos').update({ is_complete: !checked }).eq('id', todo.id)
        if (error != null) {
            Alert.alert(error.message);
        }
        setChecked(!checked)

    }
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{todo.task}</Text>
            <Checkbox.Android status={checked ? 'checked' : 'unchecked'} onPress={handlePress} />
        </View>
    )
}