export function localStoreEditor(
  name: string
): [() => string | null, (value: string) => void] {
  return [
    () => {
      return localStorage.getItem(name);
    },
    (value: string) => {
      localStorage.setItem(name, value);
    },
  ];
}

export const [getAccessToken, setAccessToken] = localStoreEditor('accessToken');
export const [getDeviceID, setDeviceId] = localStoreEditor('deviceId');
