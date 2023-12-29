import FormLabel from '@mui/material/FormLabel';
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

import AutoField from './AutoField';
import wrapField from './wrapField';

// FIXME: wrapField is not typed correctly.
export type NestFieldProps = HTMLFieldProps<
  object,
  HTMLDivElement,
  {
    helperText?: string;
    itemProps?: object;
    fullWidth?: boolean;
    margin?: any;
    fromlist?: boolean;
  }
>;

function Nest({
  children,
  fields,
  fullWidth = true,
  itemProps,
  label,
  margin = 'dense',
  fromlist = false,
  error,
  ...props
}: NestFieldProps) {
  // we are adding fromlist so NetField know it's an array item
  // it is processing. We need to send the flag so NestField
  // does not print item index number in the array for each row.
  const validLabel = !fromlist ? label : undefined;
  return wrapField(
    {
      fullWidth,
      margin,
      ...props,
      component: undefined,
    },
    validLabel && <FormLabel component="legend">{validLabel}</FormLabel>,
    children ||
      fields.map(field => (
        <AutoField error={!!error} key={field} name={field} {...itemProps} />
      )),
  );
}

export default connectField<NestFieldProps>(Nest);
