const uploadImage = (imgData, forename, name) => {
  
  if (!name) {
    name = "";
  }

  if(!forename){
    forename = "";
  }

  fetch("https://www.monstresbprod.be:3501/picture", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageData: imgData,
      name: name,
      forename: forename,
    })
  });
};

export { uploadImage };
