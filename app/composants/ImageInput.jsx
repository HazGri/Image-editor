"use client";
import clsx from "clsx";
import { useState } from "react";
import { Input } from "./Input";
import { ImageGenerator } from "./ImageGenerator";
import { renderPNG } from "../render-png";

export const ImageInput = () => {
  const [image, setImage] = useState();
  const [settings, setSettings] = useState({
    padding: 16,
    shadow: 4,
    radius: 9,
  });
  const [loading, setLoading] = useState("idle");

  const setSetting = (name, value) => {
    setSettings((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;

    const file = files[0];

   

    const reader = new FileReader();

    reader.onload = function () {
      const img = new Image();

      img.onload = function () {
        setImage({
          width: img.width,
          height: img.height,
          src: img.src,
          name: file.name,
        });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };
 
  const handleDownload = async (isCopy) => {
    setLoading(isCopy ? "copying" : "downloading");
    const { blob } = await renderPNG({
      image,
      settings,
    });
    const url = URL.createObjectURL(blob);

    if(isCopy) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        })
      ])
    } else {
      const link = document.createElement("a");
      link.download = image.name.replace(".png", "-elevation.png");
      link.href = url;
      link.click();
    }
    setLoading("idle")
  }

  return (
    <>
      <div className="flex flex-col gap-8 bg-gray-100 shadow-lg w-10/12 p-9 rounded-lg">
        <b className="text-xl">Settings</b>
        <Input isImage onChange={handleFileChange} type="file" />
        <b>Padding</b>
        <Input
          isRange
          min={0}
          max={99}
          onChange={(e) => setSetting("padding", e.target.value)}
          value={settings.padding}
          type="range"
        />
        <b>Shadow</b>
        <Input
          isRange
          min={0}
          max={99}
          onChange={(e) => setSetting("shadow", e.target.value)}
          value={settings.shadow}
          type="range"
        />
        <b>Radius</b>
        <Input
          isRange
          min={0}
          max={99}
          onChange={(e) => setSetting("radius", e.target.value)}
          value={settings.radius}
          type="range"
        />
      </div>
      <div
        style={{
          maxWidth: 400,
        }}
        className="flex flex-col gap-4 w-full h-fit border rounded-md"
      >
        <ImageGenerator settings={settings} image={image} />
        <button
          className="btn btn-primary"
          disabled={loading !== "idle"}
          onClick={() => handleDownload(false)}
        >
          Download{" "}
          {loading === "downloading" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : null }
        </button>
        <button
          className="btn"
          disabled={loading !== "idle"}
          onClick={() => handleDownload(true)}
        >
          Copy{" "}
          {loading === "copying" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : null }
        </button>
      </div>
    </>
  );
};
