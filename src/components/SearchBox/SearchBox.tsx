
import css from "./SearchBox.module.css";


interface Props {
  onSubmit: (query: string) => void,
}

const SearchBox = ({ onSubmit }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const searchQuery = (form.elements.namedItem("search") as HTMLInputElement).value;
    onSubmit(searchQuery);
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          className={css.field}
        />
        <button type="submit" className={css.button}>
          🔍
        </button>
      </form>
    </header>
  );
};

export default SearchBox;
