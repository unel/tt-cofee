import type { TCoffee, TCoffeeIntensifier, TCoffeeRaw } from '$lib/types/tcoffee';

const API_DEV_HOST = '';
const API_PROD_HOST = 'https://random-data-api.com';
const API_HOST = 1 ? API_PROD_HOST : API_DEV_HOST;

const API_BASE_URL = `${API_HOST}/api/coffee`;

function formatCoffee(coffee: TCoffeeRaw): TCoffee {
	return {
		id: coffee.id,
		uid: coffee.uid,
		blend_name: coffee.blend_name,
		origin: coffee.origin,
		variety: coffee.variety,
		notes: coffee.notes
			.split(/\s*,\s*/)
			.map((s) => s.trim())
			.filter(Boolean),
		intensifier: formatIntensifier(coffee.intensifier)
	};
}

function formatIntensifier(intensifierRaw: string): TCoffeeIntensifier {
	// for future purpose
	return intensifierRaw;
}

export async function loadRandomCoffee(): Promise<TCoffee> {
	try {
		const response = await fetch(`${API_BASE_URL}/random_coffee`, {
			method: 'GET'
		});

		const body = (await response.json()) as TCoffeeRaw;

		return formatCoffee(body);
	} catch (e) {
		throw new Error(`Can't load info: ${e}`);
	}
}
