import React from 'react';
import { toast as toastify, ToastOptions, TypeOptions } from 'react-toastify';

export function toast(
  message: string,
  type: TypeOptions,
  options?: ToastOptions
) {
  toastify(
    () => (
      <>
        <span data-testid="toast-message">{message}</span>
      </>
    ),
    {
      closeButton: false,
      toastId: `toast-${type}`,
      type: type,
      ...options,
    }
  );
}
