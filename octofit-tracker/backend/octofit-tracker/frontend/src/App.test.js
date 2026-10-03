import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { getApiCollection } from './api';

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  });
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
  jest.restoreAllMocks();
});

test('shows the main navigation and activities view', async () => {
  render(
    <MemoryRouter initialEntries={['/activities']}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByRole('heading', { name: 'Activities' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Activities' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Leaderboard' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Teams' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Users' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Workouts' })).toBeInTheDocument();

  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('Fetched activities:', []);
  });
});

test('normalizes plain and paginated API collections', () => {
  expect(getApiCollection([{ id: 1 }])).toEqual([{ id: 1 }]);
  expect(getApiCollection({ results: [{ id: 2 }] })).toEqual([{ id: 2 }]);
});
