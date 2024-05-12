import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

import { nanoid } from "nanoid";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images !== null &&
        images.map((image) => {
          return (
            <li key={nanoid()} className={css.listElement}>
              <ImageCard
                imgSrc={image.urls.small}
                imgModal={image.urls.regular}
                likes={image.likes}
                description={image.alt_description}
                openModal={openModal}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
