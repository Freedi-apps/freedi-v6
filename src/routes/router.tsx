import { Routes, Route, BrowserRouter } from 'react-router';
import Home from '../pages/home/Home';
import React from 'react';

const LoginComponent = React.lazy(() => import('@/pages/login/Login'));
const AppComponent = React.lazy(() => import('@/App'));

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<AppComponent />}>
					<Route index element={<Home />} />
				</Route>
				<Route path='login' element={<LoginComponent />} />
				<Route path='*' element={<div>404 Not Found</div>} />
			</Routes>
		</BrowserRouter>
	);
}
