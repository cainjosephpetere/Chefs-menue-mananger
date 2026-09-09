# Chef's Menu Manager — Part 2

A React Native / Expo implementation of Part 2 using the same dark navy, gold,
green, blue and pink visual style as the supplied reference screenshot.

## Included

- Chef's Menu Manager title and consistent dark UI
- Add New Dish form
- Dish Name
- Description
- Course selection: Starter / Main / Dessert
- Price
- Required-field validation
- Invalid-price validation
- Success confirmation
- Multiple menu items
- Automatic list update after adding a dish
- Responsive layout for phone screens

## Deliberately not implemented for Part 2

Search, filtering, editing, deleting and menu-statistics functionality are
left out because the brief says those features are for the Final PoE.

## Run

1. Install Node.js.
2. Open this folder in VS Code.
3. Run:

   npm install
   npx expo start

4. Scan the QR code using Expo Go, or press `a` for Android / `w` for web.

The initial menu items are sample data so the display is populated when the app
first launches. New items are stored in React state and immediately appear in
the list.
