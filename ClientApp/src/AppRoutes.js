import { Home } from "./components/Home";
import EmailConfirmPage from "./components/EmailConfirmPage";

const AppRoutes = [
	{
		index: true,
		element: <Home />
	},
	{
		path: '/confirm',
		element: <EmailConfirmPage/>
	}
];

export default AppRoutes;
