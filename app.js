const userID = xxxxxx // id старого аккаунта
const userAuthorization = "xxxxxxxxxxxx" // код авторизации брать с нового аккаунта, можно взять из fetch запроса
const sessionKey = "r7jdihzyjnsb2y7qoafvi4" // код сессии брать с нового аккаунта, тоже брать из fetch запроса

let arr = new Array();
let saveIndex = 0
let numberPage = 1
let arrayLength = 1
do {
  let getBookmarksUrl = `https://api.remanga.org/api/users/${userID}/bookmarks/?type=0&count=24&page=${numberPage}`
  let getBookmarksOptions = {
    "headers": {
      "accept": "*/*",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,be;q=0.6",
      "authorization": `bearer ${userAuthorization}`,
      "cache-control": "no-cache",
      "content-type": "application/json",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
      "sec-ch-ua-mobile": "?1",
      "sec-ch-ua-platform": "\"Android\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin"
    },
    "referrer": "https://api.remanga.org/api/logging/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }
  
  let responseGet = await fetch(getBookmarksUrl, getBookmarksOptions)
  let objBookmarks = await responseGet.json()
  console.log(objBookmarks)


  objBookmarks.content.forEach(element => {
  arr[saveIndex] = element.title.id
  saveIndex++
  });
  arrayLengthContent = objBookmarks.content.length
  numberPage++
} while (!(arrayLengthContent == 0))

arr.forEach((element,index) => {
  setTimeout(function(){
    let postBookmarksUrl = "https://api.remanga.org/api/users/bookmarks/"
    let postBookmarksOptions = {
      "headers": {
        "accept": "*/*",
        "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,be;q=0.6",
        "authorization": `bearer ${userAuthorization}`,
        "cache-control": "no-cache",
        "content-type": "application/json",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
      },
      "referrer": "https://remanga.org/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"title\":${element},\"type\":0,\"mangaId\":${element},\"session_key\":\"${sessionKey}\"}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "include"
    }

    fetch(postBookmarksUrl, postBookmarksOptions);
    console.log(index)
  }, index * 1000);
});