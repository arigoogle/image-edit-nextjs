"use client";
import React, { useState, ChangeEvent } from "react";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosImage } from "react-icons/io";
import Image from "next/image";
import ReactCrop, { type Crop } from 'react-image-crop'

const Home: React.FC = () => {
  const filterElement = [
    {
      name: "brightness",
      maxValue: 200,
    },
    {
      name: "grayscale",
      maxValue: 200,
    },
    {
      name: "sepia",
      maxValue: 200,
    },
    {
      name: "saturate",
      maxValue: 200,
    },
    {
      name: "contrast",
      maxValue: 200,
    },
    {
      name: "hueRotate",
      maxValue: 360, // Set an appropriate maximum value for hueRotate
    },
  ];

  const [property, setProperty] = useState(filterElement[0]);
  const [details, setDetails] = useState('');
  const [crop, setCrop] = useState<Crop>({
    unit: '%', // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [state, setState] = useState({
    image: "",
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vertical: 1,
    horizontal: 1,
  });

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const imageHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      reader.onload = () => {
        setState({
          ...state,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 90,
    });
  };

  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 90,
    });
  };

  const leftFlip = () => {
    setState({
      ...state,
      vertical: state.vertical === 1 ? -1 : 1,
    });
  };

  const rightFlip = () => {
    setState({
      ...state,
      horizontal: state.horizontal === 1 ? -1 : 1,
    });
  };

  const imageCrop = () => {

    const canvas = document.createElement('canvas');
    const scaleX = details.naturalWidth / details.width;
    console.log(scaleX)

  }

  const saveImage = () => {

  }

  // console.log(details);

  return (
    <>
      <div className="image_editor">
        <div className="card">
          <div className="card_header">
            <h2>Image Editor</h2>
          </div>
          <div className="card_body">
            <div className="side_bar">
              <div className="side_body">
                <div className="filter_section">
                  <span>Filters</span>
                  <div className="filter_key">
                    {filterElement.map((item, index) => (
                      <button
                        className={property.name === item.name ? "active" : ""}
                        onClick={() => setProperty(item)}
                        key={index}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter_slider">
                  <div className="label_bar">
                    <label htmlFor="range">{property.name}</label>
                    <span>{state[property.name as keyof typeof state]}%</span>
                    <input
                      name={property.name}
                      onChange={inputHandle}
                      value={state[property.name as keyof typeof state]}
                      max={property.maxValue}
                      type="range"
                    />
                  </div>
                </div>
                <div className="rotate">
                  <label htmlFor="">Rotate & Flip</label>
                  <div className="icon">
                    <div onClick={leftRotate}>
                      <GrRotateLeft />
                    </div>
                    <div onClick={rightRotate}>
                      <GrRotateRight />
                    </div>
                    <div onClick={leftFlip}>
                      <CgMergeVertical />
                    </div>
                    <div onClick={rightFlip}>
                      <CgMergeHorizontal />
                    </div>
                  </div>
                </div>
                <div className="image_section">
                  <div className="image">
                    {state.image ? (
                       <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                        <img
                          onLoad={(e) => setDetails(e.currentTarget)}
                          style={{
                            filter: `
                            brightness(${state.brightness}%)
                            grayscale(${state.grayscale}%)
                            sepia(${state.sepia}%)
                            saturate(${state.saturate}%)
                            contrast(${state.contrast}%)
                            hue-rotate(${state.hueRotate}deg)`,
                            transform: `rotate(${state.rotate}deg) scale(${state.vertical}, ${state.horizontal})`,
                          }}
                          // width={400}
                          // height={400}
                          // objectFit="contain"
                          src={state.image}
                          alt=""
                        />
                     </ReactCrop>
                    ) : (
                      <label htmlFor="choose">
                        <IoIosImage />
                        <span>Choose Image</span>
                      </label>
                    )}
                  </div>
                  <div className="image_select">
                    <button className="undo">
                      <IoMdUndo />
                    </button>
                    <button className="redo">
                      <IoMdRedo />
                    </button>
                    {
                      crop && <button onClick={imageCrop} className="crop">Crop Image</button>
                    }
                    <label htmlFor="choose">Choose Image</label>
                    <input type="file" onChange={imageHandle} id="choose" />
                  </div>
                </div>
                <div className="reset">
                  <button>Reset</button>
                  <button>Save Image</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
