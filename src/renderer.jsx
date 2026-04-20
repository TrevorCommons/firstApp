import { createRoot } from "react-dom/client";
import Cards from "./components/cards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Cards />
    </QueryClientProvider>
  );
};

const container = document.getElementById("root");

const root = createRoot(container);
root.render(<App />);
