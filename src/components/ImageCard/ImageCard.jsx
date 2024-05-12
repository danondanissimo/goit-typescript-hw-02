import css from "./ImageCard.module.css";

const ImageCard = ({ likes, description, imgSrc, imgModal, openModal }) => {
  const handleClick = () => {
    const imageData = { likes, description, imgModal };
    openModal(imageData);
  };
  return (
    <div className={css.container}>
      <img
        src={imgSrc}
        alt={description}
        onClick={handleClick}
        className={css.image}
      />
      <p>Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
