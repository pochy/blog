/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { ImageProps } from "next/image";
import React from "react";
import { ExtraProps } from "react-markdown";

type RequireContext = {
  (id: string): { default: ImageProps };
};

const postImages = (require as NodeRequire & {
  context: (
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp
  ) => RequireContext;
}).context(
  "../../../_posts",
  true,
  /\.(png|jpe?g|gif|webp|avif|svg)$/
);

const PostImage =
  (slug: string) =>
  ({
    src,
    alt = "alt",
    title = "title",
    ...props
  }: React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement> &
    ExtraProps) => {
    const srcString = typeof src === "string" ? src : src?.toString() || "";
    if (srcString.match(/https/)) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={srcString}
          alt={alt}
          title={title}
          loading="lazy"
          decoding="async"
          {...props}
        />
      );
    }
    // console.log("Post Image", src, slug);
    try {
      const imagePath = "./" + slug.split("/").slice(0, -1).join("/") + "/" + srcString;
      const image: ImageProps = postImages(imagePath).default;
      // console.log("Image", image);
      return (
        <img
          src={`${image.src}`}
          alt={alt}
          title={title}
          className="next-image"
          loading="lazy"
          decoding="async"
          {...props}
        />
      );
    } catch (e) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img
          src={srcString}
          alt={alt}
          title={title}
          loading="lazy"
          decoding="async"
          {...props}
        />
      );
    }
  };
export default PostImage;
