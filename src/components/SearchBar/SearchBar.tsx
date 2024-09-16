import css from "./SearchBar.module.css";
import { FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { toastStyles } from "../../toast";

type Submit = {
  onSubmit: (query: string) => void;
};
const SearchBar = ({ onSubmit }: Submit) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const searchInput = form.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;

    const searchQuery = searchInput.value.trim();
    if (searchQuery === "") {
      toast("Please enter search word.", toastStyles);
      return;
    }
    onSubmit(searchQuery);
    searchInput.value = "";
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchIcon}>
          <FiSearch />
        </button>
        <input
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchInput}
        />
      </form>
      <Toaster />
    </header>
  );
};

export default SearchBar;
