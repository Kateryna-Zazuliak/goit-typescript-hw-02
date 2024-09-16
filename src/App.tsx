import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchVisionGallery } from "./components/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { toastStyles } from "./toast";
import { ImageType, Data } from "./components/api";

function App() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<ImageType | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data: Data = await fetchVisionGallery(query, pageNumber);
        if (!data.total) {
          toast(
            "За вашим запитом не знайдено жодного зображення. Спробуйте, будь ласка, з іншим ключовим словом.",
            toastStyles
          );
          return;
        }
        setImages((prevImages) =>
          pageNumber === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(
          (error as Error).message || "Something went wrong! Please try again!"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [query, pageNumber]);
  const handleSearch = (query: string): void => {
    setQuery(query);
    setPageNumber(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPageNumber((prevPage: number) => prevPage + 1);
  };
  const openModal = (image: ImageType): void => {
    setCurrentImage(image);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery
            images={images}
            openModal={openModal}
            setCurrentImage={setCurrentImage}
          />
          {isLoading && <Loader />}
          {images.length > 0 && totalPages > pageNumber && (
            <LoadMoreBtn onLoadMore={handleLoadMore} />
          )}
        </>
      )}
      {modalIsOpen && currentImage && (
        <ImageModal
          currentImage={currentImage}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
