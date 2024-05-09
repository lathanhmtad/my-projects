import { Route, Routes } from 'react-router-dom';

import Client from './pages/Client';
import Admin from './pages/Admin';
import ClientHome from './pages/client-home';
import PageNotFound from './pages/page-not-found';
import ClientAllQuizzes from './pages/client-all-quizzes';
import AdminDashboard from './pages/admin-dashboard';
import ParticipantManage from './pages/participants';
import CategoryManage from './pages/categories';
import QuizManage from './pages/quizzes';
import QAManage from './pages/questions-answers';
import ClientAuth from './pages/client-auth';
import ClientQuiz from './pages/client-quiz';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import ManagerPath from './constants/ManagerPath';

import { App as AppAntd } from 'antd';

import './App.scss';

function App() {
  return (
    <AppAntd>
      <ScrollToTop/>

      <Routes>

        <Route path="/" element={<Client/>}>
          <Route index element={<ClientHome/>}/>
          <Route path="all-quizzes" element={<ClientAllQuizzes/>}/>
          <Route path="quiz/:id" element={(
            <ProtectedRoute>
              <ClientQuiz/>
            </ProtectedRoute>
          )}/>
        </Route>

        <Route path="/admin" element={<Admin/>}>
          <Route index element={<AdminDashboard/>}/>
          <Route path={ManagerPath.PARTICIPANT} element={<ParticipantManage/>}/>
          <Route path={ManagerPath.CATEGORY} element={<CategoryManage/>}/>
          <Route path={ManagerPath.QUIZ} element={<QuizManage/>}/>
          <Route path={ManagerPath.Q_A} element={<QAManage/>}/>
        </Route>

        <Route path="/auth" element={<ClientAuth/>}/>
        <Route path="*" element={<PageNotFound/>}/>

      </Routes>
    </AppAntd>
  );
}

export default App;
