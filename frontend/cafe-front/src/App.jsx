import { useContext, useLayoutEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// --- Public Routes ---
import Home from '../routes/Home';
import Pricing from '../routes/Pricing';
import FAQ from '../routes/FAQ';
import Games from '../routes/Games';
import Events from '../routes/Events';
import SignIn from '../routes/SignIn';
import Bookings from '../routes/Bookings';
import Contact from '../routes/Contact';
import PrivacyPolicy from '../routes/PrivacyPolicy';
import Service from '../routes/Service';
import ServiceProduct from '../routes/ServiceProduct';
import Profile from '../routes/Profile';
import MyBookings from '../routes/MyBookings';
import { CheckoutForm, Return } from '../routes/Payment';

// --- Admin Routes ---
import AdminDashboard from '../routes/admin/AdminDashboard';
import EditEvents from '../routes/admin/EditEvents';
import EditPricing from '../routes/admin/EditPricing';
import EditTables from '../routes/admin/EditTables';
import EditHours from '../routes/admin/EditHours';
import EditBooking from '../routes/admin/EditBooking';

import './App.css';

const Wrapper = ({ children }) => {
	const location = useLocation();

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, [location.pathname]);
	return <>{children}</>;
};

const AdminRoute = ({ element }) => {
	const { isAuthenticated, isCheckingAuth } = useContext(AuthContext);
	if (isCheckingAuth) return <div> </div>;
	return isAuthenticated ? element : <Navigate to="/sign-in" />;
};

function App() {

	const location = useLocation();
	const isAdmin = location.pathname.startsWith('/admin');

	return (
		<div className={isAdmin ? 'admin-app' : 'public-app'}>
			<Wrapper>
				<Routes>
					{/* Public routes */}
					<Route path='/' element={<Home />} />
					<Route path='/pricing' element={<Pricing />} />
					<Route path='/faq' element={<FAQ />} />
					<Route path='/games' element={<Games />} />
					<Route path='/events' element={<Events />} />
					<Route path='/sign-in' element={<SignIn />} />
					<Route path='/bookings' element={<Bookings />} />
					<Route path='/checkout' element={<CheckoutForm />} />
					<Route path='/return' element={<Return />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/privacy-policy' element={<PrivacyPolicy />} />
					<Route path='/service' element={<Service />} />
					<Route path='/service-product/:serviceId' element={<ServiceProduct />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/account' element={<MyBookings />} />
					<Route path="*" element={<Navigate to="/" />} />

					{/* Admin routes */}
					<Route path='/admin' element={<AdminRoute element={<AdminDashboard />} />} />
					<Route path='/admin/edit-events' element={<AdminRoute element={<EditEvents />} />} />
					<Route path='/admin/edit-pricing' element={<AdminRoute element={<EditPricing />} />} />
					<Route path='/admin/edit-tables' element={<AdminRoute element={<EditTables />} />} />
					<Route path='/admin/edit-hours' element={<AdminRoute element={<EditHours />} />} />
					<Route path='/admin/edit-booking/:id' element={<AdminRoute element={<EditBooking />} />} />
				</Routes>
			</Wrapper>
		</div>
	);
}

export default App;
