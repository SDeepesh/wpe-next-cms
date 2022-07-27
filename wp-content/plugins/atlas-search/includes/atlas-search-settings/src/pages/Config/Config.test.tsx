import React from 'react';
import nock from 'nock';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import SearchConfigPage from './Config';

describe('SearchConfigPage', () => {
  const api = nock('http://localhost/wp-json/atlas-search/v1');

  describe('Render component', () => {
    const response = {
      fuzzy: {
        enabled: false,
        distance: 1,
      },
      models: {
        post: {
          title: { searchable: false, weight: 1000 },
          content: { searchable: true, weight: 1000 },
          excerpt: { searchable: true, weight: 1 },
          slug: { searchable: false, weight: 2312321 },
          'author.displayName': { searchable: true, weight: 1 },
          'tags.name': { searchable: true, weight: 1 },
          'categories.name': { searchable: true, weight: 1 },
          'TestGroup.numbertest': { searchable: true, weight: 1 },
          'extraPostFields.rating': { searchable: true, weight: 1 },
          'test.acfField': { searchable: true, weight: 1 },
        },
      },
    };

    beforeEach(() => {
      api.get('/search-config').reply(200, response);
    });

    test('renders with data', async () => {
      const { asFragment } = render(<SearchConfigPage />);

      await screen.findByTestId('search-config-form');
      expect(asFragment()).toMatchSnapshot();
    });

    test('displays correct model count', async () => {
      render(<SearchConfigPage />);

      const obj = await screen.findByTestId('model-count');

      await waitFor(() => {
        expect(obj.textContent).toEqual('1 models.');
      });
    });

    test('click save sends data to search config endpoint', async () => {
      api.post('/search-config').reply(200, response);

      render(<SearchConfigPage />);

      const saveButton = await screen.findByTestId('save-button');
      const form = await screen.findByTestId('search-config-form');

      await waitFor(() => expect(form).toBeInTheDocument());
      fireEvent.click(saveButton);
    });

    test('Enable fuzziness', async () => {
      render(<SearchConfigPage />);
      await screen.findByTestId('search-config-container');

      const fuzzySwitch = screen.getByRole('fuzzy-switch') as HTMLInputElement;

      const fuzzyDistance = screen.getByLabelText(
        'Fuzzy Distance'
      ) as HTMLInputElement;

      expect(fuzzySwitch.checked).toBe(false);
      expect(fuzzyDistance.disabled).toBe(true);

      fireEvent.change(fuzzySwitch, { target: { checked: true } });

      await waitFor(() => {
        expect(fuzzySwitch.checked).toBe(true);
      });
    });
  });

  describe('Fuzziness enabled', () => {
    const response = {
      fuzzy: {
        enabled: true,
        distance: 1,
      },
      models: {
        post: {
          title: { searchable: false, weight: 1000 },
          content: { searchable: true, weight: 1000 },
          excerpt: { searchable: true, weight: 1 },
          slug: { searchable: false, weight: 2312321 },
        },
      },
    };

    beforeEach(() => {
      api.get('/search-config').reply(200, response);
    });

    test('Change fuzziness distance to 2', async () => {
      render(<SearchConfigPage />);
      await screen.findByTestId('search-config-container');

      const fuzzySwitch = screen.getByRole('fuzzy-switch') as HTMLInputElement;

      const fuzzyDistance = screen.getByLabelText(
        'Fuzzy Distance'
      ) as HTMLInputElement;

      expect(fuzzySwitch.checked).toBe(true);
      expect(fuzzyDistance.disabled).toBe(false);

      fireEvent.change(fuzzyDistance, { target: { value: 2 } });

      expect(fuzzyDistance.value).toBe('2');
    });
  });
});
