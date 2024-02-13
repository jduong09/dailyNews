export const setArticleDiv = (response, div) => {
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