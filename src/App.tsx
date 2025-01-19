import './App.scss';
import { Outlet } from 'react-router';
import { useUser } from './contexts/UserContext';
import { useEffect } from 'react';

function App() {
	const { state } = useUser();

	useEffect(() => {
        console.warn('User state changed:', state.user);
        // Adding more detailed logging
        console.warn('Full state:', state);
    }, [state.user]);

	return (
		<>
			<Outlet />;
		</>
	);
}

export default App;
