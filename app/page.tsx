// app/page.tsx
import Image from "next/image";
import fs from "node:fs/promises";
import Link from "next/link";
import "font-awesome/css/font-awesome.min.css";
import Notification from "@/components/Notification";

export default async function Home() {
  const files = await fs.readdir("./public/assets");
  const images = files.map((file) => `/assets/${file}`);

  return (
    <div>
      {/* Navbar */}
     

<nav className="bg-gray-800 p-4">
  <div className="max-w-screen-xl mx-auto flex items-center justify-between">
    <h1 className="text-3xl text-white font-bold">Our Gallery</h1>
    <div className="flex items-center space-x-4">
      <Link
        href="/upload"
        className="py-2 px-4 bg-gray-400 hover:bg-blue-900 text-white rounded"
      >
        Upload Your Image
      </Link>
      <Notification />
    </div>
  </div>
</nav>

      {/* Hero Section with Custom Background Image */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/10.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white z-10">
          <h2 className="text-5xl font-bold">
            Photographs Captured by Our Talented Photographers
          </h2>
        </div>
      </section>

      {/* Small Image Carousel Section */}
      <div className="max-w-screen-lg mx-auto py-14">
        <h3 className="text-3xl font-bold text-center mb-8">
          Our Featured Gallery
        </h3>
        <p className="text-lg text-center mb-12">
          Our photography page is a space where you can enjoy the impressive
          work of our talented photographers.
          <br /> Each image tells its own story, captured at the perfect moment
          through the lens of a professional photographer.
          <br />
          Hover over each image to learn more about the story behind it and the
          creative process.
        </p>
        <div className="flex overflow-x-auto space-x-4">
          {images.map((image, index) => {
            const imageName = image.split("/").pop()?.split(".")[0]; // do Extract the image filename without extension
            return (
              <div
                key={index}
                className="relative w-48 h-48 bg-gray-200 rounded-md overflow-hidden shadow-md group"
              >
                <Image
                  src={image}
                  alt={`Uploaded Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white">
                  <span className="text-xl font-bold"> {imageName}</span>{" "}
                  {/* Display image filename */}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Images Grid Section */}
      <div className="max-w-screen-lg mx-auto py-14">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-bold text-gray-800">Our Gallery</h1>
          <Link
            href="/upload"
            className="py-3 px-6 bg-gray-600 hover:bg-blue-900 text-white rounded-md transition duration-300 ease-in-out"
          >
            Upload Your Image
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {images.map((image) => (
            <div
              key={image}
              className="max-w-sm border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={image}
                  alt={image}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seksioni i Kontaktit */}
      <div className="max-w-screen-lg mx-auto py-10 bg-gray-100">
        <h3 className="text-3xl font-bold text-center mb-8">
          Contact Our Photographers
        </h3>
        <p className="text-lg text-center mb-12">
          If you would like to collaborate with one of our photographers on a
          project, feel free to reach out to us.
          <br />
          Contact us for more details and pricing.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <p>&copy; 2025 Our Gallery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

