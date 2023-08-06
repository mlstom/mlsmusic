const deezerUrl = 'https://deezerdevs-deezer.p.rapidapi.com';

const deezerOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1ff5d6d96bmsh84f44a820bcf912p1392efjsn3a6edc8ff435',
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
    },
};

export const fetchDeezerData = async (endpoint) => {
    try {
        const response = await fetch(`${deezerUrl}/${endpoint}`, deezerOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching Deezer data:', error);
        return null;
    }
};

export const fetchGenreData = async (genreId) => {
    try {
        const endpoint = `genre/${genreId}`;
        const result = await fetchDeezerData(endpoint);
        return result;
    } catch (error) {
        console.error('Error fetching genre data:', error);
        return null;
    }
};

export const fetchRandomSongs = async (count) => {
    try {
      const response = await fetch(`https://api.deezer.com/chart/0/tracks?limit=${count}`);
      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      console.error('Greška pri dohvatanju nasumičnih pesama: ', error);
      return [];
    }
  };







