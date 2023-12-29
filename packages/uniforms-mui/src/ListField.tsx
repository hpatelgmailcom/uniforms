import ListMaterial, { ListProps } from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import React, {
  Children,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { FieldProps, connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type Props = {
  style: object;
};

export type Uniforms = {
  props: Props;
};

export type Items = {
  uniforms: Uniforms;
};

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    addIcon?: ReactNode;
    initialCount?: number;
    itemProps?: object;
    items?: Items;
    props?: Props;
  }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  const listAddFieldId = `${props.name}-button`;
  const { items, props: childProps, ...domProps } = props;
  const itemStyle = items?.uniforms?.props?.style || {};
  const style = childProps?.style || {};

  return (
    <>
      <ListMaterial
        dense
        subheader={
          label ? (
            <ListSubheader style={style} disableSticky>
              {label}
            </ListSubheader>
          ) : undefined
        }
        {...filterDOMProps(domProps)}
      >
        {value?.map((item, itemIndex) =>
          Children.map(children, (child, childIndex) =>
            isValidElement(child)
              ? cloneElement(child, {
                  style: itemStyle,
                  key: `${itemIndex}-${childIndex}`,
                  name: child.props.name?.replace('$', '' + itemIndex),
                  ...itemProps,
                })
              : child,
          ),
        )}
      </ListMaterial>
      <ListAddField
        id={listAddFieldId}
        icon={addIcon}
        name="$"
        initialCount={initialCount}
      />
    </>
  );
}

export default connectField<ListFieldProps>(List);
