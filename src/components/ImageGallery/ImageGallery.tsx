import { Toaster, toast } from "react-hot-toast";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { ImageType } from "../api";

type Props = {
  images: ImageType[];
  openModal: (image: ImageType) => void;
  setCurrentImage: (image: ImageType | null) => void;
};

const ImageGallery = ({ images, openModal, setCurrentImage }: Props) => {
  return (
    <div>
      <ul className={css.gallery}>
        {images.map((image) => (
          <li key={image.id}>
            <ImageCard
              image={image}
              setCurrentImage={setCurrentImage}
              openModal={() => openModal(image)}
            />
          </li>
        ))}
      </ul>
      <Toaster />
    </div>
  );
};

export default ImageGallery;
