/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();

// Precache files from the manifest
precacheAndRoute(self.__WB_MANIFEST);

// Immediately activate new service worker
self.skipWaiting();
