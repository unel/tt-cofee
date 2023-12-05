import type { TRoute } from './types/troute';

const ROUTE_ABOUT = {
	id: 'about',
	path: '/about',
	title: 'About this site'
};

const ROUTE_COFFEE = {
	id: 'coffee',
	path: '/coffee',
	title: 'Coffee page'
};

export const ROUTES: TRoute[] = [ROUTE_ABOUT, ROUTE_COFFEE];

export const ROUTES_BY_ID = ROUTES.reduce((acc: Record<string, TRoute>, route: TRoute) => {
	acc[route.id] = route;
	return acc;
}, {});
