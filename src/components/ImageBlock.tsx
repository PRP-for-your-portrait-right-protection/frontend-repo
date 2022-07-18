// import React, { useState } from "react";
// import "./ImageBlock.css";
// /**
//  * @name : Teawon
//  * @component :ImgBlock - 특정 하나의 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
//  * @create-data: 2022-07-15
//  */

// interface ImageButtonProps {
//   deleteFileImage: any;
//   object: any;
// }

// function ImgBlock({ deleteFileImage, object }: ImageButtonProps) {
//   return (
//     <div className="col-span-1 ">
//       <img className="picture" alt="sample" src={object.url} />
//       <button onClick={() => deleteFileImage(object.id)}>
//         <img
//           className="btnDeleteOther"
//           alt="deleteBtn"
//           src="images/deleteButton.png"
//         />
//       </button>
//     </div>
//   );
// }

// export default ImgBlock;
import React, { useState } from "react";
/**
 * @name : Teawon
 * @component :ImgBlock - 특정 하나의 이미지와 삭제버튼 (X) 을 묶어주는 컴포넌트
 * @create-data: 2022-07-15
 */

interface ImageButtonProps {
  deleteFileImage: any;
  object: any;
}

function ImgBlock({ deleteFileImage, object }: ImageButtonProps) {
  return (
    <div className="col-span-1 flex justify-center">
      <img className="absolute h-36 w-36 z-2" alt="sample" src={object.url} />
      <button onClick={() => deleteFileImage(object.id)}>
        <img
          className="relative w-8 h-8 z-1 -top-14 -left-14"
          alt="deleteBtn"
          src="images/deleteButton.png"
        />
      </button>
    </div>
  );
}

export default ImgBlock;
