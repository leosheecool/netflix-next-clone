import React from 'react';
import styles from './FormInput.module.scss';
import cn from 'classnames';

type Props = React.ComponentPropsWithRef<'input'> & {
  label?: string;
};

const FormInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <input
          {...props}
          className={cn(styles.input)}
          placeholder=" "
          ref={ref}
        />
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
