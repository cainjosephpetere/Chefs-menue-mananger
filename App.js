import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const COURSES = ['Starter', 'Main Course', 'Dessert'];

export default function App() {
  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Garlic Bread', description: 'Toasted bread with garlic herb butter', course: 'Starter', price: '45.00' },
    { id: '2', name: 'Grilled Ribeye Steak', description: 'Served with mushroom sauce and fries', course: 'Main Course', price: '180.00' },
    { id: '3', name: 'Chocolate Brownie', description: 'Warm fudge brownie with vanilla ice cream', course: 'Dessert', price: '65.00' },
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starter');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSaveItem = () => {
    if (!name.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Please fill in all fields (Name, Description, and Price).');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid positive number for the price.');
      return;
    }

    if (editingId) {
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingId
            ? { ...item, name, description, course, price: parsedPrice.toFixed(2) }
            : item
        )
      );
      Alert.alert('Success', 'Menu item updated successfully!');
      setEditingId(null);
    } else {
      const newItem = {
        id: Date.now().toString(),
        name,
        description,
        course,
        price: parsedPrice.toFixed(2),
      };
      setMenuItems([newItem, ...menuItems]);
      Alert.alert('Success', 'New menu item added successfully!');
    }

    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const handleEditItem = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price);
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this menu item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setMenuItems(menuItems.filter((item) => item.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setName('');
              setDescription('');
              setCourse('Starter');
              setPrice('');
            }
            Alert.alert('Deleted', 'Menu item removed successfully.');
          },
        },
      ]
    );
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
  };

  const totalItems = menuItems.length;
  const averagePrice =
    totalItems > 0
      ? (menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0) / totalItems).toFixed(2)
      : '0.00';

  const countByCourse = COURSES.reduce((acc, c) => {
    acc[c] = menuItems.filter((item) => item.course === c).length;
    return acc;
  }, {});

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.course === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const clearSearchAndFilter = () => {
    setSearchQuery('');
    setSelectedFilter('All');
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={[styles.badge, styles[`badge${item.course.replace(/\s+/g, '')}`]]}>
          <Text style={styles.badgeText}>{item.course}</Text>
        </View>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.itemPrice}>R {item.price}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEditItem(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.headerTitle}>👨‍🍳 Chef's Menu Manager</Text>
            <Text style={styles.headerSubtitle}>Manage, filter, and analyze your culinary creations</Text>
          </View>

          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>📊 Menu Overview</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{totalItems}</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {averagePrice}</Text>
                <Text style={styles.statLabel}>Avg Price</Text>
              </View>
            </View>
            <View style={styles.courseStatsRow}>
              {COURSES.map((c) => (
                <View key={c} style={styles.courseStatBox}>
                  <Text style={styles.courseStatNumber}>{countByCourse[c]}</Text>
                  <Text style={styles.courseStatLabel}>{c}s</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              {editingId ? '✏️ Edit Menu Item' : '➕ Add New Menu Item'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Dish Name (e.g. Seafood Pasta)"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Description (e.g. Fresh prawns in garlic sauce)"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Select Course:</Text>
            <View style={styles.courseSelector}>
              {COURSES.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.courseOption, course === c && styles.courseOptionSelected]}
                  onPress={() => setCourse(c)}
                >
                  <Text style={[styles.courseOptionText, course === c && styles.courseOptionTextSelected]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Price (R)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <View style={styles.formButtonRow}>
              <TouchableOpacity
                style={[styles.primaryButton, { flex: 1 }]}
                onPress={handleSaveItem}
              >
                <Text style={styles.primaryButtonText}>
                  {editingId ? 'Update Item' : 'Add Item'}
                </Text>
              </TouchableOpacity>

              {editingId && (
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.searchFilterContainer}>
            <Text style={styles.sectionTitle}>🔍 Search & Filter</Text>

            <TextInput
              style={styles.input}
              placeholder="Search by dish name..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {['All', ...COURSES].map((filt) => (
                <TouchableOpacity
                  key={filt}
                  style={[styles.filterChip, selectedFilter === filt && styles.filterChipSelected]}
                  onPress={() => setSelectedFilter(filt)}
                >
                  <Text style={[styles.filterChipText, selectedFilter === filt && styles.filterChipTextSelected]}>
                    {filt}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {(searchQuery !== '' || selectedFilter !== 'All') && (
              <TouchableOpacity style={styles.clearFilterButton} onPress={clearSearchAndFilter}>
                <Text style={styles.clearFilterText}>Clear Search & Filters</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.sectionTitle}>📋 Menu Items ({filteredItems.length})</Text>
            {filteredItems.length === 0 ? (
              <Text style={styles.emptyText}>No menu items found matching your criteria.</Text>
            ) : (
              <FlatList
                data={filteredItems}
                renderItem={renderMenuItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  scrollContainer: { padding: 16, paddingBottom: 40 },
  header: { marginBottom: 20, alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50' },
  headerSubtitle: { fontSize: 14, color: '#7f8c8d', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#34495e', marginBottom: 10 },
  statsContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, elevation: 2 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statBox: { flex: 1, backgroundColor: '#ecf0f1', borderRadius: 8, padding: 12, alignItems: 'center', marginHorizontal: 4 },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#2980b9' },
  statLabel: { fontSize: 12, color: '#7f8c8d', marginTop: 2 },
  courseStatsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  courseStatBox: { flex: 1, backgroundColor: '#f1c40f20', borderRadius: 8, padding: 8, alignItems: 'center', marginHorizontal: 3 },
  courseStatNumber: { fontSize: 14, fontWeight: 'bold', color: '#d35400' },
  courseStatLabel: { fontSize: 10, color: '#7f8c8d' },
  formContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, elevation: 2 },
  input: { backgroundColor: '#fdfdfd', borderWidth: 1, borderColor: '#dcdde1', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, marginBottom: 12, color: '#2c3e50' },
  label: { fontSize: 14, color: '#34495e', marginBottom: 6, fontWeight: '500' },
  courseSelector: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  courseOption: { flex: 1, borderWidth: 1, borderColor: '#bdc3c7', borderRadius: 8, paddingVertical: 8, alignItems: 'center', marginHorizontal: 3, backgroundColor: '#fff' },
  courseOptionSelected: { backgroundColor: '#2980b9', borderColor: '#2980b9' },
  courseOptionText: { fontSize: 12, color: '#7f8c8d', fontWeight: '600' },
  courseOptionTextSelected: { color: '#fff' },
  formButtonRow: { flexDirection: 'row', alignItems: 'center' },
  primaryButton: { backgroundColor: '#27ae60', borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  cancelButton: { backgroundColor: '#95a5a6', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 16, marginLeft: 8, alignItems: 'center' },
  cancelButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  searchFilterContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20, elevation: 2 },
  filterScroll: { flexDirection: 'row', marginBottom: 10 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#bdc3c7', marginRight: 8, backgroundColor: '#fff' },
  filterChipSelected: { backgroundColor: '#2c3e50', borderColor: '#2c3e50' },
  filterChipText: { fontSize: 12, color: '#7f8c8d' },
  filterChipTextSelected: { color: '#fff', fontWeight: 'bold' },
  clearFilterButton: { alignItems: 'center', marginTop: 4, padding: 6 },
  clearFilterText: { color: '#e74c3c', fontSize: 13, fontWeight: '600' },
  listContainer: { marginBottom: 20 },
  emptyText: { textAlign: 'center', color: '#95a5a6', fontStyle: 'italic', marginTop: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#2980b9', elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeStarter: { backgroundColor: '#3498db20' },
  badgeMainCourse: { backgroundColor: '#e67e2220' },
  badgeDessert: { backgroundColor: '#9b59b620' },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#34495e' },
  itemDescription: { fontSize: 13, color: '#7f8c8d', marginBottom: 10 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ecf0f1', paddingTop: 8 },
  itemPrice: { fontSize: 15, fontWeight: 'bold', color: '#27ae60' },
  actionButtons: { flexDirection: 'row' },
  editButton: { backgroundColor: '#3498db', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, marginRight: 6 },
  deleteButton: { backgroundColor: '#e74c3c', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  buttonText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});
