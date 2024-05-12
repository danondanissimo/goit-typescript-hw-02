import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({
  isOpen,
  modalContent,
  closeModal,
  enableBackgroundScroll,
  disableBackgroundScroll,
}) => {
  const handleScrollDisabling = () => {
    disableBackgroundScroll();
  };

  const handleScrollEnabling = () => {
    enableBackgroundScroll();
  };

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={closeModal}
      contentLabel="Image modal"
      ariaHideApp={false}
      className={css.modal}
      overlayClassName={css.overlay}
      onAfterOpen={handleScrollDisabling}
      onAfterClose={handleScrollEnabling}
    >
      <img
        src={modalContent.imgModal}
        alt={modalContent.description}
        className={css.image}
      />
      <p className={css.textContainer}>
        <span className={css.text}>Likes: {modalContent.likes}</span>
      </p>
    </Modal>
  );
};

export default ImageModal;
