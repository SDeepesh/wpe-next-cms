import React, { useState } from 'react';
import { Box, Flex, Text } from 'rebass';
import { ThemeProvider } from '@emotion/react';

import theme from '../../theme';
import { toast } from '../../utils/toast';
import axios from '../../utils/axios';
import Icon from '../../components/Icon';
import Alert from '../../components/Alert';
import ProgressBar from '../../components/ProgressBar';
import Button, { ButtonVariant, ButtonSize } from '../../components/Button';

import { mapSyncStateToAlertVariant } from './helpers';

export enum SyncStatus {
  Init = 'init',
  Pending = 'pending',
  Completed = 'completed',
  Error = 'error',
}

export default function SyncData() {
  const [deleteStatus, setDeleteStatus] = useState(SyncStatus.Init);
  const [deleteMessage, setDeleteMessage] = useState('');

  const [syncStatus, setSyncStatus] = useState(SyncStatus.Init);
  const [syncMessage, setSyncMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const runSyncData = async () => {
    let uuid: string = '';
    let currentState: SyncStatus;

    setProgress(0);
    setSyncMessage('');
    setDeleteMessage('');
    setSyncStatus(SyncStatus.Pending);

    try {
      do {
        const body = { uuid };
        const { data } = await axios.put('/sync-data', body);

        uuid = data.uuid;
        currentState = data.status;

        setSyncStatus(data.status);
        setSyncMessage(data.message);
        setProgress(parseInt(data.progress));
      } while (currentState === SyncStatus.Pending);

      if (syncStatus === SyncStatus.Completed) {
        toast('Data sync completed successfully', 'success');
      }
    } catch (err) {
      setSyncStatus(SyncStatus.Error);

      setSyncMessage(
        'Unexpected sync error occurred. Please "Resume" the sync. If this fails "Delete" and begin sync process again.'
      );
    }
  };

  const deleteSyncData = async () => {
    setSyncMessage('');
    setDeleteMessage('');

    try {
      setDeleteStatus(SyncStatus.Pending);
      const { data } = await axios.delete('/sync-data');

      setDeleteStatus(data.status);
      setDeleteMessage(data.message);
    } catch (err) {
      setDeleteStatus(SyncStatus.Error);
      setDeleteMessage('Unexpected error occurred. Please contact support.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box backgroundColor="white" p={30}>
        <h2>Sync Data</h2>

        <Flex>
          <Box
            width={3 / 4}
            style={{ minHeight: 150, paddingRight: 50, marginTop: 10 }}
          >
            {syncStatus === SyncStatus.Pending ? (
              <ProgressBar data-testid="sync-percentage" value={progress} />
            ) : (
              <Text fontSize={18}>
                If you have just installed and activated, or reactivated, Atlas
                Search Plugin then please rerun this sync.
              </Text>
            )}
            {syncMessage && (
              <Alert
                data-testid="sync-message"
                variant={mapSyncStateToAlertVariant(syncStatus)}
              >
                {syncMessage}
              </Alert>
            )}
          </Box>

          <Box width={1 / 4} style={{ textAlign: 'right' }}>
            <Button
              block
              size={ButtonSize.Large}
              variant={ButtonVariant.Primary}
              data-testid="sync-button"
              onClick={runSyncData}
              disabled={
                syncStatus === SyncStatus.Pending ||
                deleteStatus === SyncStatus.Pending
              }
            >
              <Icon
                name={
                  syncStatus === SyncStatus.Error
                    ? 'controls-play'
                    : 'image-rotate'
                }
                mr={1}
              />
              {syncStatus === SyncStatus.Error ? 'Resume' : 'Synchronize Now'}
            </Button>
          </Box>
        </Flex>

        <h2 style={{ marginTop: '25px' }}>Delete Sync Data</h2>

        <Flex>
          <Box width={3 / 4} style={{ marginTop: 10 }}>
            {deleteMessage && (
              <Alert
                data-testid="delete-message"
                variant={mapSyncStateToAlertVariant(deleteStatus)}
              >
                {deleteMessage}
              </Alert>
            )}

            <Text fontSize={18}>
              In case of issues with the search, you may need to refresh your
              sync data by deleting and then syncing the data.
            </Text>
          </Box>

          <Box width={1 / 4} textAlign="right">
            <Button
              block
              size={ButtonSize.Large}
              variant={ButtonVariant.Danger}
              data-testid="delete-sync-button"
              onClick={deleteSyncData}
              disabled={
                syncStatus === SyncStatus.Pending ||
                deleteStatus === SyncStatus.Pending
              }
            >
              <Icon name="database-remove" mr={1} />
              Delete search data
            </Button>
          </Box>
        </Flex>
      </Box>
    </ThemeProvider>
  );
}
