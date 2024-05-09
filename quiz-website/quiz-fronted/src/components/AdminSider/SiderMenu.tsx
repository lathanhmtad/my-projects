import { useLocation, useNavigate } from 'react-router-dom';

import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined
} from '@ant-design/icons';

import { RiQuestionAnswerLine } from 'react-icons/ri';
import { MdOutlineCategory, MdOutlineQuiz } from 'react-icons/md';

import ManagerPath from '../../constants/ManagerPath';

const SiderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      key: '/admin',
      icon: <DashboardOutlined/>,
      label: 'Dashboard',
      onClick: () => navigate('/admin')
    },
    {
      key: ManagerPath.PARTICIPANT,
      icon: <UserOutlined/>,
      label: 'Participants',
      onClick: () => navigate(ManagerPath.PARTICIPANT)
    },
    {
      key: ManagerPath.CATEGORY,
      icon: <MdOutlineCategory/>,
      label: 'Categories',
      onClick: () => navigate(ManagerPath.CATEGORY)
    },
    {
      key: ManagerPath.QUIZ,
      icon: <MdOutlineQuiz/>,
      label: 'Quizzes',
      onClick: () => navigate(ManagerPath.QUIZ)
    },
    {
      key: ManagerPath.Q_A,
      icon: <RiQuestionAnswerLine/>,
      label: 'Q & A',
      onClick: () => navigate(ManagerPath.Q_A)
    }
  ];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default SiderMenu;