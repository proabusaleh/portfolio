import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import LoadingScreen from '../components/ui/LoadingScreen';
import DashboardLayout from '../components/layout/DashboardLayout';
import { PATHS } from './routes';

/* ─── Lazy pages ─── */
const Login          = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const Overview       = lazy(() => import('../pages/dashboard/Overview'));
const ProjectsList   = lazy(() => import('../pages/projects/ProjectsList'));
const ProjectForm    = lazy(() => import('../pages/projects/ProjectForm'));
const BlogList       = lazy(() => import('../pages/blog/BlogList'));
const BlogPostEdit   = lazy(() => import('../pages/blog/BlogPostEdit'));
const BlogComments   = lazy(() => import('../pages/blog/BlogComments'));
const ServicesList   = lazy(() => import('../pages/services/ServicesList'));
const SkillsList     = lazy(() => import('../pages/skills/SkillsList'));
const Testimonials   = lazy(() => import('../pages/testimonials/TestimonialsList'));
const MessagesInbox  = lazy(() => import('../pages/messages/MessagesInbox'));
const ResumeEdit     = lazy(() => import('../pages/resume/ResumeEdit'));
const MediaGallery   = lazy(() => import('../pages/media/MediaGallery'));
const Analytics      = lazy(() => import('../pages/analytics/AnalyticsOverview'));
const SeoManager     = lazy(() => import('../pages/seo/SeoManager'));
const Newsletter     = lazy(() => import('../pages/newsletter/NewsletterHome'));
const Contact        = lazy(() => import('../pages/contact/ContactInfo'));
const PagesList      = lazy(() => import('../pages/pages/PagesList'));
const MenusList      = lazy(() => import('../pages/menus/MenusList'));
const ActivityLog    = lazy(() => import('../pages/activity/ActivityLog'));
const Settings       = lazy(() => import('../pages/settings/Settings'));
const ProfilePage    = lazy(() => import('../pages/profile/ProfilePage'));
const NotificationsPage = lazy(() => import('../pages/notifications/NotificationsPage'));
const UsersList      = lazy(() => import('../pages/users/UsersList'));
const NotFound       = lazy(() => import('../pages/NotFound'));

/**
 * Helper: wraps a page in <ProtectedRoute> + <DashboardLayout>
 */
const Protected = (Page, roles) => (
  <ProtectedRoute roles={roles}>
    <DashboardLayout>
      <Page />
    </DashboardLayout>
  </ProtectedRoute>
);

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* ── PUBLIC ── */}
        <Route
          path={PATHS.LOGIN}
          element={<PublicRoute><Login /></PublicRoute>}
        />
        <Route
          path={PATHS.FORGOT_PASSWORD}
          element={<PublicRoute><ForgotPassword /></PublicRoute>}
        />

        {/* ── PROTECTED (with Dashboard layout) ── */}
        <Route path={PATHS.DASHBOARD}    element={Protected(Overview)} />
        <Route path={PATHS.PROJECTS}     element={Protected(ProjectsList)} />
        <Route path={PATHS.PROJECT_NEW}  element={Protected(ProjectForm)} />
        <Route path={PATHS.PROJECT_EDIT} element={Protected(ProjectForm)} />
        <Route path={PATHS.BLOG_NEW}         element={Protected(BlogPostEdit)} />
        <Route path={PATHS.BLOG_COMMENTS}    element={Protected(BlogComments)} />
        <Route path={PATHS.BLOG_EDIT}        element={Protected(BlogPostEdit)} />
        <Route path={PATHS.BLOG}             element={Protected(BlogList)} />
        <Route path={PATHS.SERVICES}     element={Protected(ServicesList)} />
        <Route path={PATHS.SKILLS}       element={Protected(SkillsList)} />
        <Route path={PATHS.TESTIMONIALS} element={Protected(Testimonials)} />
        <Route path={PATHS.MESSAGES}     element={Protected(MessagesInbox)} />
        <Route path={PATHS.RESUME}       element={Protected(ResumeEdit)} />
        <Route path={PATHS.MEDIA}        element={Protected(MediaGallery)} />
        <Route path={PATHS.ANALYTICS}    element={Protected(Analytics)} />
        <Route path={PATHS.SEO}          element={Protected(SeoManager)} />
        <Route path={PATHS.NEWSLETTER}   element={Protected(Newsletter)} />
        <Route path={PATHS.CONTACT_INFO} element={Protected(Contact)} />
        <Route path={PATHS.PAGES}        element={Protected(PagesList)} />
        <Route path={PATHS.PAGES_NEW}    element={Protected(PagesList)} />
        <Route path={PATHS.PAGES_EDIT}   element={Protected(PagesList)} />
        <Route path={PATHS.MENUS}        element={Protected(MenusList)} />
        <Route path={PATHS.USERS}        element={Protected(UsersList, ['admin'])} />
        <Route path={PATHS.ACTIVITY}     element={Protected(ActivityLog, ['admin'])} />
        <Route path={PATHS.NOTIFICATIONS} element={Protected(NotificationsPage)} />
        <Route path={PATHS.SETTINGS}     element={Protected(Settings)} />
        <Route path={PATHS.PROFILE}      element={Protected(ProfilePage)} />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}