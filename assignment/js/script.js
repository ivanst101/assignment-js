// Taking API GET request from Yelp Api file
// All data from that link will be stored in data argument
sessionStorage.setItem(
  "MyToken",
  "5kC2nM8jOPxJEA4cClFPLaUhZ8qdW5Gk4d7Iof3ngAti862NHmOVX_j11HSOS4s-OVaGvfHh41Au0ADe98x6qftJ00x94rSS0yhDuLmig4H-4-EGwcc7H_1vZwPtYnYx"
);
let token = sessionStorage.getItem("MyToken");
fetch(
  " https://api.yelp.com/v3/businesses/search?location=San Jose, CA95127&term=restaurants",
  {
    method: "get",
    headers: {
      Accept: "application/json",
      mode: "cors",
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((data) => {
    return data.json();
    // Passing object data.json() to below completedata
  })
  .then((completedata) => {
    const businesses = Object.values(completedata);
    const first = businesses[0];
    // Creating empty variable
    let data1 = "";
    // values has all data, one by one data object
    first.map((values) => {
      const val = Object.values(values);
      const priceTag = val[11];
      if (typeof priceTag == "object") values.price = "Price";
      else {
        values.price;
      }

      // Getting value of object
      const star = Object.values(values);
      // In the array of objects, store the item on index 8 into a variable review
      const review = star[8];

      // Creating function to check if value rate is 4, 5, or 4.5
      function check(rate) {
        if (!rate) {
          console.log("Something went wrong");
        } else if (rate == 4) {
          values.rating = `
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>`;
        } else if (rate == 5) {
          values.rating = `
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>`;
        } else if (rate == 4.5) {
          values.rating = `
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star-half-o"></span>`;
        } else {
          values.rating;
        }
      }
      check(values.rating);
      const keysOfCategories = Object.values(values.categories[0]);
      let arrayOfCategories = keysOfCategories[0];
      // Increacing number of data, dependindg on the number of data objects
      data1 += `
      <div class="content" data-category="${arrayOfCategories}">
      <a href="${values.url}">
      <img src="${values.image_url}" />
      <h3 class="truncate">${values.name}</h3>
      <div id="price">${values.rating} <span id="row">| ${values.price}</span></div>
      <button class="buy-1">VIEW</button>
      </a>
      </div>
      `;
      // Inside this variable is our div (id = gallery) from file index.html
      document.getElementById("gallery").innerHTML = data1;

      // Creating categories buttons
      const brown = document.querySelector(".category");
      let btn = document.createElement("button");
      brown.appendChild(btn);
      btn.innerHTML = arrayOfCategories;
    });
  })
  .catch((err) => {
    console.log(err);
  });

//----------->
// Loading function
//----------->
let pom;

function myFunc() {
  pom = setTimeout(showPage, 1000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
