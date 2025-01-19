import { Routes, Route, BrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/Home';
import LoginComponent from '@/pages/login/Login';

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<App />}>
					<Route index element={<Home />} />
				</Route>
				<Route path='login' element={<LoginComponent/>} />
				<Route path='*' element={<div>404 Not Found</div>} />
			</Routes>
		</BrowserRouter>
	);
}
