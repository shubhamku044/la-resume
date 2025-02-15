'use client';

import { Pencil } from 'lucide-react';

type PencilButtonProps = {
  onClick: () => void;
};

export default function PencilButton({ onClick }: PencilButtonProps) {
  return (
    <Pencil
      size={18}
      className="cursor-pointer text-gray-500 hover:text-gray-700"
      onClick={onClick}
    />
  );
}
