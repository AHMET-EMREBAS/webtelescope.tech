import { createLocalStore } from '@webpackages/browser';

export const [getOrgname, setOrgname] = createLocalStore('orgname');
export const [getAccessToken, setAccessToken] = createLocalStore('access-token');
export const [getDeviceID, setDeviceId] = createLocalStore('device-id');
