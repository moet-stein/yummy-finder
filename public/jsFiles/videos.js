const myKey = config.MY_KEY;

const fetchCookingVideos = async (value) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/food/videos/search?query=${value}&number=20&apiKey=${myKey}`
    );
    return res.data.videos;
  } catch (e) {
    console.log(e);
  }
};

// RETIRVING TEXTAREA INPUT DATA
const searchTextarea = document.getElementById('icon_prefix2');
const searchBtn = document.getElementById('searchBtn');
let textareaValue = '';

const onlyOneWordMessage = document.getElementById('onlyOneWordMessage');
searchTextarea.addEventListener('input', () => {
  let inputArr = searchTextarea.value.split(' ');
  if (inputArr.length >= 2 && inputArr[1].length > 0) {
    onlyOneWordMessage.classList.remove('hidden');
  } else {
    onlyOneWordMessage.classList.add('hidden');
  }
});

const getTextareaValue = () => {
  textareaValue = searchTextarea.value;
};

searchTextarea.addEventListener('keypress', async (e) => {
  if (e.keyCode == 13) {
    e.preventDefault();
    getTextareaValue();
    const videos = await fetchCookingVideos(textareaValue);
    createVideoCards(videos);
  }
});
searchBtn.addEventListener('click', async () => {
  getTextareaValue();
  const videos = await fetchCookingVideos(textareaValue);
  createVideoCards(videos);
});

//  <div class="col s12">
//    <div class="card horizontal">
//      <div class="card-image">
//        <img src="https://i.ytimg.com/vi/YTZGPCCB2FU/mqdefault.jpg" />
//      </div>
//      <div class="card-stacked">
//        <div class="card-content my-card-content">
//          <div class="center-align">
//            <h3 class="teal-text my-video-title">8 One-Pot Pastas</h3>
//            <div class="card-action my-card-action center-align">
//              <a
//                href="https://www.youtube.com/watch?v=81bn4p8H3Kg"
//                target="_blank"
//                class="material-icons"
//              >
//                <i class="material-icons my-play-icon">play_circle_outline</i>
//              </a>
//              <p id="views" class="teal-text text-darken-3 my-height-50">
//                Views: 1213468
//              </p>
//              <p id="length" class="teal-text text-darken-3 my-height-50">
//                Length: 51
//              </p>

const numberConverter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const secondsConverter = (d) => {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? ' h ' : ' h ') : '';
  var mDisplay = m > 0 ? m + (m == 1 ? ' min ' : ' min ') : '';
  var sDisplay = s > 0 ? s + (s == 1 ? ' s' : ' s') : '';
  return hDisplay + mDisplay + sDisplay;
};

const createVideoCards = (videos) => {
  const videosRow = document.getElementById('videosRow');
  videosRow.innerHTML = '';
  if (videos.length == 0) {
    const noVideoMessage = document.createElement('h4');
    noVideoMessage.classList.add('center-align', 'pink-text', 'text-darken-1');
    noVideoMessage.innerHTML = 'Sorry, no videos found with the word.';
    videosRow.appendChild(noVideoMessage);
  } else {
    videos.forEach((video) => {
      // <div class="col s12">
      const colDiv = document.createElement('div');
      colDiv.classList.add('col', 's12');

      videosRow.appendChild(colDiv);
      // <div class="card horizontal">
      const cardHorizontal = document.createElement('div');
      cardHorizontal.classList.add('card', 'horizontal');
      colDiv.appendChild(cardHorizontal);
      // <div class="card-image">
      const cardImage = document.createElement('div');
      cardImage.classList.add('card-image');
      cardHorizontal.appendChild(cardImage);
      // <img
      //         id="myBtn"
      //         src="https://i.ytimg.com/vi/YTZGPCCB2FU/mqdefault.jpg"
      //       />
      //       <div id="myModal" class="modal">
      //         <iframe
      //           id="iframe"
      //           class="modal-content"
      //           width="420"
      //           height="315"
      //         >
      //         </iframe>
      //       </div>
      // <img src="https://i.ytimg.com/vi/YTZGPCCB2FU/mqdefault.jpg" />
      const videoImage = document.createElement('img');
      let videoThumbnail = video.thumbnail
        ? video.thumbnail
        : '../pics/no-thumbnail.png';
      videoImage.setAttribute('src', videoThumbnail);
      // videoImage.setAttribute('id', `myVideoBtn-${video.youTubeId}`);
      cardImage.appendChild(videoImage);

      // <div class="card-stacked">
      const cardStacked = document.createElement('div');
      cardStacked.classList.add('card-stacked');
      cardHorizontal.appendChild(cardStacked);
      // <div class="card-content my-card-content">
      const cardContent = document.createElement('div');
      cardContent.classList.add('card-content', 'my-card-content');
      cardStacked.appendChild(cardContent);
      //  <div class="center-align">
      const centerAlign = document.createElement('div');
      // centerAlign.classList.add('center-align');
      cardContent.appendChild(centerAlign);
      //<h3 class="teal-text my-video-title">8 One-Pot Pastas</h3>
      const videoTitle = document.createElement('a');
      videoTitle.classList.add('teal-text', 'text-darken-1', 'my-video-title');
      let title =
        video.shortTitle.split(' ').length > 5
          ? video.shortTitle.split(' ').slice(0, 5).join(' ') + '...'
          : video.shortTitle;
      videoTitle.innerHTML = title;
      // videoTitle.setAttribute(
      //   'href',
      //   `https://www.youtube.com/watch?v=${video.youTubeId}`
      // );
      // videoTitle.setAttribute('target', '_blank');
      // videoTitle.addEventListener('click', () => {
      //   modal.style.display = 'block';
      // });
      centerAlign.appendChild(videoTitle);
      //<div class="card-action my-card-action center-align">
      const actionDiv = document.createElement('div');
      actionDiv.classList.add('card-action', 'my-card-action', 'center-align');
      centerAlign.appendChild(actionDiv);
      //<a href="https://www.youtube.com/watch?v=81bn4p8H3Kg" target="_blank" class="material-icons" >
      const playA = document.createElement('a');
      // playA.setAttribute(
      //   'href',
      //   `https://www.youtube.com/watch?v=${video.youTubeId}`
      // );
      // playA.setAttribute('target', '_blank');
      // playA.addEventListener('click', () => {
      //   modal.style.display = 'block';
      // });
      playA.setAttribute('id', `myVideoBtn-${video.youTubeId}`);
      playA.classList.add('material-icons', 'play-icon');
      actionDiv.appendChild(playA);
      //<i class="material-icons my-play-icon">play_circle_outline</i>
      const playIcon = document.createElement('i');
      playIcon.classList.add('material-icons', 'my-play-icon');
      playIcon.innerHTML = 'play_circle_outline';
      playA.appendChild(playIcon);
      //
      const viewLengthDiv = document.createElement('div');
      viewLengthDiv.classList.add('my-view-length');
      actionDiv.appendChild(viewLengthDiv);
      //<p class="teal-text text-darken-3 my-height-50"> Views: 1213468 </p>
      const views = document.createElement('p');
      views.classList.add('teal-text', 'text-darken-3', 'my-height');
      views.innerHTML = `${numberConverter(video.views)} views`;
      viewLengthDiv.appendChild(views);
      // <p class="teal-text text-darken-3 my-height">Length: 51 </p>
      const videoLength = document.createElement('p');
      videoLength.classList.add('teal-text', 'text-darken-3', 'my-height');
      videoLength.innerHTML = `${secondsConverter(video.length)}`;
      viewLengthDiv.appendChild(videoLength);

      //<div id="myModal" class="modal">
      const videoModal = document.createElement('div');
      videoModal.setAttribute('id', `myVideoModal-${video.youTubeId}`);
      videoModal.classList.add('videoModal', 'center-align', 'row');
      colDiv.appendChild(videoModal);
      //<span class="close">&times;</span>
      const closeBtn = document.createElement('i');
      closeBtn.classList.add(
        'material-icons',
        'col',
        's11',
        'right-align',
        'close'
      );
      closeBtn.innerHTML = 'cancel';
      videoModal.appendChild(closeBtn);
      //  <iframe
      //    width="420"
      //    height="315"
      //    src="https://www.youtube.com/embed/81bn4p8H3Kg"
      //  ></iframe>;
      const videoIframe = document.createElement('iframe');
      videoIframe.classList.add('modal-content');
      videoIframe.setAttribute(
        'src',
        `https://www.youtube.com/embed/${video.youTubeId}`
      );
      videoModal.appendChild(videoIframe);

      var btn = document.getElementById(`myVideoBtn-${video.youTubeId}`);

      btn.onclick = function () {
        videoModal.style.display = 'block';
      };

      videoModal.addEventListener('click', (event) => {
        event.target.style.display = 'none';
        var videoIframeSrc = videoIframe.src;
        videoIframe.src = videoIframeSrc;
      });

      closeBtn.addEventListener('click', () => {
        videoModal.style.display = 'none';
      });
    });
  }
};

// MATEIALIZE INIT//
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
