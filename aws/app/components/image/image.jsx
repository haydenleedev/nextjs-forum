"use client";
import { CldImage } from "next-cloudinary";

export default function CloudImage() {
  let rootUrl =
    "https://res.cloudinary.com/swayden/image/upload/v1687833343/forum/";
  return (
    <CldImage
      src={`${rootUrl}hero.jpg`}
      alt="Vercel Logo"
      className="dark:invert object-cover"
      width={400}
      height={230}
      priority
    />
  );
}
