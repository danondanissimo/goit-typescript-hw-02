import "./App.css";

import { useEffect, useState } from "react";

import ImageGallery from "./components/ImageGallery/ImageGallery.tsx";
import { ArrayOfImageObjects, ImagesObject, Result, requestImagesByQuery } from "./components/Services/Api.ts";
import Loader from "./components/Loader/Loader.tsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.tsx";

import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.tsx";
import toast, { Toaster } from "react-hot-toast";
import SearchBox from "./components/SearchBox/SearchBox.tsx";
import ImageModal from "./components/ImageModal/ImageModal.tsx";





function App() {
  const [images, setImages] = useState<ArrayOfImageObjects | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<null | number>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<Pick<ImagesObject, "likes" | "alt_description" | "urls">>({ likes: 0, alt_description: "",   urls: {} });
  const notify = () => toast.error("Please fill in the Search field.");


  const onSetSearchQuery = (searchTerm: string): void => {
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


        

  const filteredResults: ArrayOfImageObjects = response.data.results.map((result: ImagesObject) => {
    const { id, alt_description, urls, likes } = result;
    return { id, alt_description, urls, likes };
  });

  
  const filteredResponse: Omit<Result, "results"> = {
    total: response.data.total,
    total_pages: response.data.total_pages,
        }
        

        if (filteredResponse.total === 0) {
          toast.error("Sorry, we couldn't find anything.");
          setImages(null);
          setLoading(false);
        }

        if (page !== 1) { 
          setLoadingMore(false);
          setImages((prevResult) => {
            const prevImages = prevResult === null ? [] : prevResult;
            return [...prevImages, ...filteredResults];
          });
        } else {
          setImages(filteredResults);
        }

        setTotalPages(filteredResponse.total_pages);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchImagesByQuery();
  }, [query, page]);

  const loadMore = (): void => {
    setPage((page) => page + 1);
    setLoadingMore(true);
  };


  const openModal = ({ likes, alt_description, urls }: ImagesObject): void => {
    setIsOpen(!isOpen);
    setModalContent({ likes, alt_description, urls });
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent({ likes: 0, alt_description: "", urls: {} });
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
        {...openModal}
        isOpen={isOpen}
        modalContent={modalContent}

        closeModal={closeModal}
        enableBackgroundScroll={enableBackgroundScroll}
        disableBackgroundScroll={disableBackgroundScroll}
      />
    </>
  );
}

export default App;
