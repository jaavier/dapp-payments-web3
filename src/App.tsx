import { MetamaskProvider } from "./metamask/context";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sent from "./pages/sent";
import Error from "./pages/error";
import Create from "./pages/create";
import Container from "./components/Container";
import Pay from "./pages/pay";
import AllToPay from "./pages/pay/AllToPay";

const Parent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default function App() {
  return (
    <MetamaskProvider>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Parent />}>
              <Route path="sent" element={<Sent />} />
              <Route path="create" element={<Create />} />
              <Route path="pay" element={<Parent />}>
                <Route index element={<AllToPay />} />
                <Route path=":paymentId" element={<Pay />} />
              </Route>
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MetamaskProvider>
  );
}
