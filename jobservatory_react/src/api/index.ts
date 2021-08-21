export const fetchTechnologiesData = async () => {
  try {
    const techsPromise = await fetch(
      "http://localhost:5000/api/v1/technologies"
    );
    const techs = await techsPromise.json();
    return techs.data;
  } catch (error) {
    return [];
  }
};

export const fetchCountriesData = async () => {
  try {
    const techPormiseByCountry = await fetch(
      "http://localhost:5000/api/v1/technologies/countries"
    );
    const techsByCountries = await techPormiseByCountry.json();
    return techsByCountries.data;
  } catch (error) {
    return [];
  }
};

export const fetchQuestionsData = async () => {
  try {
    const techsPromiseByQuestions = await fetch(
      "http://localhost:5000/api/v1/questions"
    );
    const techsByQuestions = await techsPromiseByQuestions.json();
    return techsByQuestions.data;
  } catch (error) {
    return [];
  }
};
