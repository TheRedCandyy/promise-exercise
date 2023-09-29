// Place holder for function to call https://api.postcodes.io/postcodes/

const awaitSubmitHandler = async (evt, lookupForm) => {
  // Prevent the default form behaviour
  evt.preventDefault();

  // Get the postcode
  const postcode = lookupForm.postcode.value;

  // Call function to return the data
  const data = await getData(postcode);

  // Show the response
  document.getElementById("response2").innerHTML = JSON.stringify(data);
};

const getData = async (postcode) => {
  try {
    const res = await fetch(
      encodeURI(`https://api.postcodes.io/postcodes/${postcode}`)
    );
    const data = await res.json();

    if (data.status !== 200)
      throw new Error(`Error`, {
        cause: data,
      });

    const result = {
      status: data.status,
      lat: data.result.latitude,
      long: data.result.longitude,
    };

    return result;
  } catch (err) {
    return err.cause;
  }
};
