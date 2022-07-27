import { SearchSettingsConfig } from './api';
import axios from '../utils/axios';

jest.mock('../utils/axios');

describe('Search Settings API', () => {
  const SearchSettingsApi = require('./api').SearchSettingsApi;
  const searchSettingsApi = new SearchSettingsApi();

  test('Set is called with correct data and returns null', async () => {
    const mockData: SearchSettingsConfig = {
      url: 'localhost:8000',
      access_token: 'this-is-a-test',
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(null);

    const res = await searchSettingsApi.set(mockData);

    expect(axios.post).toHaveBeenCalledWith('settings', mockData);
    expect(res).toBeNull();
  });

  test('Get is called with correct data and returns null', async () => {
    const mockData: SearchSettingsConfig = {
      url: 'localhost:8000',
      access_token: 'this-is-a-test',
    };

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const res = await searchSettingsApi.get();

    expect(axios.get).toHaveBeenCalledWith('settings');
    expect(res).toBe(mockData);
  });
});
