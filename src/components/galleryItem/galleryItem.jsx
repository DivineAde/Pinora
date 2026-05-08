import "./galleryItem.css";
import { Link } from "react-router";
import Image from "../image/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon, Share01Icon } from "@hugeicons/core-free-icons";

const GalleryItem = ({ item }) => {

  const optimizedHeight = (372 * item.height) / item.width

  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      {/* <img src={item.media} alt="" /> */}
      <Image src={item.media} alt="" w={372} h={optimizedHeight} />
      <Link to={`/pin/${item._id}`} className="overlay" />
      <button className="saveButton">Save</button>
      <div className="overlayIcons">
        <button type="button" aria-label="Share pin">
          <HugeiconsIcon icon={Share01Icon} size={20} />
        </button>
        <button type="button" aria-label="More options">
          <HugeiconsIcon icon={MoreHorizontalIcon} size={20} />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
