import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image, StyleSheet, Pressable} from 'react-native';
import {supabase} from './supabase';

export default function EntryDetail({route, navigation}) {
    const {entryId} = route.params;
    const [entry, setEntry] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEntry() {
            const {data, error} = await supabase
                .from('entries')
                .select('*')
                .eq('id', entryId)
                .single();
            if(error) {
                console.error('Error feching entry: ', error);
            }
            else {
                setEntry(data);
                console.log(data)
            }
            setLoading(false);
        }
        fetchEntry();
            },[entryId]);
    
    if(loading) {
        return<ActivityIndicator size="large" color="#FF4500"/>

    }

    return (
        <View style={styles.container}>
        
            <Text style={styles.title}>{entry.title}</Text>
            {entry.image_url && (
                <Image source={{ uri: entry.image_url }} style={styles.image} />
            )}

            {/* Description */}
            {entry.description && (
            <Text style={styles.content}>{entry.description}</Text>
            )}

            {/* Pressable Location Button */}
            <Pressable
                style={styles.locationButton}
                onPress={() => navigation.navigate('MapComponent', {
                    latitude: entry.latitude,
                    longtitude: entry.longtitude
                })}
            >
                <Text style={styles.locationText}>
                     Location ({entry.latitude}, {entry.longtitude})
                </Text>
            </Pressable>
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
    title: { fontSize: 24, fontWeight: 'bold', color: '#FF4500' },
    content: { fontSize: 18, marginTop: 10, color: '#333' },
    image: { width: '100%', height: 200, resizeMode: 'cover', marginTop: 10 },
    locationButton: { 
        marginTop: 20, 
        padding: 10, 
        backgroundColor: '#FF4500', 
        alignItems: 'center',
        borderRadius: 5 
    },
    locationText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
