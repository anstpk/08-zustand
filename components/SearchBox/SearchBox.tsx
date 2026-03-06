'use client';

import css from './SearchBox.module.css';

interface SearchBoxProps {
  onChange: (value: string) => void; // Тепер нам потрібен тільки колбек
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <div className={css.searchWrapper}>
      <input
        type="text"
        placeholder="Search notes..."
        className={css.input}
        onChange={(e) => onChange(e.target.value)} // Викликаємо при зміні
      />
    </div>
  );
}