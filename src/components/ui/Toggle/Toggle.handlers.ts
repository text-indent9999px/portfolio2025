import { KeyboardEvent } from 'react';

export function buildClickHandler({
  checked,
  disabled,
  placeholder,
  onChange,
  setIsUserInteraction,
}: {
  checked: boolean;
  disabled: boolean;
  placeholder: boolean;
  onChange: (checked: boolean) => void;
  setIsUserInteraction: (v: boolean) => void;
}) {
  return () => {
    if (disabled || placeholder) return;
    setIsUserInteraction(true);
    onChange(!checked);
  };
}

export function buildKeydownHandler({
  checked,
  disabled,
  placeholder,
  onChange,
  setIsUserInteraction,
}: {
  checked: boolean;
  disabled: boolean;
  placeholder: boolean;
  onChange: (checked: boolean) => void;
  setIsUserInteraction: (v: boolean) => void;
}) {
  return (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled || placeholder) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsUserInteraction(true);
      onChange(!checked);
    }
  };
}
