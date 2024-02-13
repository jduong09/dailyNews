document.addEventListener("DOMContentLoaded", () => {
  const divHeaderDate = document.getElementById("div-todays-date");
  const divUSNews = document.getElementById("users-country-news");
  const divGlobalNews = document.getElementById("users-global-news");

  const getTodaysDate = () => new Date().toLocaleDateString();
  divHeaderDate.innerText = getTodaysDate();

  // Argument location = country, global, zipcode
  const asyncGetNews = (location) => {
    const req = new XMLHttpRequest();

    if (location === 'global') {
      req.open("GET", "/news/global", true);
    } else {
      req.open("GET", "/news/us", true);
    }
    
    req.setRequestHeader('Access-Control-Allow-Origin', '*');
    req.responseType = "json";

    req.onreadystatechange = () => {
      const { readyState, status, response } = req;
      if (readyState === XMLHttpRequest.DONE) {
        if (status === 0 || status >= 200 && status < 400) {
          if (location === 'global') {
            setArticleDiv(response, divGlobalNews);
          } else {
            setArticleDiv(response, divUSNews);
          }
        } else {
          // Error Handling.
        }
      }
    }
    req.send();
  }
  asyncGetNews('us');
  asyncGetNews('global');
});

const setArticleDiv = (response, div) => {
  const { title, link, pubDate, image_url, description } = response.results[0];
  const divHeader = document.createElement("div");
  divHeader.classList.add('article-header')
  const headerArticle = document.createElement("h2");
  headerArticle.innerText = title;

  const divDate = document.createElement("div");
  divDate.innerText = pubDate.slice(0, 10);

  divHeader.append(headerArticle, divDate);

  const imgImageUrl = document.createElement("img");
  imgImageUrl.src = image_url;

  const divDescription = document.createElement("div");
  divDescription.innerText = description;

  const divLink = document.createElement("a");
  divLink.href = link;
  divLink.setAttribute("target", "_blank");
  divLink.innerText = "Link to article ->";

  div.append(divHeader, imgImageUrl, divDescription, divLink);
}