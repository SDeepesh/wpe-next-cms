import React from 'react';
import nock from 'nock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SyncData from './SyncData';

describe('SyncData Page', () => {
  const api = nock('http://localhost/wp-json/atlas-search/v1');

  describe('Click sync data button', () => {
    test('Data sync completed in 3 requests', async () => {
      const uuid = 'some-unique-sync-id';

      api.put('/sync-data', { uuid: '' }).once().reply(200, {
        status: 'pending',
        progress: 10,
        message: 'Users synced',
        uuid,
      });

      api.put('/sync-data', { uuid }).once().reply(200, {
        status: 'pending',
        progress: 30,
        message: 'Posts synced',
        uuid,
      });

      api.put('/sync-data', { uuid }).once().reply(200, {
        status: 'completed',
        progress: 100,
        message: 'Completed',
        uuid,
      });

      render(<SyncData />);

      const syncButton = screen.getByTestId('sync-button');
      const deleteButton = screen.getByTestId('delete-sync-button');

      fireEvent.click(syncButton);

      await waitFor(() => expect(syncButton).toBeDisabled());
      expect(deleteButton).toBeDisabled();

      const progress = screen.getByTestId('sync-percentage');
      expect(progress).toBeInTheDocument();

      await waitFor(() => expect(syncButton).toBeEnabled());
      expect(deleteButton).toBeEnabled();
      expect(progress).not.toBeInTheDocument();

      const message = await screen.findByTestId('sync-message');
      expect(message.textContent).toBe('Completed');
    });

    test('Data sync failure in 2 request', async () => {
      const uuid = 'some-unique-sync-id';

      api.put('/sync-data').once().reply(200, {
        status: 'pending',
        progress: 20,
        uuid,
      });

      api.put('/sync-data', { uuid }).once().reply(200, {
        status: 'error',
        message: 'Error with ACM',
      });

      render(<SyncData />);

      const syncButton = screen.getByTestId('sync-button');
      const deleteButton = screen.getByTestId('delete-sync-button');

      fireEvent.click(syncButton);

      await waitFor(() => expect(syncButton).toBeDisabled());
      expect(deleteButton).toBeDisabled();

      const progress = screen.getByTestId('sync-percentage');
      expect(progress).toBeInTheDocument();

      const message = await screen.findByTestId('sync-message');
      expect(message.textContent).toBe('Error with ACM');
      expect(progress).not.toBeInTheDocument();
      expect(syncButton).toBeEnabled();
      expect(deleteButton).toBeEnabled();
      expect(syncButton.textContent).toBe('Resume');
    });

    test('Sync data with unexpected error', async () => {
      api.put('/sync-data').once().reply(500);

      render(<SyncData />);

      const syncButton = screen.getByTestId('sync-button');
      fireEvent.click(syncButton);
      const message = await screen.findByTestId('sync-message');

      expect(message.textContent).toBe(
        'Unexpected sync error occurred. Please "Resume" the sync. If this fails "Delete" and begin sync process again.'
      );
    });
  });

  describe('Click delete sync data button', () => {
    test('Delete sync data successfully', async () => {
      api.delete('/sync-data').once().reply(200, {
        status: 'completed',
        message: 'Success',
      });

      render(<SyncData />);

      const syncButton = screen.getByTestId('sync-button');
      const deleteButton = screen.getByTestId('delete-sync-button');

      fireEvent.click(deleteButton);

      await waitFor(() => expect(deleteButton).toBeDisabled());
      expect(syncButton).toBeDisabled();

      await waitFor(() => expect(deleteButton).toBeEnabled());
      expect(syncButton).toBeEnabled();

      const message = await screen.findByTestId('delete-message');
      expect(message.textContent).toBe('Success');
    });

    test('Delete sync data with handled error', async () => {
      api.delete('/sync-data').once().reply(200, {
        status: 'error',
        message: 'Something went wrong',
      });

      render(<SyncData />);

      const deleteButton = screen.getByTestId('delete-sync-button');
      fireEvent.click(deleteButton);

      const message = await screen.findByTestId('delete-message');
      expect(message.textContent).toBe('Something went wrong');
    });

    test('Delete sync data with unexpected error', async () => {
      api.delete('/sync-data').once().reply(500);

      render(<SyncData />);

      const deleteButton = screen.getByTestId('delete-sync-button');
      fireEvent.click(deleteButton);
      const message = await screen.findByTestId('delete-message');

      expect(message.textContent).toBe(
        'Unexpected error occurred. Please contact support.'
      );
    });
  });
});
