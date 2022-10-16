import { MetamaskProvider } from "./metamask/context";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sent from "./pages/sent";
import Error from "./pages/error";
import Create from "./pages/create";
import Container from "./components/Container";
import Pay from "./pages/pay";
import AllToPay from "./pages/pay/AllToPay";
import AllSent from "./pages/sent/AllSent";
import Navbar from "./components/Navbar";
import Request from "./pages/request";
import { DetectMetamask } from "./metamask";

const Parent = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default function App() {
  if (!window.ethereum) return <DetectMetamask />;

  return (
    <MetamaskProvider>
      <Container>
        <BrowserRouter>
          <Navbar />
          <div className="shadow-lg border border-slate-300 bg-white p-7 rounded-md w-4/6 h-max">
            <Routes>
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
                <Route path="request" element={<Parent />}>
                  <Route path=":paymentId" element={<Request />} />
                </Route>
              </Route>
              <Route path="create" element={<Create />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Container>
    </MetamaskProvider>
  );
}
