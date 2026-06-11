import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import { AdminLayout } from "@/components/admin/admin-layout";
import { AdminProvider } from "@/components/admin/admin-context";

// Public pages
import Home from "@/pages/home";
import Courses from "@/pages/courses";
import CourseDetail from "@/pages/courses/detail";
import Exams from "@/pages/exams";
import ExamDetail from "@/pages/exams/detail";
import ExamTake from "@/pages/exams/take";
import ExamResult from "@/pages/exams/result";
import Teachers from "@/pages/teachers";
import TeacherDetail from "@/pages/teachers/detail";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog/detail";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ForgotPassword from "@/pages/auth/forgot-password";
import Dashboard from "@/pages/dashboard";
import Profile from "@/pages/profile";

// Classroom pages (student)
import MyClassrooms from "@/pages/classrooms/index";
import ClassroomDetail from "@/pages/classrooms/detail";

// Admin pages
import AdminOverview from "@/pages/admin/index";
import AdminCourses from "@/pages/admin/courses";
import AdminCategories from "@/pages/admin/categories";
import AdminLessons from "@/pages/admin/lessons";
import AdminExams from "@/pages/admin/exams";
import AdminQuestions from "@/pages/admin/questions";
import AdminResults from "@/pages/admin/results";
import AdminUsers from "@/pages/admin/users";
import AdminRoles from "@/pages/admin/roles";
import AdminReviews from "@/pages/admin/reviews";
import AdminBlog from "@/pages/admin/blog";
import AdminBlogCategories from "@/pages/admin/blog-categories";
import AdminSettings from "@/pages/admin/settings";
import AdminLogs from "@/pages/admin/logs";
import AdminClassrooms from "@/pages/admin/classrooms";
import AdminClassroomsCreate from "@/pages/admin/classrooms-create";
import AdminClassroomsDetail from "@/pages/admin/classrooms-detail";
import AdminEnrollmentQueue from "@/pages/admin/enrollment-queue";

const queryClient = new QueryClient();

function AdminRoutes() {
  return (
    <AdminProvider>
      <AdminLayout>
        <Switch>
          <Route path="/admin" component={AdminOverview} />
          <Route path="/admin/courses" component={AdminCourses} />
          <Route path="/admin/categories" component={AdminCategories} />
          <Route path="/admin/lessons" component={AdminLessons} />
          <Route path="/admin/exams" component={AdminExams} />
          <Route path="/admin/questions" component={AdminQuestions} />
          <Route path="/admin/results" component={AdminResults} />
          <Route path="/admin/users" component={AdminUsers} />
          <Route path="/admin/roles" component={AdminRoles} />
          <Route path="/admin/reviews" component={AdminReviews} />
          <Route path="/admin/blog" component={AdminBlog} />
          <Route path="/admin/blog-categories" component={AdminBlogCategories} />
          <Route path="/admin/settings" component={AdminSettings} />
          <Route path="/admin/logs" component={AdminLogs} />
          <Route path="/admin/classrooms/create" component={AdminClassroomsCreate} />
          <Route path="/admin/classrooms/:id" component={AdminClassroomsDetail} />
          <Route path="/admin/classrooms" component={AdminClassrooms} />
          <Route path="/admin/enrollment-queue" component={AdminEnrollmentQueue} />
          <Route>
            <AdminOverview />
          </Route>
        </Switch>
      </AdminLayout>
    </AdminProvider>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes */}
      <Route path="/admin/*?" component={AdminRoutes} />

      {/* Auth routes (no layout) */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />

      {/* Exam taking interface (no main layout) */}
      <Route path="/exams/:id/take" component={ExamTake} />

      {/* Main layout routes */}
      <Route path="/">
        <Layout><Home /></Layout>
      </Route>
      <Route path="/courses">
        <Layout><Courses /></Layout>
      </Route>
      <Route path="/courses/:id">
        <Layout><CourseDetail /></Layout>
      </Route>
      <Route path="/exams">
        <Layout><Exams /></Layout>
      </Route>
      <Route path="/exams/:id">
        <Layout><ExamDetail /></Layout>
      </Route>
      <Route path="/exams/:id/result">
        <Layout><ExamResult /></Layout>
      </Route>
      <Route path="/teachers">
        <Layout><Teachers /></Layout>
      </Route>
      <Route path="/teachers/:id">
        <Layout><TeacherDetail /></Layout>
      </Route>
      <Route path="/blog">
        <Layout><Blog /></Layout>
      </Route>
      <Route path="/blog/:id">
        <Layout><BlogDetail /></Layout>
      </Route>
      <Route path="/classrooms/:id">
        <Layout><ClassroomDetail /></Layout>
      </Route>
      <Route path="/classrooms">
        <Layout><MyClassrooms /></Layout>
      </Route>
      <Route path="/dashboard">
        <Layout><Dashboard /></Layout>
      </Route>
      <Route path="/profile">
        <Layout><Profile /></Layout>
      </Route>

      <Route path="/*">
        <Layout><NotFound /></Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
