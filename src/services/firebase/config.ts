import { initializeApp } from 'firebase/app';
import {
	browserLocalPersistence,
	connectAuthEmulator,
	getAuth,
	setPersistence,
} from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Firebase configuration object
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Environment configuration
const isDevelopment = import.meta.env.MODE === 'development';
const EMULATOR_HOST = '127.0.0.1';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Set persistence with error handling
const initializePersistence = async () => {
	try {
		await setPersistence(auth, browserLocalPersistence);
		console.info('Persistence set to local storage');
	} catch (error) {
		console.error('Error setting persistence:', error);
		throw error; // Rethrow to handle at app level if needed
	}
};

// Configure emulators for development
if (isDevelopment) {
	console.info('Running in development mode - connecting to emulators');
	try {
		connectFirestoreEmulator(firestore, EMULATOR_HOST, 8080);
		connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`, {
			disableWarnings: true,
		});
		connectStorageEmulator(storage, EMULATOR_HOST, 9199);
	} catch (error) {
		console.error('Error connecting to emulators:', error);
	}
}

// Initialize persistence
initializePersistence();

export { auth, firestore, storage, isDevelopment };
