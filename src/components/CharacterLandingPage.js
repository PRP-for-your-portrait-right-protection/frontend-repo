import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterList from "components/CharacterList";
import CharacterBlock from "components/CharacterBlock";
const CharacterLandingPage = () => {
  const [characters, setCharacters] = useState([]);

  // 랜딩 페이지에서 서버에 있는 캐릭터 가져오기 위한 axios 통신 보내기
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(
          "https://d6c3440f-db41-4381-a647-a6d65445130a.mock.pstmn.io//mock-api/character"
        );
        console.log(res);
        setCharacters(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCharacter();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 mx-96">
      {characters.file &&
        characters.file.map((item) => {
          return (
            <>
              <img
                style={{ width: "100%", height: "100%" }}
                alt="character"
                src={item}
              />
            </>
          );
        })}
    </div>
  );
};

export default CharacterLandingPage;
