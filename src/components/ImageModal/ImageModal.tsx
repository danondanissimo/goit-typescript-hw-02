import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { ImagesObject } from "../Services/Api";

interface Props {
  isOpen: boolean,
  modalContent: Pick<ImagesObject, "likes" | "alt_description" | "urls">,
  closeModal: () => void,
  enableBackgroundScroll: () => void,
  disableBackgroundScroll: () => void,
}



const ImageModal: React.FC<Props> = ({
  isOpen,
  modalContent,
  closeModal,
  enableBackgroundScroll,
  disableBackgroundScroll,
}) => {


  const handleScrollDisabling = ():void => {
    disableBackgroundScroll();
  };

  const handleScrollEnabling = ():void => {
    enableBackgroundScroll();
  };

  return (
    <Modal
            {...{ isOpen, onRequestClose: closeModal }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Image modal"
      ariaHideApp={false}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={handleScrollDisabling}
      onAfterClose={handleScrollEnabling}
    >
      <img
        src={modalContent.urls.regular}
        alt={modalContent.alt_description}
        className={css.image}
      />
      <p className={css.textContainer}>
        <span className={css.text}>Likes: {modalContent.likes}</span>
      </p>
    </Modal>
  );
};

export default ImageModal;
