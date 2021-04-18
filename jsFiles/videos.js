// https://www.youtube.com/results?search_query=81bn4p8H3Kg

const fetchCookingVideos = async () => {
  try {
    const res = await axios.get(
      'https://api.spoonacular.com/food/videos/search?query=pasta&number=10&apiKey=' +
        myKey
    );
    console.log(res.data);
    // return res.data.results;
  } catch (e) {
    console.log(e);
  }
};

var options = {
  edge: 'left',
};

// SIDE NAV
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, options);
});
// PARALLAX
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.parallax');
  const instances = M.Parallax.init(elems, options);
});
