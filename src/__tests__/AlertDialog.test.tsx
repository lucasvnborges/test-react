import { render, fireEvent } from '@testing-library/react';
import AlertDialog from '../components/AlertDialog';

test('O diálogo é exibido corretamente', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const { getByText } = render(
    <AlertDialog show={true} onClose={onClose} onConfirm={onConfirm} />
  );

  expect(getByText('Remover cliente da lista')).toBeTruthy();
  expect(getByText(/Esta ação não pode ser desfeita/i)).toBeTruthy();
  expect(getByText('Cancelar')).toBeTruthy();
  expect(getByText('Confirmar')).toBeTruthy();
});

test('Chamada da função onClose ao clicar em "Cancelar"', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const { getByText } = render(
    <AlertDialog show={true} onClose={onClose} onConfirm={onConfirm} />
  );

  fireEvent.click(getByText('Cancelar'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('Chamada da função onConfirm ao clicar em "Confirmar"', () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();

  const { getByText } = render(
    <AlertDialog show={true} onClose={onClose} onConfirm={onConfirm} />
  );

  fireEvent.click(getByText('Confirmar'));

  expect(onConfirm).toHaveBeenCalledTimes(1);
});
