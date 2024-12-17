import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; // For Firestore
import 'firebase/storage'; // For Firebase Storage

// Replace these with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID", // Optional for Analytics
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get references to Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Example usage:
// Authentication
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User is signed in:', user);
  } else {
    // User is signed out
    console.log('User is signed out');
  }
});

// Firestore
db.collection('users').doc('your-user-id').set({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

// Firebase Storage
const uploadTask = storage.ref('images/my-photo.jpg').put(yourImageData);
uploadTask.on('state_changed', (snapshot) => {
  // ... (Handle upload progress)
}, (error) => {
  // ... (Handle upload errors)
}, () => {
  // ... (Handle successful upload)
});

// ... (Other Firebase features you've discussed)

export { auth, db, storage }; // Export for use in your app components
