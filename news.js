import 'dotenv/config';

document.addEventListener("DOMContentLoaded", () => {
  const divHeaderDate = document.getElementById("div-todays-date");
  const divUSNews = document.getElementById("users-country-news");

  const getTodaysDate = () => new Date().toLocaleDateString();
  divHeaderDate.innerText = getTodaysDate();

  const asyncGetUSNews = () => {
    const req = new XMLHttpRequest();
    
    req.open("GET", "https://newsdata.io/api/1/news?country=us&size=1", true);

    req.setRequestHeader("X-ACCESS-KEY", process.env.apiKey);
    req.setRequestHeader("Access-Control-Allow-Origin", "*");

    req.onreadystatechange = () => {
      const { readyState, status, response } = req;
      if (readyState === XMLHttpRequest.DONE) {
        if (status === 0 || status >= 200 && status < 400) {
          // Request has been completed.
          setArticleDiv(response.json(), divUSNews);
        } else {
          // Error Handling.
        }
      }
    }
    req.send();
  
  }
  asyncGetUSNews();


  const getGlobalNews = () => {
  }

  const getLocalNews = (zipcode) => {
  }
});

const setArticleDiv = (response, div) => {
  const { title, link, pubDate, image_url, creator, description } = response.results;
  const divHeader = document.createElement("div");
  const headerArticle = document.createElement("h2");
  headerArticle.innerText = title;

  const divDate = document.createElement("div");
  divDate.innerText = pubDate.splice(0, 10);

  divHeader.append(headerArticle, divDate);

  const imgImageUrl = document.createElement("img");
  imgImageUrl.src = image_url;

  const divDescription = document.createElement("div");
  divDescription.innerText = description;

  const divLink = document.createElement("a");
  divLink.href = link;
  divLink.setAttribute("target", "_blank");

  div.append(divHeader, imgImageUrl, divDescription, divLink);
}