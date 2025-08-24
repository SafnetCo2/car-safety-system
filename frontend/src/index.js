import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "720605637104-popj70h0491ivrh1510jd65v7qurki9f.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.unregister();
