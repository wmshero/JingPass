import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';

import P_home from '../pages/p-home';
import P_login from '../pages/p-login';
import P_register from '../pages/p-register';
import P_forgot_password from '../pages/p-forgot_password';
import P_user_profile from '../pages/p-user_profile';
import P_question_bank from '../pages/p-question_bank';
import P_question_detail from '../pages/p-question_detail';
import P_interview_create from '../pages/p-interview_create';
import P_interview_simulation from '../pages/p-interview_simulation';
import P_interview_evaluation from '../pages/p-interview_evaluation';
import P_interview_history from '../pages/p-interview_history';
import P_learning_center from '../pages/p-learning_center';
import P_learning_detail from '../pages/p-learning_detail';
import NotFoundPage from './NotFoundPage';
import ErrorPage from './ErrorPage';

function Listener() {
  const location = useLocation();
  useEffect(() => {
    const pageId = 'P-' + location.pathname.replace('/', '').toUpperCase();
    console.log('当前pageId:', pageId, ', pathname:', location.pathname, ', search:', location.search);
    if (typeof window === 'object' && window.parent && window.parent.postMessage) {
      window.parent.postMessage({
        type: 'chux-path-change',
        pageId: pageId,
        pathname: location.pathname,
        search: location.search,
      }, '*');
    }
  }, [location]);

  return <Outlet />;
}

// 使用 createBrowserRouter 创建路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: <Listener />,
    children: [
      {
    path: '/',
    element: <Navigate to='/home' replace={true} />,
  },
      {
    path: '/home',
    element: (
      <ErrorBoundary>
        <P_home />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/login',
    element: (
      <ErrorBoundary>
        <P_login />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/register',
    element: (
      <ErrorBoundary>
        <P_register />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/forgot-password',
    element: (
      <ErrorBoundary>
        <P_forgot_password />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/user-profile',
    element: (
      <ErrorBoundary>
        <P_user_profile />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/question-bank',
    element: (
      <ErrorBoundary>
        <P_question_bank />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/question-detail',
    element: (
      <ErrorBoundary>
        <P_question_detail />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/interview-create',
    element: (
      <ErrorBoundary>
        <P_interview_create />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/interview-simulation',
    element: (
      <ErrorBoundary>
        <P_interview_simulation />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/interview-evaluation',
    element: (
      <ErrorBoundary>
        <P_interview_evaluation />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/interview-history',
    element: (
      <ErrorBoundary>
        <P_interview_history />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/learning-center',
    element: (
      <ErrorBoundary>
        <P_learning_center />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '/learning-detail',
    element: (
      <ErrorBoundary>
        <P_learning_detail />
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
  },
      {
    path: '*',
    element: <NotFoundPage />,
  },
    ]
  }
]);

export default router;