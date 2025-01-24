import React, { useState, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import {
	signInAnonymously,
	signInWithPopup,
	GoogleAuthProvider,
	updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/services/firebase/config';
import { version } from '../../../package.json';
import './login.scss';
import { User } from '@/types/user-entity';
import { useNavigate } from 'react-router';

const LoginComponent = () => {
	const [tempName, setTempName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const createUserDocument = useCallback(async (uid: string, userData: Partial<User>) => {
		console.info('Creating/updating user document:', { uid, userData });
		try {
			const userDocRef = doc(firestore, 'users', uid);
			await setDoc(
				userDocRef,
				{
					...userData,
					createdAt: new Date().toISOString(),
					lastLoginAt: new Date().toISOString(),
				},
				{ merge: true }
			);
			console.info('User document created/updated successfully');
		} catch (error) {
			console.error('Error creating user document:', error);
			throw error;
		}
	}, []);

	const handleAuthSuccess = useCallback(async () => {
		console.info('Authentication successful, navigating to home');
		navigate('/');
	}, [navigate]);

	const handleTempLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (tempName.trim().length < 2) {
			setError('Name must be at least 2 characters long');
			
			return;
		}

		console.info('Starting temporary login process');
		setIsLoading(true);
		setError(null);

		try {
			// Sign in anonymously
			console.info('Attempting anonymous sign-in');
			const { user } = await signInAnonymously(auth);

			// Update profile with temporary name
			console.info('Updating user profile');
			await updateProfile(user, {
				displayName: tempName,
			});

			// Create or update user document in Firestore
			await createUserDocument(user.uid, {
				uid: user.uid,
				displayName: tempName,
				isAnonymous: true,
				photoURL: null,
			});

			// Navigate after successful authentication
			await handleAuthSuccess();
		} catch (error) {
			console.error('Error during temporary login:', error);
			setError('Failed to login. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		console.info('Starting Google login process');
		setIsLoading(true);
		setError(null);

		try {
			const provider = new GoogleAuthProvider();
			const { user } = await signInWithPopup(auth, provider);

			if (!user.displayName) {
				throw new Error('Google account must have a display name');
			}

			// Create or update user document in Firestore
			await createUserDocument(user.uid, {
				uid: user.uid,
				displayName: user.displayName,
				isAnonymous: false,
				photoURL: user.photoURL,
			});

			// Navigate after successful authentication
			await handleAuthSuccess();
		} catch (error) {
			console.error('Error during Google login:', error);
			let errorMessage = 'Failed to login with Google. Please try again.';
            
			if (error instanceof Error) {
				if (error.message.includes('popup')) {
					errorMessage = 'Popup was blocked. Please enable popups and try again.';
				} else if (error.message.includes('cancelled')) {
					errorMessage = 'Login was cancelled. Please try again.';
				}
			}
            
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='login-container'>
			<div className='login-wrapper'>
				{/* Logo */}
				<div className='logo'>
					<h1>
						<span className='blue'>Free</span>
						<span className='green'>Di</span>
					</h1>
					<p className='subtitle'>Fostering Collaborations</p>
					<p className='version'>v: {version}</p>
				</div>

				{/* Login Forms */}
				<div className='login-forms'>
					{error && <div className='error-message'>{error}</div>}

					<form onSubmit={handleTempLogin}>
						<input
							type='text'
							value={tempName}
							onChange={(e) => setTempName(e.target.value)}
							placeholder='Enter a temporary name'
							required
							minLength={2}
							maxLength={50}
							disabled={isLoading}
							className='temp-name-input'
						/>

						<button
							type='submit'
							disabled={isLoading || tempName.trim().length < 2}
							className='temp-login-btn'
						>
							{isLoading ? 'Logging in...' : 'Login with a temporary name'}
							<ArrowRight className='arrow-icon' />
						</button>
					</form>

					<div className='divider'>
						<span>Or</span>
					</div>

					<button
						onClick={handleGoogleLogin}
						disabled={isLoading}
						className='google-login-btn'
					>
						{isLoading ? 'Signing in...' : 'Sign up with Google'}
					</button>
				</div>

				{/* Language Selector */}
				<div className='language-selector'>
					<select>
						<option value='en'>English</option>
						<option value='es'>Español</option>
						<option value='fr'>Français</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default LoginComponent;