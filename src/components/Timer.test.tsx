// Timer.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Timer from './Timer'; // Adjust the import path if the file lives elsewhere

// ✅ Mock the usePlantPoints hook
vi.mock('../hooks/usePlantPoints', () => ({
  usePlantPoints: () => ({
    addTimerPoints: vi.fn(),
    addPlantPoint: vi.fn(),
  }),
}));

describe('Timer Component', () => {
  beforeEach(() => {
    // ✅ Populate localStorage with one mock task
    const mockTasks = [
      {
        id: 1,
        title: 'Test Task',
        priority: 'Urgent & Important',
        dueDate: '2025-08-15',
        completed: false,
      },
    ];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
    localStorage.removeItem('pomodoroSessions'); // Optional: clean session state
  });

  it('enables and activates the Start button when a task is selected', () => {
    render(<Timer />);

    const select = screen.getByLabelText(/which task are we working on/i);
    fireEvent.change(select, { target: { value: '1' } });

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).not.toBeDisabled();

    fireEvent.click(startButton);
    expect(startButton).toBeDisabled(); // Button disables after starting

    const stopButton = screen.getByRole('button', { name: /stop/i });
    expect(stopButton).not.toBeDisabled();
  });

  it('activates and disables the Stop button correctly', () => {
    render(<Timer />);

    const select = screen.getByLabelText(/which task are we working on/i);
    fireEvent.change(select, { target: { value: '1' } });

    const startButton = screen.getByRole('button', { name: /start/i });
    const stopButton = screen.getByRole('button', { name: /stop/i });

    fireEvent.click(startButton);
    expect(stopButton).not.toBeDisabled();

    fireEvent.click(stopButton);
    expect(stopButton).toBeDisabled();
    expect(startButton).not.toBeDisabled();
  });

  it('resets the timer and disables Stop after clicking Reset', () => {
    render(<Timer />);

    const select = screen.getByLabelText(/which task are we working on/i);
    fireEvent.change(select, { target: { value: '1' } });

    const startButton = screen.getByRole('button', { name: /start/i });
    const stopButton = screen.getByRole('button', { name: /stop/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    fireEvent.click(resetButton);

    // Timer display should return to 25:00
    expect(screen.getByText('25:00')).toBeInTheDocument();

    // Start should be re-enabled, Stop should be disabled
    expect(startButton).not.toBeDisabled();
    expect(stopButton).toBeDisabled();
  });
});
