import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './login.scss';
import { version } from '../../../package.json';

const LoginComponent = () => {
	const [tempName, setTempName] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleTempLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		// Here you would implement Firebase anonymous auth
		console.log('Temporary login with:', tempName);
		setIsLoading(false);
	};

	const handleGoogleLogin = async () => {
		setIsLoading(true);
		// Here you would implement Firebase Google auth
		console.log('Google login clicked');
		setIsLoading(false);
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
					<form onSubmit={handleTempLogin}>
						<input
							type='text'
							value={tempName}
							onChange={(e) => setTempName(e.target.value)}
							placeholder='Enter a temporary name'
							required
						/>

						<button
							type='submit'
							disabled={isLoading}
							className='temp-login-btn'
						>
							Login with a temporary name
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
						Sign up with Google
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
