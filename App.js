import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Details from './Details';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const datasetId = "d_688b934f82c1059ed0a6993d2a829089";
        const url = "https://data.gov.sg/api/action/datastore_search?resource_id=" + datasetId;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                if (data.result && data.result.records) {
                    setData(data.result.records);
                    setFilteredData(data.result.records);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        if (text === '') {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(item => item.school_name.toLowerCase().includes(text.toLowerCase())));
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Schools..."
                    placeholderTextColor="#666"
                    value={search}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item._id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => navigation.navigate('Details', { school: item })}
                    >
                        <View style={styles.itemContent}>
                            <Text style={styles.schoolName}>{item.school_name}</Text>
                            <View style={styles.schoolInfoRow}>
                                <Text style={styles.schoolType}>{item.mainlevel_code}</Text>
                            </View>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4CAF50',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Singapore School Directory' }}
                />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={{ title: 'School Information' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        padding: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    searchInput: {
        height: 40,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    listContainer: {
        padding: 12,
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 8,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemContent: {
        flex: 1,
    },
    schoolName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    schoolInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    schoolType: {
        fontSize: 14,
        color: '#4CAF50',
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        overflow: 'hidden',
        marginRight: 8,
    },
    chevron: {
        fontSize: 24,
        color: '#4CAF50',
        marginLeft: 8,
    }
});

export default App;
