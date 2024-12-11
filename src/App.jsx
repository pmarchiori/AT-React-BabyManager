import Router from "./routes/Router";

import { AuthenticationProvider } from "./services/AuthContext";
import { LangProvider } from "./services/LangContext";
import { DataProvider } from "./DataContext";

import "./i18n";

function App() {
  return (
    <DataProvider>
      <LangProvider>
        <AuthenticationProvider>
          <Router />
        </AuthenticationProvider>
      </LangProvider>
    </DataProvider>
  );
}

export default App;
