import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React, { ReactNode, createElement } from 'react';

export default function wrapField(
  {
    component,
    disabled,
    error,
    errorMessage,
    fullWidth,
    helperText,
    margin,
    readOnly,
    required,
    showInlineError,
    variant,
    props,
  }: any,
  ...children: ReactNode[]
) {
  const formHelperText = showInlineError && error ? errorMessage : helperText;
  const elProps = {
    component,
    disabled: !!disabled,
    error: !!error,
    errorMessage,
    fullWidth: !!fullWidth,
    margin,
    readOnly,
    required: !!required,
    variant,
    ...props,
  };

  return createElement(
    FormControl,
    elProps,
    ...children,
    !!formHelperText && <FormHelperText>{formHelperText}</FormHelperText>,
  );
}
