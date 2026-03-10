import { BrowserRouter, Routes, Route } from "react-router";
import { Auth } from "@/features/auth/Auth";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};
