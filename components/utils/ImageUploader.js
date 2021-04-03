const uploadImage = (imgData, name) => {
  if (!name) {
    name = "" + new Date().getTime();
  }

  fetch("uploadImage.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageData: imgData,
      name: name
    })
  });
};

export { uploadImage };
