import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const Details = ({ route }) => {
    const { school } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>{school.school_name}</Text>

                <View style={styles.detailsSection}>
                    <View style={styles.detailsHeader}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Website</Text>
                        <Text style={styles.detailsValue}>{school.url_address || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Email</Text>
                        <Text style={styles.detailsValue}>{school.email_address || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Phone</Text>
                        <Text style={styles.detailsValue}>{school.telephone_no || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.detailsSection}>
                    <View style={styles.detailsHeader}>
                        <Text style={styles.sectionTitle}>Address</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Address</Text>
                        <Text style={styles.detailsValue}>{school.address || 'N/A'}</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Postal Code</Text>
                        <Text style={styles.detailsValue}>{school.postal_code || 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.detailsSection}>
                    <View style={styles.detailsHeader}>
                        <Text style={styles.sectionTitle}>School Leadership</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Principal</Text>
                        <Text style={styles.detailsValue}>{school.principal_name || 'N/A'}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    detailsContainer: {
        flex: 1,
        padding: 16,
    },
    detailsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 24,
    },
    detailsSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
    },
    detailsHeader: {
        backgroundColor: '#E8F5E9',
        padding: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4CAF50',
    },
    detailsRow: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    detailsLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    detailsValue: {
        fontSize: 16,
        color: '#2c3e50',
    },
});

export default Details;
