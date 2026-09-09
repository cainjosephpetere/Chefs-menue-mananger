import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const COLORS = {
  background: "#151922",
  surface: "#1D2330",
  surface2: "#222938",
  border: "#30394B",
  text: "#F5F5F2",
  muted: "#8F9AB0",
  gold: "#F2AA2E",
  goldDark: "#D9921D",
  starter: "#3F8B68",
  starterBg: "#1E332C",
  main: "#3E79A9",
  mainBg: "#1D2D3C",
  dessert: "#B85B78",
  dessertBg: "#35232D",
  danger: "#7E1F3A",
  dangerBg: "#321B25",
};

const COURSE_STYLES = {
  Starter: { text: COLORS.starter, bg: COLORS.starterBg },
  Main: { text: COLORS.main, bg: COLORS.mainBg },
  Dessert: { text: COLORS.dessert, bg: COLORS.dessertBg },
};

const initialDishes = [
  {
    id: "1",
    name: "Roasted Butternut Soup",
    description:
      "Velvety butternut squash with ginger, coconut cream and a toasted seed garnish.",
    course: "Starter",
    price: "8.50",
  },
  {
    id: "2",
    name: "Seared Duck Breast",
    description:
      "Pan-seared duck breast with cherry jus, creamed celeriac and wilted spinach.",
    course: "Main",
    price: "28.00",
  },
  {
    id: "3",
    name: "Pan-fried Kingklip",
    description:
      "Line-caught kingklip, lemon beurre blanc, crushed new potatoes and asparagus.",
    course: "Main",
    price: "32.50",
  },
];

function App() {
  const [dishes, setDishes] = useState(initialDishes);
  const [modalVisible, setModalVisible] = useState(false);

  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState({});

  const clearForm = () => {
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    setErrors({});
  };

  const openForm = () => {
    clearForm();
    setModalVisible(true);
  };

  const closeForm = () => {
    setModalVisible(false);
    clearForm();
  };

  const validate = () => {
    const nextErrors = {};

    if (!dishName.trim()) nextErrors.dishName = "Dish name is required.";
    if (!description.trim()) nextErrors.description = "Description is required.";
    if (!course) nextErrors.course = "Please select a course.";
    if (!price.trim()) {
      nextErrors.price = "Price is required.";
    } else if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      nextErrors.price = "Enter a valid price greater than 0.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const addDish = () => {
    if (!validate()) return;

    const newDish = {
      id: Date.now().toString(),
      name: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setDishes((current) => [newDish, ...current]);
    closeForm();

    Alert.alert(
      "Dish added successfully",
      `"${newDish.name}" has been added to the menu.`
    );
  };

  const subtitle = useMemo(() => {
    if (dishes.length === 0) return "No menu items yet";
    return `${dishes.length} ${dishes.length === 1 ? "menu item" : "menu items"}`;
  }, [dishes.length]);

  const renderDish = ({ item }) => {
    const courseStyle = COURSE_STYLES[item.course];

    return (
      <View style={styles.dishCard}>
        <View style={styles.dishTopRow}>
          <Text style={styles.dishName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.price}>R{item.price}</Text>
        </View>

        <View
          style={[
            styles.courseBadge,
            { backgroundColor: courseStyle.bg },
          ]}
        >
          <Text style={[styles.courseText, { color: courseStyle.text }]}>
            {item.course}
          </Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>✦  RESTAURANT MANAGER</Text>
          <Text style={styles.title}>Chef's Menu Manager</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu Items</Text>
          <Text style={styles.sectionCount}>{dishes.length}</Text>
        </View>

        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={renderDish}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No menu items added</Text>
              <Text style={styles.emptyText}>
                Tap “Add New Dish” to create your first menu item.
              </Text>
            </View>
          }
        />

        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.pressed,
          ]}
          onPress={openForm}
        >
          <Text style={styles.plus}>+</Text>
          <Text style={styles.addButtonText}>Add New Dish</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeForm}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalEyebrow}>MENU ITEM</Text>
                <Text style={styles.modalTitle}>Add New Dish</Text>
              </View>

              <Pressable onPress={closeForm} style={styles.closeButton}>
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Dish Name</Text>
            <TextInput
              value={dishName}
              onChangeText={setDishName}
              placeholder="e.g. Grilled Salmon"
              placeholderTextColor={COLORS.muted}
              style={[styles.input, errors.dishName && styles.inputError]}
              autoCapitalize="words"
            />
            {errors.dishName && (
              <Text style={styles.errorText}>{errors.dishName}</Text>
            )}

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe the dish..."
              placeholderTextColor={COLORS.muted}
              style={[
                styles.input,
                styles.multilineInput,
                errors.description && styles.inputError,
              ]}
              multiline
              textAlignVertical="top"
            />
            {errors.description && (
              <Text style={styles.errorText}>{errors.description}</Text>
            )}

            <Text style={styles.label}>Course</Text>
            <View style={styles.courseRow}>
              {["Starter", "Main", "Dessert"].map((item) => {
                const selected = course === item;
                const itemStyle = COURSE_STYLES[item];

                return (
                  <Pressable
                    key={item}
                    onPress={() => {
                      setCourse(item);
                      setErrors((current) => ({
                        ...current,
                        course: undefined,
                      }));
                    }}
                    style={[
                      styles.courseOption,
                      selected && {
                        borderColor: itemStyle.text,
                        backgroundColor: itemStyle.bg,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.courseOptionText,
                        selected && { color: itemStyle.text },
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {errors.course && (
              <Text style={styles.errorText}>{errors.course}</Text>
            )}

            <Text style={styles.label}>Price</Text>
            <View
              style={[
                styles.priceInputWrapper,
                errors.price && styles.inputError,
              ]}
            >
              <Text style={styles.currency}>R</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                placeholderTextColor={COLORS.muted}
                style={styles.priceInput}
                keyboardType="decimal-pad"
              />
            </View>
            {errors.price && (
              <Text style={styles.errorText}>{errors.price}</Text>
            )}

            <View style={styles.modalActions}>
              <Pressable
                onPress={closeForm}
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={addDish}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.saveText}>Add Dish</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 8,
    paddingBottom: 14,
  },
  eyebrow: {
    color: COLORS.muted,
    fontSize: 10,
    letterSpacing: 1.1,
    marginBottom: 6,
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  subtitle: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 5,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
  },
  sectionCount: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "800",
    backgroundColor: "#302716",
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
  },
  listContent: {
    paddingBottom: 92,
  },
  dishCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    padding: 13,
    marginBottom: 10,
  },
  dishTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  dishName: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 19,
  },
  price: {
    color: COLORS.gold,
    fontSize: 13,
    fontWeight: "900",
    paddingTop: 1,
  },
  courseBadge: {
    alignSelf: "flex-start",
    borderRadius: 9,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginTop: 7,
    marginBottom: 7,
  },
  courseText: {
    fontSize: 10,
    fontWeight: "700",
  },
  description: {
    color: "#93A0B7",
    fontSize: 11,
    lineHeight: 16,
  },
  emptyState: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    padding: 24,
    alignItems: "center",
    marginTop: 8,
  },
  emptyTitle: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 15,
  },
  emptyText: {
    color: COLORS.muted,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 18,
    backgroundColor: COLORS.gold,
    minHeight: 50,
    paddingHorizontal: 17,
    borderRadius: 26,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  plus: {
    color: "#171717",
    fontSize: 22,
    fontWeight: "500",
    marginRight: 8,
    marginTop: -2,
  },
  addButtonText: {
    color: "#171717",
    fontSize: 13,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.75,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.68)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 22,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 17,
  },
  modalEyebrow: {
    color: COLORS.muted,
    fontSize: 9,
    letterSpacing: 1.2,
    fontWeight: "700",
  },
  modalTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: COLORS.text,
    fontSize: 24,
    lineHeight: 27,
    fontWeight: "300",
  },
  label: {
    color: "#DDE1E8",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
    marginTop: 9,
  },
  input: {
    minHeight: 46,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface2,
    color: COLORS.text,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  multilineInput: {
    height: 78,
    paddingTop: 11,
  },
  inputError: {
    borderColor: "#B84D61",
  },
  errorText: {
    color: "#E68191",
    fontSize: 10,
    marginTop: 4,
  },
  courseRow: {
    flexDirection: "row",
    gap: 8,
  },
  courseOption: {
    flex: 1,
    minHeight: 42,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  courseOptionText: {
    color: COLORS.muted,
    fontSize: 11,
    fontWeight: "700",
  },
  priceInputWrapper: {
    height: 46,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface2,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
  },
  currency: {
    color: COLORS.gold,
    fontSize: 14,
    fontWeight: "800",
  },
  priceInput: {
    flex: 1,
    color: COLORS.text,
    fontSize: 13,
    paddingHorizontal: 9,
  },
  modalActions: {
    flexDirection: "row",
    gap: 9,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface2,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "800",
  },
  saveButton: {
    flex: 1.4,
    minHeight: 48,
    borderRadius: 9,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#171717",
    fontSize: 13,
    fontWeight: "900",
  },
});

export default App;
