import { Router } from "./Router"
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
