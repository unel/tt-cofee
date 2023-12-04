import { derived, readable, get, type Readable, type Updater } from "svelte/store";
import { page } from "$app/stores";

import { ROUTES_BY_ID } from "$lib/routes";
import type { TCoffee } from "$lib/types/tcoffee";
import { setTimer } from "$lib/utils.ts/timer";


type TCoffeeLoader = () => Promise<TCoffee>;

const COFFEE_ROUTE = ROUTES_BY_ID['coffee'];
const DEFAULT_CHECK_INTERVAL = 1000; // interval between checking data freshness

const noop = () => {};

export class PageLogic {
    isDestroyed: boolean = false;
    loadInterval?: number;

    isPageActive: boolean = true;

    _loader: TCoffeeLoader;

    cofeeStore: Readable<TCoffee[]>;
    _updateCoffeeStore: (update: Updater<TCoffee[]>) => void = noop;

    isLoadingStore: Readable<boolean>;
    _setIsLoading: (value: boolean) => void = noop;

    timeToLoadStore?: Readable<number>;
    _updateTimeToLoad: (update: Updater<number>) => void = noop;

    _loadPromise?: Promise<void>;

    _lastUpdateTime: number = Date.now();

    _clearTicking: () => void = noop;

    _pageUnsub: () => void = noop;

    constructor({ coffeeLoader, loadInterval, checkInterval }: { coffeeLoader: TCoffeeLoader, loadInterval?: number, checkInterval?: number }) {
        this._loader = coffeeLoader;
        this.loadInterval = loadInterval;

        this.cofeeStore = readable<TCoffee[]>([], (_, update) => {
            this._updateCoffeeStore = update;
        });

        this.isLoadingStore = readable(false, (set) => {
            this._setIsLoading = set;
        });

        this._pageUnsub = page.subscribe(value => {
            this.isPageActive = value.route.id === COFFEE_ROUTE.path; 
        });

        if (loadInterval) {
            this.timeToLoadStore = readable<number>(loadInterval, (_, update) => {
                this._updateTimeToLoad = update;
            });

            this._clearTicking = setTimer(checkInterval ?? DEFAULT_CHECK_INTERVAL, (tickDelta: number) => {
                const delta = Date.now() - this._lastUpdateTime;
                this._updateTimeToLoad(time => time - tickDelta);
                if (delta >= loadInterval && this.isPageActive && !get(this.isLoadingStore)) {
                    this.loadCoffee();
                }
            });
        }
    }

    async loadCoffee() {
        if (this.isDestroyed) {
            throw new Error("can't work in destroyed state");
        }

        if (this._loadPromise) {
            return this._loadPromise;
        }

        this._loadPromise = new Promise(async (resolve) => {
            try {
                this._setIsLoading(true);
                const coffee = await this._loader();

                this._updateCoffeeStore(( store) => store.concat([coffee]));

                this._loadPromise = undefined;
                this._lastUpdateTime = Date.now();
                if (this.loadInterval !== undefined) {
                    const li = this.loadInterval
                    this._updateTimeToLoad(() => li);
                }
                return resolve();
            } catch (e) {
                console.error('Store updating failed!', e);
            }
            
        });

        this._loadPromise.finally(() => this._setIsLoading(false));

        return this._loadPromise;
    }

    destroy() {
        this.isDestroyed = true;

        this._clearTicking();
        this._pageUnsub();
        this._clearTicking = noop;
        this._updateCoffeeStore = noop;
        this._setIsLoading = noop;
    }
}
