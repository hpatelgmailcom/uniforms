import ListItemMaterial, { ListItemProps } from '@mui/material/ListItem';
import React, { ReactNode } from 'react';
import { connectField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';

export type ListItemFieldProps = {
  children?: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  removeIcon?: ReactNode;
  value?: unknown;
  style?: object;
};

function ListItem({
  // we are adding fromlist so NetField know it's an array item
  // it is processing. We need to send the flag so NestField
  // does not print item index number in the array for each row.
  children = <AutoField fromlist label={null} name="" />,
  dense = true,
  disableGutters,
  divider,
  removeIcon,
  style,
}: ListItemFieldProps) {
  return (
    <ListItemMaterial
      style={style}
      dense={dense}
      disableGutters={disableGutters}
      divider={divider}
    >
      {children}
      <ListDelField name="" icon={removeIcon} />
    </ListItemMaterial>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
