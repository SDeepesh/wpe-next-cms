/** @jsxRuntime classic */
/** @jsx jsx */

import { lighten } from 'polished';
import { jsx, css, useTheme } from '@emotion/react';

import { Theme } from '../../theme';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: string;
}

export enum AlertVariant {
  Success = 'success',
  Danger = 'danger',
  Primary = 'primary',
}

function mapAlertTypeToThemeColor(theme: Theme, variant: string) {
  switch (variant) {
    case AlertVariant.Danger: {
      return theme.colors.danger;
    }

    case AlertVariant.Success: {
      return theme.colors.success;
    }

    case AlertVariant.Primary: {
      return theme.colors.primary;
    }

    default: {
      return theme.colors.primary;
    }
  }
}

export default function Alert({ variant, children, ...rest }: AlertProps) {
  const theme = useTheme();
  const themeColor = mapAlertTypeToThemeColor(theme, variant);

  const style = css`
    position: relative;
    color: ${themeColor};
    background-color: ${lighten(0.3, themeColor)};
    font-size: 16px;
    margin: 1rem 0;
    padding: 0.75rem 1.25rem;
    border-color: ${lighten(0.1, themeColor)};
    border: 1px solid transparent;
    border-radius: 0.25rem;
    display: inline-block;
  `;

  return (
    <div css={style} {...rest}>
      {children}
    </div>
  );
}
