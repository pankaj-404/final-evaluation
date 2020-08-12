let root = document.getElementById("root");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let page = 1;
let totalPage = 1;

document.querySelector("footer").addEventListener("click", (e) => {
  if (e.target.id == "prev") {
    page = page == 1 ? page : page - 1;
  }
  if (e.target.id == "next") {
    page = page == totalPage ? page : page + 1;
  }
  debounce(getData, 500)();
});

function card(data) {
  root.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = "<h2>No Results found</h2>";
  data.length == 0 && root.append(div);
  data.map((ele) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.innerHTML = `<img src=${ele.src.small} alt="Avatar">
                            <div class="container">
                            <h4>
                                <b>
                                    Photographer : <a href="${ele.photographer_url}" > ${ele.photographer}</a>
                                </b>
                            </h4>`;
    root.append(card);
  });
}

function debounce(func, delay) {
  let debounce;
  return function () {
    clearTimeout(debounce);
    debounce = setTimeout(() => func(), delay);
  };
}

let searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("keyup", () => {
  page = 1;
  debounce(getData, 2000)();
});

function getData() {
  let val = searchInput.value || "nature";
  if (val) {
    fetch(
      `https://api.pexels.com/v1/search?query=${val}&page=${page}&per_page=10`,
      {
        headers: {
          Authorization:
            "563492ad6f91700001000001d685aa2c690243a9882e96f420375055",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        totalPage = Math.ceil(res.total_results / 10);

        card(res.photos);
      })
      .catch((err) => alert(err));
  }
}

debounce(getData, 1000)();
searchInput.value = "";
