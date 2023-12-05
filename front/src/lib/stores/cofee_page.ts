import { derived, readable, get, type Readable, type Updater } from 'svelte/store';
import { page } from '$app/stores';

import { ROUTES_BY_ID } from '$lib/routes';
import type { TCoffee } from '$lib/types/tcoffee';
import { setTimer } from '$lib/utils.ts/timer';

type TCoffeeLoader = () => Promise<TCoffee>;

const COFFEE_ROUTE = ROUTES_BY_ID['coffee'];
const DEFAULT_CHECK_INTERVAL = 1000; // interval between checking data freshness
const DUPLICATES_TRESHOLD = 2;

const noop = () => {};

export class PageLogic {
	isDestroyed: boolean = false;
	loadInterval?: number;

	isPageActive: boolean = true;

	_loader: TCoffeeLoader;

	cofeeStore: Readable<TCoffee[]>;
	_updateCoffeeStore: (update: Updater<TCoffee[]>) => void = noop;

	isLoadingAvailable: Readable<boolean>;
	_setIsLoadingAvailable: (value: boolean) => void = noop;

	isLoadingStore: Readable<boolean>;
	_setIsLoading: (value: boolean) => void = noop;

	timeToLoadStore?: Readable<number>;
	_updateTimeToLoad: (update: Updater<number>) => void = noop;

	_loadPromise?: Promise<void>;

	_lastUpdateTime: number = Date.now();

	_clearTimer: () => void = noop;

	_pageUnsub: () => void = noop;

	_loadedItems: Set<string> = new Set();

	_duplicatesCount: number = 0;

	constructor({
		coffeeLoader,
		loadInterval,
		checkInterval
	}: {
		coffeeLoader: TCoffeeLoader;
		loadInterval?: number;
		checkInterval?: number;
	}) {
		this._loader = coffeeLoader;
		this.loadInterval = loadInterval;

		this.cofeeStore = readable<TCoffee[]>([], (_, update) => {
			this._updateCoffeeStore = update;
		});

		this.isLoadingAvailable = readable(true, (set) => {
			this._setIsLoadingAvailable = set;
		});

		this.isLoadingStore = readable(false, (set) => {
			this._setIsLoading = set;
		});

		this._pageUnsub = page.subscribe((value) => {
			this.isPageActive = value.route.id === COFFEE_ROUTE.path;
		});

		if (loadInterval) {
			this.timeToLoadStore = readable<number>(loadInterval, (_, update) => {
				this._updateTimeToLoad = update;
			});

			this._clearTimer = setTimer(checkInterval ?? DEFAULT_CHECK_INTERVAL, (tickDelta: number) => {
				const delta = Date.now() - this._lastUpdateTime;
				this._updateTimeToLoad((time) => time - tickDelta);
				if (delta >= loadInterval && this.isPageActive && !get(this.isLoadingStore)) {
					this.loadCoffee();
				}
			});
		}

		this.loadCoffee();
	}

	async loadCoffee() {
		if (this.isDestroyed) {
			throw new Error("can't work in destroyed state");
		}

		if (!get(this.isLoadingAvailable)) {
			throw new Error('loading disabled');
		}

		if (this._loadPromise) {
			return this._loadPromise;
		}

		this._loadPromise = new Promise(async (resolve) => {
			try {
				this._setIsLoading(true);
				const coffee = await this._loader();

				// someone disabled loading during loading process
				// I think, we should ignore this data;
				if (!get(this.isLoadingAvailable)) {
					return;
				}

				if (!this._loadedItems.has(coffee.uid)) {
					this._updateCoffeeStore((store) => store.concat([coffee]));
					this._loadedItems.add(coffee.uid);
				} else {
					this._duplicatesCount += 1;
				}

				this._loadPromise = undefined;
				this._lastUpdateTime = Date.now();
				if (this.loadInterval !== undefined) {
					const li = this.loadInterval;
					this._updateTimeToLoad(() => li);
				}

				if (this._duplicatesCount >= DUPLICATES_TRESHOLD) {
					this.disableLoading();
				}
				return resolve();
			} catch (e) {
				console.error('Store updating failed!', e);
			}
		});

		this._loadPromise.finally(() => this._setIsLoading(false));

		return this._loadPromise;
	}

	disableLoading() {
		this._setIsLoadingAvailable(false);
		this._clearTimer();
	}

	destroy() {
		this.isDestroyed = true;

		this._clearTimer();
		this._pageUnsub();
		this._clearTimer = noop;
		this._updateCoffeeStore = noop;
		this._setIsLoading = noop;
	}
}
