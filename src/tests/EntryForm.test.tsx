import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EntryForm from '../components/forms/EntryForm';
import useFetch from '../hooks/useFetch';
import { HttpStatusCode } from '../constants/HttpStatusCode';
import '@testing-library/jest-dom';

jest.mock('../hooks/useFetch');

describe('EntryForm Component', () => {
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = {
      refetch: jest.fn(),
      loading: false,
      statusDone: false,
      statusCode: null,
      error: null,
    };
    (useFetch as jest.Mock).mockReturnValue(mockFetch);
  });

  it('should renders the form with initial elements', () => {
    render(<EntryForm />);

    const input = screen.getByPlaceholderText('AAA-0000');
    expect(input).toBeInTheDocument();

    const button = screen.getByText('CONFIRMAR ENTRADA');
    expect(button).toBeInTheDocument();
  });

  it('should displays error message when plate pattern does not match', async () => {
    render(<EntryForm />);

    const input = screen.getByPlaceholderText('AAA-0000');

    fireEvent.change(input, { target: { value: '1234222' } }); // inserindo um valor invalido

    fireEvent.submit(screen.getByRole('form')); // enviando o formulario

      const errorMessage = await waitFor(() =>
        screen.getByText((content) => content.includes('A placa deve ser válida, seguindo o seguinte formato: AAA-0000'))
      );

      expect(errorMessage).toBeInTheDocument();
  });

  it('should calls refetch when form is submitted with valid plate', async () => {
    render(<EntryForm />);

    const input = screen.getByPlaceholderText('AAA-0000');

    fireEvent.change(input, { target: { value: 'ABC-1234' } }); // digita uma placa valida

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockFetch.refetch).toHaveBeenCalled(); // Verifica se a função refetch foi chamada
    });
  });

  it('should clear the input when parking is successful', async () => {
    mockFetch.statusCode = HttpStatusCode.OK;

    render(<EntryForm />);

    const input = screen.getByPlaceholderText('AAA-0000');

    fireEvent.change(input, { target: { value: 'ABC-1234' } }); // insere um valor valido

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  it('should displays server error message when unprocessable entity error occurs', async () => {
    mockFetch.error = {
      status: HttpStatusCode.UNPROCESSABLE_ENTITY,
      response: {
        data: {
          errors: {
            plate: ['Estacionamento já existe'],
          },
        },
      },
    };

    render(<EntryForm />);

    await waitFor(() => {
      expect(screen.getByText('Estacionamento já existe')).toBeInTheDocument();
    });
  });
});
