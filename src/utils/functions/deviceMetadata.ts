export interface DeviceMetadata {
  ip?: string;
  browserName?: string;
  osName?: string;
  deviceType?: string;
  deviceModel?: string;
  timeZone?: string;
  fullAddress?: string;
  geolocation?: {
    source?: string;
    latitude?: string;
    longitude?: string;
  };
}

const TIMEOUT_MS = 4000;

const fetchWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  } catch (e) {
    clearTimeout(id);
    throw e;
  }
};

const getStaticMetadata = (): Partial<DeviceMetadata> => {
  if (typeof window === 'undefined') return {};

  const ua = navigator.userAgent;
  let browserName = 'Unknown';
  let osName = 'Unknown';
  let deviceType = 'Desktop';
  let deviceModel = 'Unknown';

  if (ua.includes('Firefox')) browserName = 'Firefox';
  else if (ua.includes('Chrome') && !ua.includes('Edg')) browserName = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browserName = 'Safari';
  else if (ua.includes('Edg')) browserName = 'Edge';
  else if (ua.includes('Opera') || ua.includes('OPR')) browserName = 'Opera';

  if (ua.includes('Windows')) osName = 'Windows';
  else if (ua.includes('Mac')) osName = 'macOS';
  else if (ua.includes('Linux')) osName = 'Linux';
  else if (ua.includes('Android')) osName = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) osName = 'iOS';

  if (/Mobi|Android/i.test(ua)) deviceType = 'Mobile';
  else if (/Tablet|iPad/i.test(ua)) deviceType = 'Tablet';

  const modelMatch = ua.match(/\(([^)]+)\)/);
  if (modelMatch && modelMatch[1]) {
    deviceModel = modelMatch[1].split(';')[0].trim();
  }

  return {
    browserName,
    osName,
    deviceType,
    deviceModel,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

const getIpData = async () => {
  try {
    const data = await fetchWithTimeout('https://ipwho.is/');
    if (!data.success) throw new Error('API Error');
    return {
      ip: data.ip as string,
      geo: { 
        source: 'IP',
        latitude: String(data.latitude), 
        longitude: String(data.longitude) 
      },
      address: `${data.city}, ${data.region}, ${data.country}`
    };
  } catch {
    try {
      const data = await fetchWithTimeout('https://api.ipify.org?format=json');
      return { ip: data.ip as string, geo: undefined, address: undefined };
    } catch {
      return null;
    }
  }
};

const getNativePosition = () => {
  return new Promise<{ source: string; latitude: string; longitude: string } | null>((resolve) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      resolve(null);
      return;
    }

    const onResult = (pos: GeolocationPosition) => {
      resolve({
        source: 'GPS',
        latitude: String(pos.coords.latitude),
        longitude: String(pos.coords.longitude)
      });
    };

    const onError = () => {
      resolve(null);
    };

    navigator.geolocation.getCurrentPosition(onResult, onError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: Infinity
    });
  });
};

const getReverseGeocoding = async (lat: string, lon: string) => {
  try {
    const data = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    return data.display_name as string;
  } catch {
    return undefined;
  }
};

export const getDeviceMetadata = async (): Promise<DeviceMetadata> => {
  const staticData = getStaticMetadata();

  try {
    const [ipResult, nativeGeoResult] = await Promise.allSettled([
      getIpData(),
      getNativePosition()
    ]);

    const ipData = ipResult.status === 'fulfilled' ? ipResult.value : null;
    const nativeGeo = nativeGeoResult.status === 'fulfilled' ? (nativeGeoResult.value || undefined) : undefined;

    let finalGeo = nativeGeo;
    
    if (!finalGeo && ipData?.geo) {
      finalGeo = ipData.geo;
    }

    let finalAddress = ipData?.address;

    if (nativeGeo) {
      const address = await getReverseGeocoding(nativeGeo.latitude, nativeGeo.longitude);
      if (address) finalAddress = address;
    }

    return {
      ...staticData,
      ip: ipData?.ip,
      geolocation: finalGeo,
      fullAddress: finalAddress,
    };

  } catch (error) {
    return {
      ...staticData,
      ip: undefined,
      geolocation: undefined,
      fullAddress: undefined
    };
  }
};
