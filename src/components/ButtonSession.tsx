import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  img: string;
  url: string;
  text: string;
  saveFuc: any;
}

function ButtonSession({ img, url, text, saveFuc }: ButtonProps) {
  return (
    <Link to={url} onClick={saveFuc}>
      <button className={text}>
        <div>{text}</div>
        <img src={img} alt={text} />
      </button>
    </Link>
  );
}

export default ButtonSession;

// <!DOCTYPE html>
// <html>
// <head>
// <meta name="viewport" content="width=device-width, initial-scale=1">
// <style>
// .container {
//   position: relative;
//   width: 100%;
//   max-width: 400px;
// }

// .container img {
// 	width: 50%;
//     height: 50%;
//     transform: translate(-120%, -0%);
//     position: relative;
// }

// .container .btn {
// 	text-align:center;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   background-color: #555;
//   color: white;
//   font-size: 16px;
//   padding: 50px;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   text-align: center;
// }

// .container .btn:hover {
//   background-color: black;
// }

// .p {
//     position: absolute;
//     transform: translate(80%, -30%);
// }
// </style>
// </head>
// <body>

// <h2>Button on Image</h2>
// <p>Add a button to an image:</p>

// <div class="container">
//   <button class="btn">
//     <p class="p">이전</p>
//     <img src="img_snow.jpg" alt="Snow">
//   </button>
// </div>

// </body>
// </html>
