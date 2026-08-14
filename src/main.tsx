import "@fontsource-variable/dm-sans";
import "@fontsource-variable/space-grotesk";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./infrastructure/app";
import "./infrastructure/globals.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
