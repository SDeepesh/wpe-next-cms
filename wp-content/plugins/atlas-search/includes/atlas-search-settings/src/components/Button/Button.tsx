import React from 'react';
import { darken } from 'polished';
import styled from '@emotion/styled';

export enum ButtonVariant {
  Primary = 'primary',
  Danger = 'danger',
}

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  outline?: boolean;
  block?: boolean;
  size?: ButtonSize;
}

export const Button = styled.button<ButtonProps>`
  ${({
    theme,
    outline,
    variant = ButtonVariant.Primary,
    size = ButtonSize.Medium,
  }) => ({
    fontSize: `${theme.fonts.sizes[size]} !important`,
    backgroundColor: outline ? 'transparent' : theme.colors[variant],
    borderColor: outline ? theme.colors[variant] : 'transparent',
    color: outline ? theme.colors[variant] : theme.colors.white,
  })};

  ${({ block = false }) =>
    block
      ? {
          display: 'block',
          width: '100%',
        }
      : {
          display: 'inline-block',
        }}

  line-height: 1.5;
  padding: 1rem 1.5rem;
  border-width: thin;
  border-style: solid;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.15s;
  font-size: 1rem;

  &:hover,
  &:focus {
    ${({ theme, outline, variant = ButtonVariant.Primary }) => ({
      backgroundColor: outline
        ? theme.colors[variant]
        : darken(0.1, theme.colors[variant]),
      color: theme.colors.white,
    })};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 1px solid transparent;
  }
`;
