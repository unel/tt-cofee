import { ROUTES_BY_ID } from '$lib/routes';
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(301, ROUTES_BY_ID['about'].path);
}
