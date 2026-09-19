// // client/src/router/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const getAuth = () => {
//   try {
//     const raw = localStorage.getItem("auth");
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// };

// export const ProtectedRoute = ({ children, allowRole }) => {
//   const location = useLocation();
//   const auth = getAuth();

//   // not logged in → go to login, remember where user came from
//   if (!auth || !auth.token) {
//     return (
//       <Navigate
//         to="/login"
//         state={{ from: location }}
//         replace
//       />
//     );
//   }

//   // logged in but wrong role
//   if (allowRole && auth.role !== allowRole) {
//     return <Navigate to="/home" replace />;
//   }

//   return children;
// };
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, allowRole }) => {
  const location = useLocation();

  // get auth from localStorage
  const auth = JSON.parse(localStorage.getItem("auth"));

  // not logged in
  if (!auth || !auth.token) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // role check
  if (allowRole && auth.role !== allowRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};