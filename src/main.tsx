import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux/es/exports";

import { I18nextProvider } from "react-i18next";
import i18nInit from "./translations/i18next";
import i18next from "i18next";

import { store } from "./store";
import App from "./App";
import "./index.scss";
import "normalize.css";

i18nInit();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);
