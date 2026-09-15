import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import AccessDenied from '@/pages/auth/AccessDenied'
import ForgotPassword from '@/pages/auth/ForgotPassword'
import Login from '@/pages/auth/Login'
import SetNewPassword from '@/pages/auth/SetNewPassword'
import VerifyOtp from '@/pages/auth/VerifyOtp'
import Bookings from '@/pages/Bookings'
import BookingDetails from '@/pages/BookingDetails'
import Dashboard from '@/pages/Dashboard'
import DisputeDetails from '@/pages/DisputeDetails'
import DisputeResolve from '@/pages/DisputeResolve'
import Disputes from '@/pages/Disputes'
import Earnings from '@/pages/Earnings'
import HelpSupport from '@/pages/HelpSupport'
import HelpSupportDetails from '@/pages/HelpSupportDetails'
import LegalCompany from '@/pages/LegalCompany'
import ManageFaq from '@/pages/ManageFaq'
import ManageProfile from '@/pages/ManageProfile'
import Notifications from '@/pages/Notifications'
import PrivacyPolicy from '@/pages/PrivacyPolicy'
import ProviderDetails from '@/pages/ProviderDetails'
import Providers from '@/pages/Providers'
import ServiceCategory from '@/pages/ServiceCategory'
import ServiceCategoryForm from '@/pages/ServiceCategoryForm'
import ServiceDetails from '@/pages/ServiceDetails'
import Terms from '@/pages/Terms'
import UserDetails from '@/pages/UserDetails'
import Users from '@/pages/Users'
import Verification from '@/pages/Verification'
import VerificationDetails from '@/pages/VerificationDetails'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/set-new-password" element={<SetNewPassword />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/:id" element={<ProviderDetails />} />
        <Route path="/providers/:providerId/services/:serviceId" element={<ServiceDetails />} />
        <Route path="/service-category" element={<ServiceCategory />} />
        <Route path="/service-category/new" element={<ServiceCategoryForm />} />
        <Route path="/service-category/:id/edit" element={<ServiceCategoryForm />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/bookings/:id" element={<BookingDetails />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verification/:id" element={<VerificationDetails />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/disputes" element={<Disputes />} />
        <Route path="/disputes/:id" element={<DisputeDetails />} />
        <Route path="/disputes/:id/resolve" element={<DisputeResolve />} />
        <Route path="/help-support" element={<HelpSupport />} />
        <Route path="/help-support/:id" element={<HelpSupportDetails />} />
        <Route path="/manage-faq" element={<ManageFaq />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal-company" element={<LegalCompany />} />
        <Route path="/profile" element={<ManageProfile />} />
      </Route>
    </Routes>
  )
}
