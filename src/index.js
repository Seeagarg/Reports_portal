import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ThemeChangeProvider from "./ThemeChangeContext";
import MobileNavbarProvider from "./MobileNavbarContext";
import ModalProvider from "./ModalContext";
import EditModalProvider from "./EditModalContext";
import InputModalProvider from "./InputModalContext";
import AdvertiserModalProvider from "./AdvertiserModalContext";
import EditAdvertiserProvider from "./EditAdvertiserContext";
import AdvertiserDummyHitProvider from "./AdvertiserDummyHitContext";
import ProjectDetailsModalProvider from "./ProjectDetailsContext";
import EditProjectDetailsProvider from "./EditProjectDetailsContext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeChangeProvider>
      <EditProjectDetailsProvider>
        <ProjectDetailsModalProvider>
          <AdvertiserDummyHitProvider>
            <InputModalProvider>
              <EditModalProvider>
                <ModalProvider>
                  <MobileNavbarProvider>
                    <AdvertiserModalProvider>
                      <EditAdvertiserProvider>
                        <PrimeReactProvider>
                          <App />
                        </PrimeReactProvider>
                      </EditAdvertiserProvider>
                    </AdvertiserModalProvider>
                  </MobileNavbarProvider>
                </ModalProvider>
              </EditModalProvider>
            </InputModalProvider>
          </AdvertiserDummyHitProvider>
        </ProjectDetailsModalProvider>
      </EditProjectDetailsProvider>
    </ThemeChangeProvider>
  </BrowserRouter>
);

reportWebVitals();
