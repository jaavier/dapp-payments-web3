import { MetamaskProvider } from "./metamask/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Received from "./pages/received";
import Sent from "./pages/sent";
import Error from "./pages/error";
import Create from "./pages/create";
import Container from "./components/Container";
<<<<<<< Updated upstream
=======
import Pay from "./pages/pay";
import AllToPay from "./pages/pay/AllToPay";
import { ConnectMetamask } from "./metamask";
import { useEffect } from "react";
import AllSent from "./pages/sent/AllSent";

const Parent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
>>>>>>> Stashed changes

export default function App() {
  return (
    <MetamaskProvider>
      <Container>
        <BrowserRouter>
          <Routes>
<<<<<<< Updated upstream
            <Route path="/" element={<Home />}>
              <Route index element={<Home />} />
=======
            <Route path="/" element={<Parent />}>
              <Route path="sent" element={<Parent />}>
                <Route index element={<AllSent />} />
                <Route path=":paymentId" element={<Sent />} />
              </Route>
              <Route path="create" element={<Create />} />
              <Route path="pay" element={<Parent />}>
                <Route index element={<AllToPay />} />
                <Route path=":paymentId" element={<Pay />} />
              </Route>
>>>>>>> Stashed changes
            </Route>
            <Route path="received" element={<Received />} />
            <Route path="sent" element={<Sent />} />
            <Route path="create" element={<Create />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </MetamaskProvider>
  );
}
