interface ProtectedRouteProps {
	element: React.ReactNode;
	condition: boolean;
}
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, condition }) => {
	return condition && element;
};
