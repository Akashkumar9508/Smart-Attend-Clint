import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');  
    } else {
      const decodedToken = decodeToken(token);  
      const userRole = decodedToken.role;  

      if (Component.name === 'Teacherdash' && userRole !== 'teacher') {
        navigate('/studentdash');  
      } else if (Component.name === 'Studentdash' && userRole !== 'student') {
        navigate('/teacherdash');  
      }
    }
  }, [navigate, Component]);

  const decodeToken = (token) => {
    const base64Url = token.split('.')[1];  
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;
