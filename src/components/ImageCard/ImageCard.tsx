import css from "./ImageCard.module.css";
import { ImageType } from "../api";

type Props = {
  image: ImageType;
  openModal: () => void;
  setCurrentImage: (image: ImageType | null) => void;
};

const ImageCard = ({ image, setCurrentImage, openModal }: Props) => {
  const onImageClick = () => {
    setCurrentImage(image);
    openModal();
  };
  return (
    <div onClick={onImageClick} className={css.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
