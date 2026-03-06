import Link from 'next/link';
import css from './SidebarNotes.module.css';

// Перелік тегів, який має бути описаний безпосередньо в коді
const TAGS = ['Work', 'Personal', 'Home', 'Study'];

export const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {/* Посилання на всі нотатки (маршрут /notes/filter/all) */}
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {/* Список динамічних тегів */}
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;