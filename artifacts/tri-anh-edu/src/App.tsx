import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";

// Pages
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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Auth routes */}
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
