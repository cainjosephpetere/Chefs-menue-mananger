# 👨‍🍳 Chef's Menu Manager – Final Portfolio of Evidence (Part 3)

Welcome to the final submission repository for the **Chef's Menu Manager** mobile application built using React Native and Expo. 

This document serves as the official transition changelog and architecture report, detailing all enhancements, new features, UI/UX improvements, and code refactoring completed moving from **Part 2** (basic menu item entry) to **Part 3** (full CRUD management, live search/filtering, real-time metrics, and defensive input validation).

---

## 🚀 Key Improvements & Transition Summary (Part 2 ➔ Part 3)

| Feature / Area | Part 2 Implementation | Part 3 (Final Version) Implementation |
| :--- | :--- | :--- |
| **Menu Items Management** | Read-only list display; basic item creation. | **Full CRUD Support:** Edit existing items, update details, and delete items with immediate state sync. |
| **Search & Discovery** | None (static full list). | **Real-Time Search & Filtering:** Filter dishes by name search query and course category chips (Starter, Main, Dessert). |
| **Analytics & Metrics** | None / Static text counts. | **Dynamic Dashboard:** Real-time calculation of total menu count, average menu price, and breakdown per course. |
| **Data Validation** | Minimal / native warnings. | **Defensive Form Validation:** Alert prompts for missing fields, price string format checks, and non-positive value guards. |
| **User Experience (UX)** | Basic list layout. | **Enhanced Feedback:** Action confirmation dialogs (`Alert.alert`), visually color-coded course badges, and clear action states. |
| **Code Architecture** | Single script with mixed logic. | **Refactored Architecture:** Modular state handlers, helper functions, and cohesive component structure. |

---

## 🛠️ Requirements & Feature Breakdown

### 1. Manage Menu Items (25 Marks)
* **Edit Menu Item:** Tapping the `Edit` button on any menu card pre-populates the top input form with that item's attributes (Name, Description, Course, and Price) and switches the primary action button to **"Update Item"**.
* **Update State Sync:** Submitting an edited item immediately updates the `menuItems` array in React state, refreshing the card view instantly.
* **Delete with Confirmation:** Tapping `Delete` triggers a native confirmation modal (`Alert.alert`) requesting chef confirmation before removing the item.
* **Form Reset & Cancellation:** An active editing session can be canceled at any time, returning the form to creation mode.

### 2. Search and Filter Menu Items (20 Marks)
* **Search by Dish Name:** Type-ahead filtering dynamically matches input text against item titles.
* **Course Category Filter:** Interactive filter chips allow filtering by `All`, `Starter`, `Main Course`, or `Dessert`.
* **Quick Filter Reset:** A dedicated button appears when filters or search queries are active, allowing the chef to restore the full list with one tap.

### 3. Real-Time Menu Statistics Dashboard (20 Marks)
* **Total Item Count:** Tracks exact number of items currently listed.
* **Average Item Price:** Calculates the sum of all item prices divided by total items, automatically formatted to 2 decimal places (`R XX.XX`).
* **Course Counts:** Visual metrics breakdown displaying exact counts for Starters, Mains, and Desserts.

### 4. Application Refactoring & Quality (20 Marks)
* **State Management:** Utilized standard React hooks (`useState`) to manage list items, form values, edit modes, search strings, and category selections efficiently.
* **Clean Code Practices:** Used meaningful variable names, descriptive helper functions (`handleSaveItem`, `handleDeleteItem`), and central constants (`COURSES`).
* **Optimized Rendering:** Rendered list items using optimized card structures with inline layout styles tailored for mobile devices.

### 5. User Experience & Feedback (10 Marks)
* **User Feedback:** Clear success/error alerts notify the user on successful additions, updates, or input mistakes.
* **Visual Hierarchy:** Distinct badge styling for Starters (`#3498db`), Main Courses (`#e67e22`), and Desserts (`#9b59b6`).
* **Keyboard & Safe Area Handling:** Wrapped in `SafeAreaView` and `KeyboardAvoidingView` to maintain interface visibility across iOS and Android screen variations.

---

## 📱 How to Run the Application in Expo Go

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher) installed on your system.
* **Expo Go** application installed on your iOS or Android device.

### Setup Instructions

1. **Clone the Repository & Navigate to Folder:**
   ```bash
   git clone <YOUR_REPOSITORY_GITHUB_LINK>
   cd chefs-menu-manager
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Expo Metro Bundler:**
   ```bash
   npx expo start -c
   ```

4. **Connect via Mobile Device:**
   * **Android:** Open the Expo Go app and tap **Scan QR code**.
   * **iOS:** Open the native **Camera** app and point it at the QR code in your terminal.
   * *Note (If using network/tunnel issues):* Run `npx expo start --tunnel` if your network blocks peer-to-peer local connections.

---

## 🎥 Video Demonstration Link

* **YouTube Video Link (Unlisted):** [INSERT_YOUR_YOUTUBE_UNLISTED_LINK_HERE]
* **Demonstrated Scenarios:**
  1. App launch and dashboard statistics overview.
  2. Adding new menu items (with input validation triggers).
  3. Editing existing items and verifying instant UI updates.
  4. Deleting an item after modal confirmation.
  5. Searching by dish name and filtering across categories.

---

## 📁 Project Structure

```
chefs-menu-manager/
├── assets/
│   ├── adaptive-icon.png
│   ├── icon.png
│   └── splash.png
├── App.js               # Main Application source code with full functionality
├── app.json             # Expo project configuration
├── babel.config.js      # Babel configuration
├── package.json         # Dependencies and scripts
└── README.md            # Comprehensive project transition documentation
```