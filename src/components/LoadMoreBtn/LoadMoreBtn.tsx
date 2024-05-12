import css from "./LoadMoreBtn.module.css";

interface Props {
  onClick: () => void,
}

const LoadMoreBtn = ({ onClick }: Props) => {
  return (
    <div>
      <button onClick={onClick} className={css.button}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
