export interface ImageDto {
  id: number;
  url: string;
}
export interface characterRequestDto {
  //Character에 저장하는 Dto
  id: string;
  url: string;
}

export interface whiteFaceImageListsDto {
  //전체 whiteFaceImage리스트 Dto
  whitelistFaceId: string;
  whitelistFaceName: string;
  whitelistFaceImages: whiteFaceImageDto[];
}

export interface whiteFaceImageDto {
  //특정 whiteFaceImage내부에 있는 하나의 이미지 Dto
  id: string;
  url: string;
}

export interface saveImageFileDto {
  //이미지 파일 저장에 대한 Dto
  url: string;
  file: File;
}

export interface storeWhiteListDto {
  //zustand에서 관리하는 whiteList 전역변수 정보를 Dto
  count: number;
  id: string;
  name: string;
  url: string;
}

export interface storeVideoDto {
  //zustand에서 관리하는 whiteList 전역변수 정보를 Dto
  count: number;
  id: string;
  name: string;
  url: string;
}
