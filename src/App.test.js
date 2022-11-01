import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const fileUploadElement = screen.getByText('Drag & Drop');
  expect(fileUploadElement).toBeInTheDocument();
});
