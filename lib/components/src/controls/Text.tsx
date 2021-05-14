import React, { FC, ChangeEvent, useCallback, useState } from 'react';
import { styled } from '@storybook/theming';

import { Form } from '../form';
import { ControlProps, TextValue, TextConfig } from './types';

export type TextProps = ControlProps<TextValue | undefined> & TextConfig;

const Wrapper = styled.label({
  display: 'flex',
});

export const TextControl: FC<TextProps> = ({ name, value, onChange, onFocus, onBlur }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const [forceVisible, onSetForceVisible] = useState(false);
  const onForceVisible = useCallback(() => {
    onChange('');
    onSetForceVisible(true);
  }, [onSetForceVisible]);
  if (value === undefined) {
    return <Form.Button onClick={onForceVisible}>Set string</Form.Button>;
  }

  const isValid = typeof value === 'string';
  return (
    <Wrapper>
      <Form.Textarea
        id={name}
        onChange={handleChange}
        size="flex"
        placeholder="Edit string..."
        autoFocus={forceVisible}
        valid={isValid ? null : 'error'}
        {...{ name, value: isValid ? value : '', onFocus, onBlur }}
      />
    </Wrapper>
  );
};
