/* @jest-environment jsdom */
// src/app/dol/page.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DagarOmLagar2025 from './page';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string }) =>
      options?.defaultValue || key,
    i18n: {
      language: 'se',
      changeLanguage: jest.fn(),
    },
  }),
}));

// Mock Card and Button components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

describe('DagarOmLagar2025 Component', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();
  });

  it('renders the main title', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Dagar om Lagar 2025')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Streams')).toBeInTheDocument();
    expect(screen.getByText('Program')).toBeInTheDocument();
    expect(screen.getByText('Kontakt')).toBeInTheDocument();
  });

  it('renders language switcher', () => {
    render(<DagarOmLagar2025 />);
    const langButton = screen.getByText('SE');
    expect(langButton).toBeInTheDocument();
  });

  it('renders dark mode toggle', () => {
    render(<DagarOmLagar2025 />);
    const darkModeButton = screen.getByText('☀️');
    expect(darkModeButton).toBeInTheDocument();
  });

  it('toggles dark mode when button is clicked', () => {
    render(<DagarOmLagar2025 />);
    const darkModeButton = screen.getByText('☀️');

    fireEvent.click(darkModeButton);

    // After clicking, it should switch to dark mode icon
    expect(screen.getByText('🌙')).toBeInTheDocument();
  });

  it('renders all four knowledge graph nodes', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Nodväst')).toBeInTheDocument();
    expect(screen.getByText('Nodsyd')).toBeInTheDocument();
    expect(screen.getByText('Nodöst')).toBeInTheDocument();
    expect(screen.getByText('Nodmidd')).toBeInTheDocument();
  });

  it('opens graph modal when View button is clicked', () => {
    render(<DagarOmLagar2025 />);
    const viewButtons = screen.getAllByText('View');

    fireEvent.click(viewButtons[0]);

    // Modal should be open with the node name
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes graph modal when Close button is clicked', async () => {
    render(<DagarOmLagar2025 />);
    const viewButtons = screen.getAllByText('View');

    fireEvent.click(viewButtons[0]);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('renders the live streams section', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Live Streams')).toBeInTheDocument();
  });

  it('renders program schedule section', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Program Schedule')).toBeInTheDocument();
  });

  it('renders three program sessions', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Session 1')).toBeInTheDocument();
    expect(screen.getByText('Session 2')).toBeInTheDocument();
    expect(screen.getByText('Session 3')).toBeInTheDocument();
  });

  it('renders footer with copyright info', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('© 2025 Dagar om Lagar – All Rights Reserved.')).toBeInTheDocument();
  });

  it('renders contact information in footer', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByText('Contact: info@dagaromlagar.se')).toBeInTheDocument();
  });

  it('has proper ARIA labels for accessibility', () => {
    render(<DagarOmLagar2025 />);
    expect(screen.getByLabelText('Main Navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Footer')).toBeInTheDocument();
  });

  it('renders with dark mode by default', () => {
    const { container } = render(<DagarOmLagar2025 />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('bg-black');
    expect(mainDiv.className).toContain('text-white');
  });

  it('switches to light mode when dark mode is toggled', () => {
    const { container } = render(<DagarOmLagar2025 />);
    const darkModeButton = screen.getByText('☀️');

    fireEvent.click(darkModeButton);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.className).toContain('bg-white');
    expect(mainDiv.className).toContain('text-black');
  });

  it('renders YouTube stream iframes', () => {
    const { container } = render(<DagarOmLagar2025 />);
    const iframes = container.querySelectorAll('iframe');
    // Should have at least 5 iframes (1 main + 4 thumbnails)
    expect(iframes.length).toBeGreaterThanOrEqual(5);
  });

  it('changes active stream when thumbnail is clicked', () => {
    const { container } = render(<DagarOmLagar2025 />);
    const streamButtons = screen.getAllByLabelText(/Switch to stream/);

    fireEvent.click(streamButtons[1]);

    // The second button should have the ring class indicating it's active
    expect(streamButtons[1].className).toContain('ring-2');
  });

  it('opens stream from graph modal', () => {
    render(<DagarOmLagar2025 />);
    const viewButtons = screen.getAllByText('View');

    fireEvent.click(viewButtons[0]);

    const openStreamButton = screen.getByText('Open Stream');
    fireEvent.click(openStreamButton);

    // Should close the modal and switch to the corresponding stream
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has proper section IDs for anchor navigation', () => {
    const { container } = render(<DagarOmLagar2025 />);
    expect(container.querySelector('#graph')).toBeInTheDocument();
    expect(container.querySelector('#streams')).toBeInTheDocument();
    expect(container.querySelector('#program')).toBeInTheDocument();
    expect(container.querySelector('#kontakt')).toBeInTheDocument();
  });
});
