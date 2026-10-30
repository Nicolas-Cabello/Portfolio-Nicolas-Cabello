import { BrowserRouter } from "react-router-dom";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";


function App() {
  return (
    <ParticlesProvider init={async (engine) => { await loadSlim(engine); }}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter basename={__BASE_PATH__}>
          <AppRoutes />
        </BrowserRouter>
      </I18nextProvider>
    </ParticlesProvider>
  );
}

export default App;
