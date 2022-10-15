import { MetamaskProvider } from "./metamask/context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Received from "./pages/received";
import Sent from "./pages/sent";
import Error from "./pages/error";
import Create from "./pages/create";
import Container from "./components/Container";
import Pay from "./pages/pay";

export default function App() {
  return (
		<MetamaskProvider>
			<Container>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />}>
							<Route index element={<Home />} />
						</Route>
						<Route path="received" element={<Received />} />
						<Route path="sent" element={<Sent />} />
						<Route path="create" element={<Create />} />
						<Route path="pay" element={<Pay />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</BrowserRouter>
			</Container>
		</MetamaskProvider>
	);
}
