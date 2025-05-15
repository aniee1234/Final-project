import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';




const sampleDishes = [
  { id: '1', name: 'Homemade Biryani', price: 250,  image: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA3L2FuZ3VzdGVvd19hX3Bob3RvX29mX2FfY2hpY2tlbl9oYW5kaV9iaXJ5YW5pX3NpZGVfdmlld19pc29sYXRlZF85ZmZjNjI3MC05M2IzLTQ3NDMtYjllYS05OGE2NzEwMjFkZThfMS5qcGc.jpg' },
  { id: '2', name: 'Raita+salad', price: 80,  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn1qudj9caFrLBdWK4MVFdrEOa9qqpDd7t1g&s' },
  { id: '3', name: 'kheer', price: 80,  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZKycmMwIm2JSeBaS-A8RSxeAXuoOQ7nrzwA&s' },
  { id: '4', name: 'Paneer Curry', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQ1ysEX97yhht0Qt1-A1QDHCKfZIiwILBHQ&s' },

    { id: '5', name: 'Chapati', price: 30, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7m4cagEwzToVCABZZbKg1fyA7oHVb42Z_g&s' },

    { id: '6', name: 'Gulab Jamun', price: 100, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ-r85Nw7sXKn-wt0tAGZa6Vpz4lKk2ChaAw&s' },
  
  { id: '7', name: 'Mutton korma', price: 350, image: 'https://t4.ftcdn.net/jpg/05/32/19/77/360_F_532197714_A3iAnfwDeau6jYVbDa1g6ZB2y5w0443z.jpg' },
  { id: '8', name: 'Nan', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-RYaMG6fBoChmen1DOiATz_htn5mT471GQ&s' },
  { id: '9', name: 'Mix sabzi', price: 150, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgJsVzALmRfmKwG4UuwXS-rBZy71HgpiMOw&s' },
  { id: '10', name: 'Rajma Rice', price: 200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ2R3FJk9RJI9-1Ke3yTsz8g4du-rD--4DSg&s' },
];


//Splash Screen
const SplashScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>HomeFood</Text>
    <Text>Discover Home-Cooked Meals</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Onboarding')}>
      <Text style={styles.buttonText}>Get Started</Text>
    </TouchableOpacity>
  </View>
);

// Onboarding Screen
const OnboardingScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Welcome to HomeFood</Text>
    <Text>Explore, Order, Enjoy!</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>Continue</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  </View>
);

// Login Screen
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

// Signup Screen
const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Home Screen
const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
    <TextInput style={styles.input} placeholder="Search meals or cuisines" />
    <FlatList
      data={sampleDishes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MealsDetails', { dish: item })}>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name} - Rs {item.price}</Text>
            <Text>By {item.cook}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

// Search Results Screen
const SearchResultsScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Search Results</Text>
    <FlatList
      data={sampleDishes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MealsDetails', { dish: item })}>
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.name} - ${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Home')}>
      <Text style={styles.buttonText}>Back to Home</Text>
    </TouchableOpacity>
  </View>
);

// Cook Profile Screen
const CookProfileScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Cook Profile</Text>
    <Text>Aisha - Home Chef</Text>
    <Text>Rating: 4.8 ★</Text>
    <Text>Specialty: Indian Cuisine</Text>
    <FlatList
      data={sampleDishes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MealsDetails', { dish: item })}>
          <View style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Followed!')}>
      <Text style={styles.buttonText}>Follow Cook</Text>
    </TouchableOpacity>
  </View>
);

// Dish Details Screen
const MealsDetailsScreen = ({ route, navigation }) => {
  const { dish } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: dish.image }} style={styles.largeImage} />
      <Text style={styles.title}>{dish.name}</Text>
      <Text>By {dish.cook} - Rs {dish.price}</Text>
      <Text>Description: Delicious home-cooked {dish.name}</Text>
      <Text>Ingredients: Rice, Spices, Vegetables</Text>
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Cart', { dish })}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// Cart Screen
const CartScreen = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState(route.params?.dish ? [route.params.dish] : []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - ${item.price}</Text>
          </View>
        )}
      />
      <Text>Total: ${cartItems.reduce((sum, item) => sum + item.price, 0)}</Text>
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.buttonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Checkout Screen
const CheckoutScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Checkout</Text>
    <TextInput style={styles.input} placeholder="Delivery Address" />
    <TextInput style={styles.input} placeholder="Payment Method" />
    <Text>Total: $10</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('OrderConfirmation')}>
      <Text style={styles.buttonText}>Place Order</Text>
    </TouchableOpacity>
  </View>
);

// Order Confirmation Screen
const OrderConfirmationScreen = ({ navigation }) => (
  <View style={styles.center}>
    <Text style={styles.title}>Order Confirmed!</Text>
    <Text>Order #1234</Text>
    <Text>Estimated Delivery: 30 mins</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('OrderTracking')}>
      <Text style={styles.buttonText}>Track Order</Text>
    </TouchableOpacity>
  </View>
);

// Order Tracking Screen
const OrderTrackingScreen = () => (
  <View style={styles.center}>
    <Text style={styles.title}>Order Tracking</Text>
    <Text>Status: Being Prepared</Text>
    <Text>ETA: 25 mins</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Contacting...')}>
      <Text style={styles.buttonText}>Contact Cook</Text>
    </TouchableOpacity>
  </View>
);

// Order History Screen
const OrderHistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Order History</Text>
    <FlatList
      data={[{ id: '1', name: 'Biryani', date: '2025-05-14', total: 10 }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.name} - {item.date} - ${item.total}</Text>
        </View>
      )}
    />
  </View>
);

// Profile Screen
const ProfileScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Profile</Text>
    <Text>Name: John Doe</Text>
    <Text>Email: john@example.com</Text>
    <TextInput style={styles.input} placeholder="Address" />
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Saved!')}>
      <Text style={styles.buttonText}>Save Changes</Text>
    </TouchableOpacity>
  </View>
);

// Notifications Screen
const NotificationsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Notifications</Text>
    <FlatList
      data={[{ id: '1', message: 'Order #1234 is out for delivery!' }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item.message}</Text>
        </View>
      )}
    />
  </View>
);

// Review Screen
const ReviewScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Leave a Review</Text>
    <TextInput style={styles.input} placeholder="Rating (1-5)" />
    <TextInput style={styles.input} placeholder="Comments" multiline />
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Review Submitted!')}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
  </View>
);

// Cook Dashboard Screen
const CookDashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Cook Dashboard</Text>
    <Text>Active Orders: 2</Text>
    <Text>Earnings: $50</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Menu Management')}>
      <Text style={styles.buttonText}>Manage Menu</Text>
    </TouchableOpacity>
  </View>
);

// Menu Management Screen
const MenuManagementScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Manage Menu</Text>
    <TextInput style={styles.input} placeholder="Dish Name" />
    <TextInput style={styles.input} placeholder="Price" />
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Dish Added!')}>
      <Text style={styles.buttonText}>Add Dish</Text>
    </TouchableOpacity>
  </View>
);

// Delivery Dashboard Screen
const DeliveryDashboardScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Delivery Dashboard</Text>
    <Text>Assigned Orders: 1</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Order Details')}>
      <Text style={styles.buttonText}>View Order</Text>
    </TouchableOpacity>
  </View>
);

// Support Screen
const SupportScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Support</Text>
    <Text>FAQs or Contact Us</Text>
    <TouchableOpacity style={styles.customButton} onPress={() => alert('Support Contacted')}>
      <Text style={styles.buttonText}>Contact Support</Text>
    </TouchableOpacity>
  </View>
);

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Orders" component={OrderHistoryScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Stack Navigator
const Stack = createStackNavigator();
const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="CookProfile" component={CookProfileScreen} />
      <Stack.Screen name="MealsDetails" component={MealsDetailsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="CookDashboard" component={CookDashboardScreen} />
      <Stack.Screen name="MenuManagement" component={MenuManagementScreen} />
      <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboardScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

// Basic Styles with Theme Colors
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#02332D' },

  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#02332D' },

  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#FB8818' },

  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5, borderColor: '#FB8818', color: '#FFF' },

  item: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#FB8818', backgroundColor: 'rgba(255, 255, 255, 0.1)' },

  image: { width: 250, height: 150, borderRadius: 20, borderWidth: 1, borderColor: '#FFF' },

  largeImage: { width: '100%', height: 200, borderRadius: 10, borderWidth: 0, borderColor: '#FFF' },

  customButton: { backgroundColor: '#FB8818', padding: 10, borderRadius: 20, marginVertical: 5, alignItems: 'center' },

  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default App;