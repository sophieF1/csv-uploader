import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from "./HomePage";

test('displays Home page with file upload functionality visible', async () => {
    render(<HomePage />);
    const element = screen.getByText('Drag & Drop');
    expect(element).toBeInTheDocument();
});
