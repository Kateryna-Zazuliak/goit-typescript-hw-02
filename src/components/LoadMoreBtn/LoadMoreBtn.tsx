import css from "./LoadMoreBtn.module.css";
type Props = {
  onLoadMore: () => void;
};

const LoadMoreBtn = ({ onLoadMore }: Props) => {
  return (
    <button type="button" onClick={onLoadMore} className={css.loadMoreBtn}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
