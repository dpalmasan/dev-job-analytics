export const fetchTechnologiesData = async () => {
  try {
    const techsPromise = await fetch(
      'http://localhost:5000/api/v1/technologies',
    );
    console.log(`PASO 1 ADENTRO`, techsPromise);
    if (!techsPromise.ok) {
      throw new Error('Server error');
    }
    const techs = await techsPromise.json();
    console.log(`PASO 2 techs`, techs);

    return techs;
  } catch (error) {
    console.log(`PASO 3 ERROR ADENTRO`, { ok: false, error });
    return { ok: false, error };
  }
};

export const fetchCountriesData = async () => {
  try {
    const techPormiseByCountry = await fetch(
      'http://localhost:5000/api/v1/technologies/countries',
    );
    if (!techPormiseByCountry.ok) {
      throw new Error('Server error');
    }
    const techsByCountries = await techPormiseByCountry.json();
    return techsByCountries;
  } catch (error) {
    console.log(`PASO 3 ERROR ADENTRO`, { ok: false, error });
    return { ok: false, error };
  }
};

export const fetchQuestionsData = async () => {
  try {
    const techsPromiseByQuestions = await fetch(
      'http://localhost:5000/api/v1/questions',
    );
    if (!techsPromiseByQuestions.ok) {
      throw new Error('Server error');
    }
    const techsByQuestions = await techsPromiseByQuestions.json();
    return techsByQuestions;
  } catch (error) {
    console.log(`PASO 3 ERROR ADENTRO`, { ok: false, error });
    return { ok: false, error };
  }
};

export const fetchTechnologyByNameData = async (searchValue: string) => {
  try {
    const fetchedTech = await fetch(
      `http://localhost:5000/api/v1/technologies/${searchValue}`,
    );
    if (!fetchedTech.ok) {
      throw new Error('Server error');
    }
    const response = await fetchedTech.json();
    return response;
  } catch (error) {
    //TODO: Raise warning that element doesn't exist
    console.log(`PASO 3 ERROR ADENTRO`, { ok: false, error });
    return { ok: false, error };
  }
};
