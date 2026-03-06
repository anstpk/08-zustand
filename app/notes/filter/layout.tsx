import css from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className="container">
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}