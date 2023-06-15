const getData = async (path = "", params?: URLSearchParams) => {
  const url = `${process.env.API_URL}${path}${
    params ? "?" + params.toString() : ""
  }`;
  const requestInfo = {
    headers: {
      Authorization: "Bearer " + process.env.API_TOKEN || "",
    },
  };
  const res = await fetch(url, requestInfo);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default getData;
