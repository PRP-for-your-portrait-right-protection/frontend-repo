// import { element } from "prop-types";
// import React, { useState } from "react";
// import CharacterList from "../components/CharacterList";
// //import axios from "axios";

// /**
//  * @name : Teawon
//  * @component :CharacterListBlock - 각각의 CharacterList컴포넌트를 추가하고 전체 데이터를 관리하는 컴포넌트
//  * @create-data: 2022-07-20
//  */

// function CharacterListBlock() {
//   const [count, setCount] = useState<number>(1); //전체 List개수
//   const [totalList, setTotalList]: [any, any] = useState({
//     //최종적으로 backend로 보내질 데이터 리스트 집합
//     file: [
//       {
//         name: "you",
//         pictures: [],
//       },
//     ],
//   });

//   /**
//    * @name : Teawon
//    * @function :addCharacterList - 전체 CharacterList의 개수를 늘리는 함수(컴포넌트 수 증가), 처음 이름은 other{count}로 지정하여 컴포넌트를 생성함
//    * @create-data: 2022-07-20
//    */

//   const makeFormData = async () => {
//     const formData = new FormData();
//     const characterList = totalList.file;

//     totalList.file.forEach((element) => {
//       formData.append("name", element.name);
//       element.pictures.forEach((list) => {
//         formData.append("file", list.file);
//       });
//     });

//     for (let key of formData.keys()) {
//       console.log("FormData의 key를 확인합니다.");
//       console.log(key);
//     }

//     // FormData의 value 확인
//     for (let value of formData.values()) {
//       console.log("FormData의 Values를 확인합니다.");
//       console.log(value);
//     }
//   };

//   const addCharacterList = () => {
//     setTotalList({
//       file: [
//         ...totalList.file,
//         { name: "other".concat(String(count)), pictures: [] },
//       ],
//     });
//     setCount((count) => count + 1);
//     console.log(totalList);
//   };

//   /**
//    * @name : Teawon
//    * @function :changeFuc - 특정 이미지추가, 이미지 삭제 및 전체CharacterList의 삭제 함수
//    * 부모컴포넌트인 CharacterListBlock의 상태값 갱신 함수를 통해 전체 상태값의 변화를 관리합니다.
//    * @param :
//    *  object(any) - 삭제id 값 혹은 추가될 이미지 리스트 등의 Data객체
//    *  name - 해당 CharacterList를 식별하는 name값
//    *  type - 이미지 삭체, 이미지리스트삭제, 추가 등 실행할 함수의 타입
//    * @create-data: 2022-07-20
//    */

//   const changeFuc = (object, name, type) => {
//     let findIndex = totalList.file.findIndex((element) => element.name == name);
//     let copyArray = { ...totalList };

//     switch (type) {
//       case "add":
//         copyArray.file[findIndex].pictures = [
//           ...copyArray.file[findIndex].pictures,
//           object,
//         ];
//         setTotalList(copyArray);
//         break;
//       case "deleteImg":
//         copyArray.file[findIndex].pictures = copyArray.file[
//           findIndex
//         ].pictures.filter((img) => img.id !== object);
//         setTotalList(copyArray);
//         break;
//     }
//   };

//   return (
//     <>
//       {totalList.file && //map을 통해 각 imgList를 출력
//         totalList.file.map((characterList) => (
//           <CharacterList
//             key={characterList.name}
//             object={characterList}
//             changeFuc={changeFuc}
//           />
//         ))}
//     </>
//   );
// }
// export default CharacterListBlock;
