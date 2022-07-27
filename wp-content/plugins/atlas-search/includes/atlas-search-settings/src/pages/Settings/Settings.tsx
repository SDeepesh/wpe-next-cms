import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from '@emotion/react';

import theme from '../../theme';
import Form from '../../components/Form';
import Button from '../../components/Button';
import { SearchSettingsApi } from '../../utils/api';
import { toast } from '../../utils/toast';

function Settings() {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const submitButton = useRef<HTMLButtonElement>(null);
  const settingsApi = new SearchSettingsApi();

  useEffect(() => {
    const fetchSettingsData = async () => {
      const settings = await settingsApi.get();

      if (settings !== null) {
        setUrl(settings.url);
        setToken(settings.access_token);
      }
    };

    fetchSettingsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitButton.current) {
      submitButton.current.blur();
    }

    await settingsApi.set({ url: url, access_token: token });
    toast('Settings saved!', 'success');
  };

  return (
    <ThemeProvider theme={theme}>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label="URL"
          value={url}
          type="url"
          onChange={handleUrlChange}
        />

        <Form.Input
          label="Access Token"
          value={token}
          type="text"
          onChange={handleTokenChange}
        />

        <Button type="submit" ref={submitButton}>
          Save Settings
        </Button>
      </Form>
    </ThemeProvider>
  );
}

export default Settings;
