import React, {ReactNode} from 'react';
import CSS from 'csstype';

import {DEFAULT_SIZE, DEFAULT_WEIGHT} from '../constants/textPresets';

type Props = {
  size?: 'xsmall' | 'small' | 'default' | 'header' | 'title';
  style?: CSS.Properties;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  primary?: boolean;
  children: ReactNode | string;
};

export default function Text(props: Props) {
  let {primary, bold, italic, style, size, children, ...otherProps} = props;
  if (style) {
    return (
      <p style={style} {...otherProps}>
        {children}
      </p>
    );
  } else {
    return (
      <p style={styles.default} {...otherProps}>
        {children}
      </p>
    );
  }
}

const styles = {
  default: {
    fontSize: DEFAULT_SIZE,
    fontWeight: DEFAULT_WEIGHT,
    fontFamily: 'PT Sans',
    marginBottom: 0,
  },
};
