import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import jwtInterceptor from "./utils/jwt-interceptor.jsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./context/auth.jsx";

jwtInterceptor();

ReactDOM.createRoot(document.getElementById("root")).render(
 
  <React.StrictMode>
     <ErrorBoundary fallback={<div>Something went wrong</div>}>
    <BrowserRouter>
      <AuthProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>

);
