import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './routes/router.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<UserProvider>
			<Router />
		</UserProvider>
	</StrictMode>
);
