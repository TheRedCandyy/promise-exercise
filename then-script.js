// Place holder for function to call https://api.postcodes.io/postcodes/

const thenSubmitHandler = async (evt, lookupForm) => {
  // Prevent the default form behaviour
  evt.preventDefault();

  // Get the postcode
  const postcode = lookupForm.postcode.value;

  // Call function to return the data
  getDataThen(postcode).then((data) => {
    document.getElementById("response1").innerHTML = JSON.stringify(data);
  });
};

const getDataThen = (postcode) => {
  const fetchPromise = fetch(
    encodeURI(`https://api.postcodes.io/postcodes/${postcode}`)
  );

  return fetchPromise
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status !== 200) {
        throw new Error(`Error`, {
          cause: data,
        });
      }

      const result = {
        status: data.status,
        lat: data.result.latitude,
        long: data.result.longitude,
      };

      return result;
    })
    .catch((err) => {
      return err.cause;
    });
};
