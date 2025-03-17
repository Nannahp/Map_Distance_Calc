import React from 'react';
import { View, Text, Image } from 'react-native';

export const MarkerDetail = ({ marker }) => {
    const [showJournalForm, setShowJournalForm] = useState(false);

  const handleSaveJournal = () => {
    setShowJournalForm(false);
  };

  return (
    <View>
    <Text>{marker.title}</Text>
    <Text>{marker.description}</Text>
    {marker.imageUrl && <Image source={{ uri: marker.imageUrl }} style={{ width: 100, height: 100 }} />}
    <Button title="Add Journal Entry" onPress={() => setShowJournalForm(true)} />
    {showJournalForm && (
      <JournalEntryForm location={marker.location} onSubmit={handleSaveJournal} />
    )}
    <Button title="Close" onPress={onClose} />
  </View>
  );
};
