import { Creative } from "../types/types";

export const getCreatives = async (pageNumber: number) => {
  const response = await fetch(
    `http://localhost:3001/creatives?_limit=5&_page=${pageNumber}`
  );

  return response.json();
};

export const getCreativeById = async (id: string) => {
  const response = await fetch(`http://localhost:3001/creatives/${id}`);

  return response.json();
};

export const updateCreative = async (data: Creative) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    `http://localhost:3001/creatives/${data.id}`,
    requestOptions
  );

  return response.json();
};

export const deleteCreative = async (id: string) => {
  const response = await fetch(`http://localhost:3001/creatives/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
