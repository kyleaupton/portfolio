import React from 'react';
import './button.css';

type ButtonProps = {
    text: string;
}

function Button(props: ButtonProps) {
  return (
    <button type="button">{props.text}</button>
  );
}

export default Button;
