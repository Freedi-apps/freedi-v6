import React, { useReducer, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '@/services/firebase/config';
import { User } from '@/types/user-entity';
import { User as FirebaseUser } from 'firebase/auth';
import { UserContext, userReducer } from '@/hooks/useUser';

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(userReducer, {
		user: null,
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(
			async (firebaseUser: FirebaseUser | null) => {
				console.info(
					'UserContext: Auth state changed:',
					firebaseUser ? 'User authenticated' : 'User signed out'
				);

				try {
					if (firebaseUser) {
						const userDoc = await getDoc(
							doc(firestore, 'users', firebaseUser.uid)
						);
						const userData = userDoc.data();
						console.info(
							'UserContext: Firestore user data retrieved:',
							userData
						);

						const user: User = {
							uid: firebaseUser.uid,
							displayName:
								firebaseUser.displayName || userData?.displayName || null,
							isAnonymous: firebaseUser.isAnonymous,
							photoURL: firebaseUser.photoURL || userData?.photoURL || null,
						};

						dispatch({ type: 'SET_USER', payload: user });
					} else {
						dispatch({ type: 'SET_USER', payload: null });
					}
				} catch (error) {
					console.error(
						'UserContext: Error in auth state change handler:',
						error
					);
					dispatch({ type: 'SET_ERROR', payload: error as Error });
				} finally {
					dispatch({ type: 'SET_LOADING', payload: false });
				}
			}
		);

		return () => {
			console.info('UserContext: Cleaning up auth state listener');
			unsubscribe();
		};
	}, []);

	const value = React.useMemo(() => ({ state, dispatch }), [state]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
