import { User } from "@/types/user-entity";
import React, { createContext, useContext } from "react";

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	
	return context;
}

interface UserState {
	user: User | null;
	isLoading: boolean;
	error: Error | null;
}

type UserAction =
	| { type: 'SET_USER'; payload: User | null }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: Error | null };

export const UserContext = createContext<
	| {
			state: UserState;
			dispatch: React.Dispatch<UserAction>;
	  }
	| undefined
>(undefined);

export function userReducer(state: UserState, action: UserAction): UserState {
	console.info('UserContext: Action dispatched:', action.type, action.payload);

	const newState = (() => {
		switch (action.type) {
		case 'SET_USER':
			return { ...state, user: action.payload };
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
		}
	})();

	console.info('UserContext: State updated:', newState);

	return newState;
}