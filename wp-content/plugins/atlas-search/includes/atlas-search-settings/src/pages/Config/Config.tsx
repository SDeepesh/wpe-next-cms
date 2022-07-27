import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';

import {
  Container,
  Grid,
  Typography,
  Slider,
  Switch,
  CircularProgress,
  ThemeProvider,
} from '@mui/material';

import axios from 'axios';
import api from '../../utils/axios';
import { toast } from '../../utils/toast';
import { materialTheme } from '../../theme';

import { Configs } from './types';
import ConfigBlock from './ConfigBlock';

export default function SearchConfigPage() {
  const [config, setConfig] = useState<Configs | null>(null);
  const [loading, setLoading] = useState(false);
  const [modelCount, setModelCount] = useState(0);

  useEffect(() => {
    const searchConfigSource = axios.CancelToken.source();

    const fetchSettingsData = async () => {
      setLoading(true);

      const { data } = await api.get<Configs>('search-config', {
        cancelToken: searchConfigSource.token,
      });

      if (data !== null) {
        setConfig(data);
        setModelCount(Object.keys(data.models).length);
        setLoading(false);
      }
    };

    try {
      fetchSettingsData();
    } catch (err) {
      console.error(err);
    }

    return () => {
      searchConfigSource.cancel('SearchConfigPage unmounted');
    };
  }, []);

  const saveConfig = async () => {
    setLoading(true);
    await api.post('search-config', config);
    toast('Search Config saved!', 'success');
    setLoading(false);
  };

  if (!config) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={materialTheme}>
      <Container data-testid="search-config-container" maxWidth="xl">
        <Grid container spacing={2} mb={2}>
          <Grid item xs={8}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Search Config
            </Typography>
          </Grid>

          <Grid item xs={4} textAlign="right">
            <LoadingButton
              size="large"
              variant="contained"
              loading={loading}
              onClick={saveConfig}
              sx={{ textTransform: 'none' }}
              data-testid="save-button"
            >
              Save Config
            </LoadingButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h4">Fuzziness</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            Atlas Search will attempt to search for a match to every word in a
            search query exactly until Fuzziness is enabled. Once fuzziness is
            enabled it employs a one-letter-per-word tolerance ("distance") by
            default, so if you type "Hallo Warld" by accident you will get the
            results for both "Hello" and "World". You can increase this per-word
            distance to a maximum of 2, so "Haalo Waald" would work as per the
            previous example. Please note that the higher the fuzziness distance
            allowed the greater the performance & relevancy hit will be to your
            search experience.
          </Typography>
        </Grid>

        <Grid item xs={2} data-testid="fuzzy-switch">
          <Switch
            checked={config.fuzzy.enabled}
            inputProps={{ role: 'fuzzy-switch' }}
            onChange={(_event, newValue) =>
              setConfig({
                ...config,
                fuzzy: {
                  ...config.fuzzy,
                  enabled: newValue,
                },
              })
            }
          />
        </Grid>

        <Grid item xs={4} mb={2}>
          <Typography>Distance: {config.fuzzy.distance}</Typography>

          <Slider
            aria-label="Fuzzy Distance"
            value={config.fuzzy.distance}
            min={1}
            max={2}
            marks
            data-testid="fuzzy-distance"
            disabled={!config.fuzzy.enabled}
            onChange={(_event, newValue) =>
              setConfig({
                ...config,
                fuzzy: {
                  ...config.fuzzy,
                  distance: newValue as number,
                },
              })
            }
          />
        </Grid>

        <Grid>
          <Typography variant="h4">Models</Typography>
          <p data-testid="model-count">{modelCount} models.</p>
        </Grid>

        <Container maxWidth="xl" disableGutters={true}>
          <section data-testid="search-config-form">
            {Object.keys(config.models).map((modelName) => (
              <ConfigBlock
                key={`config-block-${modelName}`}
                fields={config.models[modelName]}
                name={modelName}
                onChange={(fieldName, updatedConfig) => {
                  const change = {
                    ...config,
                    models: {
                      ...config.models,
                      [modelName]: {
                        ...config.models[modelName],
                        [fieldName]: {
                          ...config.models[modelName][fieldName],
                          ...updatedConfig,
                        },
                      },
                    },
                  };

                  setConfig(change);
                }}
              />
            ))}
          </section>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
