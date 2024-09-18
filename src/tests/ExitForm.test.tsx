import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ExitForm from '../components/forms/ExitForm';
import '@testing-library/jest-dom';

jest.mock('../components/Modal', () => () => <div data-testid="modal">Modal</div>);

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('Exit Form Component', () => {
  it('should render correctly', () => {
    render(<ExitForm />);

    const label = screen.getByLabelText('Número da placa:');
    expect(label).toBeInTheDocument();

    const input = screen.getByPlaceholderText('AAA-0000');
    expect(input).toBeInTheDocument();

    const paymentButton = screen.getByText('PAGAMENTO');
    expect(paymentButton).toBeInTheDocument();

    const exitButton = screen.getByText('Saída');
    expect(exitButton).toBeInTheDocument();

    const historyButton = screen.getByText('Ver Histórico');
    expect(historyButton).toBeInTheDocument();
  });

  it('should validate the format of the plate input', () => {
    render(<ExitForm />);

    const plateInput = screen.getByPlaceholderText('AAA-0000');

    fireEvent.change(plateInput, { target: { value: 'ABC1234' } }); // inserindo a entrada de uma placa valida
    expect(plateInput).toHaveValue('ABC-1234');

    fireEvent.change(plateInput, { target: { value: 'ABC12' } }); // Simulando a entrada de uma placa invalida
    expect(plateInput).toHaveValue('ABC-12');
  });
});
