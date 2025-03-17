import React, { useState } from 'react';
import { TextInput, Button, View, Image } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import db from './firebase'; // Firebase configuration

const JournalEntryForm = ({ location, onSubmit }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleSave = async () => {
    if (text) {
      try {
        // Save journal entry to Firebase
        await addDoc(collection(db, 'journalEntries'), {
          text,
          imageUrl: image,
          location,
          timestamp: new Date(),
        });
        onSubmit(); // Optionally notify parent component to refresh view
      } catch (error) {
        console.error("Error saving journal entry:", error);
      }
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Write your journal entry..."
        value={text}
        onChangeText={setText}
        multiline
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      {/* Image picker component goes here */}
      <Button title="Save Entry" onPress={handleSave} />
    </View>
  );
};
