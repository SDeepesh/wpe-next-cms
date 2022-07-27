import React from 'react';
import styled from '@emotion/styled';
import { space, compose, SpaceProps } from 'styled-system';

const StyledIcon = styled('span')(compose(space));

interface IconProps extends SpaceProps {
  name: string;
}

function Icon({ name, ...rest }: IconProps) {
  return <StyledIcon className={`dashicons dashicons-${name}`} {...rest} />;
}

export default Icon;
