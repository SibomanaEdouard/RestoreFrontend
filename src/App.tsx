import React from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import './styles/index.scss';
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/store";
import ThemeProvider from "./theme";
import Router from "./routes";
import { ThemeSettings, SettingsProvider } from "./components/settings";
import { AuthProvider } from "./auth/JwtContext";
function App() {
  return (
    <AuthProvider>
      <HelmetProvider>

        <ReduxProvider store={store}>
          <SettingsProvider>
            <BrowserRouter>

              <ThemeProvider>
                <ThemeSettings>
                  <Router />

                </ThemeSettings>
              </ThemeProvider>
            </BrowserRouter>
          </SettingsProvider>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  );
}

export default App;
