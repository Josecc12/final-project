// Crea un archivo: /components/ui/Switch.tsx

import * as React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange }) => {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
