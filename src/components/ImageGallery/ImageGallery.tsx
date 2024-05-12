import css from "./ImageGallery.module.css";

import ImageCard from "../ImageCard/ImageCard";

import { nanoid } from "nanoid";
import { ArrayOfImageObjects, ImagesObject } from "../Services/Api";


interface Props {
  images: ArrayOfImageObjects | null,
  openModal: (image: ImagesObject) => void,
}

const ImageGallery = ({ images, openModal }: Props) => {
  return (
    <ul className={css.list}>
      {images !== null &&
        images.map((image) => {
          return (
            <li key={nanoid()} className={css.listElement}>
              <ImageCard
                id={image.id}
                urls={image.urls}
                likes={image.likes}
                alt_description={image.alt_description}
                openModal={openModal}
              />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
