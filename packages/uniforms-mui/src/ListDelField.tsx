import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import React, { ReactNode } from 'react';
import {
  FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';

export type ListDelFieldProps = FieldProps<
  unknown,
  IconButtonProps,
  { icon?: ReactNode }
>;

function ListDel({
  disabled,
  icon = '-',
  name,
  readOnly,
  ...props
}: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  // disabled ||= readOnly || parent.minCount! >= parent.value!.length;
  const minCount = parent?.minCount || 0;
  const valueLength = parent?.value?.length || 0;
  const limitNotReached = !disabled && !(minCount >= valueLength);

  const domProps = {
    ...filterDOMProps(props),
    'data-testid': name,
    disabled: !limitNotReached,
  };
  return (
    <IconButton
      {...domProps}
      disabled={disabled}
      onClick={() => {
        if (!readOnly) {
          const value = parent.value!.slice();
          value.splice(nameIndex, 1);
          parent.onChange(value);
        }
      }}
      size="large"
    >
      {icon}
    </IconButton>
  );
}

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
});
