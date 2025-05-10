import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import RequireAuth from "./Utils/RequireAuth";
import ScrollToTop from "./Utils/scrollToTop";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Tasks = lazy(() => import("./Pages/Tasks"));
const TaskNew = lazy(() => import("./Pages/TaskNew"));
const TaskEdit = lazy(() => import("./Pages/TaskEdit"));

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loader />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/tasks"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader />}>
                <Tasks />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/tasks/new"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader />}>
                <TaskNew />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/tasks/edit/:id"
          element={
            <RequireAuth>
              <Suspense fallback={<Loader />}>
                <TaskEdit />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Login />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
};

export default App;
