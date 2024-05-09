import React, { useEffect, useState } from 'react';
import { App, Avatar, Space, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { resetAuthState } from '../../redux/slices/authSlice';

import logo from '../../assets/logo.webp';
import { Container, Nav, Form, Navbar, NavDropdown, Button } from 'react-bootstrap';

import './ClientHeader.scss';

function ClientHeader() {

  const location = useLocation();
  const [url, setUrl] = useState('/');

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);


  const dispatch = useAppDispatch();

  const { notification } = App.useApp();

  const { participant } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    if (participant) {
      dispatch(resetAuthState());
      notification.success({
        message: 'Đăng xuất thành công'
      });
    }
  };
  console.log(window.location.pathname);

  return (
    <header>
      <Navbar expand="lg" className="bg-white">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img width={60} height={60} src={logo} alt="logo"/>
            <h3 className="m-0 ms-1">EduQuiz</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"/>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '200px' }}
              navbarScroll
              activeKey={url}
            >
              <Nav.Link as={Link} eventKey="/" to="/">Trang chủ</Nav.Link>
              <Nav.Link as={Link} eventKey="/all-quizzes" to="/all-quizzes">Đề thi</Nav.Link>
              <Nav.Link as={Link} eventKey="/admin" to="/admin">Quản trị</Nav.Link>
            </Nav>
            <div>
              {participant ?
                <Space align="center">
                  <Avatar size="large"
                          src={participant.avatar}/>
                  <Typography>Xin chào: {participant.fullName}</Typography>
                  <button className="btn btn-primary" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </Space>
                : <Link to="/auth" className="nav-link">
                  <button className="btn btn-primary">Đăng nhập</button>
                </Link>
              }
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

    // <header>
    //   <nav className="navbar navbar-expand-lg bg-light">
    //     <div className="container">
    //       <Link to="/" className="navbar-brand d-flex align-items-center">
    //         <img width={60} height={60} src={logo} alt="logo"/>
    //         <h3 className="m-0 ms-1">EduQuiz</h3>
    //       </Link>
    //       <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
    //               data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
    //               aria-label="Toggle navigation">
    //         <span className="navbar-toggler-icon"></span>
    //       </button>
    //       <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //         <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
    //           <li className="nav-item">
    //             <Link to="/" className="nav-link fs-6 active">
    //               Trang chủ
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/all-quizzes" className="nav-link fs-6">
    //               Đề thi
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to="/all-quizzes" className="nav-link fs-6">
    //               Quản trị
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             {participant ?
    //               <Space align="center">
    //                 <Avatar size="large"
    //                         src={participant.avatar}/>
    //                 <Typography>Xin chào: {participant.fullName}</Typography>
    //                 <Button size="large" type="primary" onClick={handleLogout}>
    //                   Đăng xuất
    //                 </Button>
    //               </Space>
    //               : <Link to="/auth" className="nav-link">
    //                 <button className="btn btn-primary">Đăng nhập</button>
    //               </Link>}
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
  );
}

export default ClientHeader;