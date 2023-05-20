import { useState } from "react";
import { View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../contexts/auth";
import { useRouter } from "expo-router";

export default function NewTodo() {
    const [title, setTitle] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const handleSubmit = async () => {
        setErrMsg('');
        if (title === '') {
            setErrMsg('title cannot be empty')
            return;
        }
        const { error } = await supabase.from('todos').insert({ task: title, user_id: user.id }).select().single();

        if (error != null) {
            setErrMsg(error);
            return;
        }
        router.push('/');

    }

    return <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Title: </Text>
        <TextInput value={title} onChangeText={setTitle} />
        {errMsg !== '' && <Text>{errMsg}</Text>}
        <Button onPress={handleSubmit}>Submit</Button>
    </View>;
}