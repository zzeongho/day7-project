const QUOTES = "quotes";
const API_KEY = "640251bfa7fdd2d4b734c24065abd823";
function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify(["도지 = $1", "화성 가즈아~~", "Doge to the moon"])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:red;">${newQuotesInput.value}</span>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = "";
}

// const a = {
//   question: "질문입니다.",
// };

// const b = {
//   question: question,
// };

// const c = {
//   question,
// };

let isLoading = false;

const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    onClickSearch();
  }
});

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");
  const dogeGo = document.querySelector(".dogeGo");
  const dogeDollar = document.querySelector(".dogeDollar");
  dogeGo.style.display = "block";
  setTimeout(() => {
    dogeGo.style.display = "none";
    dogeDollar.style.display = "block";
  }, 4100);
  if (!searchInput.value) return;
  if (isLoading) return;

  //여기까지옴 == isloading이 false라는것

  isLoading = true;
  const question = searchInput.value;

  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요.";

  // 프론트엔드에서 백엔드
  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}

const weatherIcon = document.querySelector(".weatherIcon");
const weatherTemp = document.querySelector(".weatherTemp");
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${37.54880214518}&lon=${126.83881786327252}&units=metric&appid=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        weatherTemp.innerText =
          data.name + "," + parseInt(data.main.temp) + "'C";
        weatherIcon.src = `moon.png`;
      });
  },
  () => alert("Not allowed")
);
