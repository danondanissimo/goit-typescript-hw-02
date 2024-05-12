import {  ImagesObject} from "../Services/Api";
import css from "./ImageCard.module.css";


interface Props extends ImagesObject {
  openModal: (image: ImagesObject) => void,
}

const ImageCard = ({ id, likes, alt_description, urls, openModal }: Props) => {
  const handleClick = (): void => {

const imageData: ImagesObject= {
    id: id, 
    alt_description: alt_description,
    urls: urls,
  likes: likes
  };



    openModal(imageData);

  };
  return (
    <div className={css.container}>
      <img
        src={urls.regular}
        alt={alt_description}
        onClick={handleClick}
        className={css.image}
      />
      <p>Likes: {likes}</p>
    </div>
  );
};

export default ImageCard;
