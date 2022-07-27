import axios from './axios';

export interface SearchSettingsConfig {
  url: string;
  access_token: string;
}

export class SearchSettingsApi {
  async set(data: SearchSettingsConfig): Promise<null> {
    try {
      await axios.post('settings', data);
    } catch (error) {
      return null;
    }

    return null;
  }

  async get(): Promise<SearchSettingsConfig | null> {
    try {
      const res = await axios.get<SearchSettingsConfig>('settings');

      return res.data;
    } catch (error) {
      return null;
    }
  }
}
