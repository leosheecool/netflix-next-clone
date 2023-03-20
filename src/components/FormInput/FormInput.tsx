import React from 'react';
import styles from './FormInput.module.scss';
import cn from 'classnames';

type Props = React.ComponentPropsWithRef<'input'> & {
  label?: string;
};

const FormInput = ({ label, ...props }: Props) => {
  return (
    <div className={styles.container}>
      <input {...props} className={cn(styles.input)} placeholder=" " />
      <label className={styles.label} htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
};

export default FormInput;
