import "./App.css";

import { useEffect, useState } from "react";

import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import { requestImagesByQuery } from "./components/Services/Api.js";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

function App() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const notify = () => toast.error("Please fill in the Search field.");

  const onSetSearchQuery = (searchTerm) => {
    if (searchTerm.length === 0) {
      notify();
    } else {
      setPage(1);
      setQuery(searchTerm);
    }
  };

  useEffect(() => {
    if (query.length === 0) return;

    async function fetchImagesByQuery() {
      try {
        setLoading(true);
        const response = await requestImagesByQuery(query, page);

        if (response.data.total === 0) {
          toast.error("Sorry, we couldn't find anything.");
          setImages(null);
          setLoading(false);
        }

        if (page !== 1) {
          setLoadingMore(false);
          setImages((prevResult) => {
            return [...prevResult, ...response.data.results];
          });
        } else {
          setImages(response.data.results);
        }

        setTotalPages(response.data.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImagesByQuery();
  }, [query, page]);

  const loadMore = () => {
    setPage((page) => page + 1);
    setLoadingMore(true);
  };

  const openModal = ({ likes, description, imgModal }) => {
    setIsOpen(!isOpen);
    setModalContent({ likes, description, imgModal });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent({});
  };

  const disableBackgroundScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableBackgroundScroll = () => {
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <SearchBox onSubmit={onSetSearchQuery} />
      <Toaster />
      {error && <ErrorMessage />}
      {loading === true && <Loader />}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {loadingMore === false && totalPages && page < totalPages && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {loadingMore === true && <Loader />}
      <ImageModal
        isOpen={isOpen}
        modalContent={modalContent}
        openModal={openModal}
        closeModal={closeModal}
        enableBackgroundScroll={enableBackgroundScroll}
        disableBackgroundScroll={disableBackgroundScroll}
      />
    </>
  );
}

export default App;
