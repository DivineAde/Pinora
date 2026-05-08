import { IKImage } from "imagekitio-react";

const getHost = (url) => {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
};

const Image = ({ path, src, alt, className, w, h }) => {
  const imageKitEndpoint = import.meta.env.VITE_URL_IK_ENDPOINT;
  const imageKitHost = getHost(imageKitEndpoint);
  const isImageKitSrc =
    src &&
    imageKitHost &&
    src.startsWith("http") &&
    src.includes(imageKitHost);

  if (src && !isImageKitSrc) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={className}
        width={w}
        height={h}
      />
    );
  }

  return (
    <IKImage
      urlEndpoint={imageKitEndpoint}
      path={path}
      src={src}
      transformation={[
        {
          height: h,
          width: w,
        },
      ]}
      alt={alt}
      loading="lazy"
      className={className}
      lqip={{ active: true, quality: 20 }}
    />
  );
};

export default Image;
