const menu = [
  {
    id: 1,
    title: "Buffalo Cauliflower Wraps",
    category: "Dinner",
    price: 9.99,
    img: "./images/buffalo-cauli-wraps.jpg",
    desc: `Healthy cauliflower wraps with a buffalo kick`,
  },
  {
    id: 2,
    title: "Butternut Kale Salad",
    category: "Salad",
    price: 11.99,
    img: "./images/butternut-kale-salad.jpeg",
    desc: `Fresh autumn kale salad`,
  },
  {
    id: 3,
    title: "Chicken Meatball Pitas",
    category: "Lunch",
    price: 13.99,
    img: "./images/chicken-meatball-pitas.jpeg",
    desc: `Juicy grilled chicken meatballs`,
  },
  {
    id: 4,
    title: "Cauliflower Pitas",
    category: "Lunch",
    price: 10.99,
    img: "./images/cauliflower-pitas.jpeg",
    desc: `Healthy vegetarian cauliflower pitas`,
  },
  {
    id: 5,
    title: "Chicken Romano Meatballs",
    category: "Dinner",
    price: 15.99,
    img: "./images/chicken-romano-meatballs.jpeg",
    desc: `Delicious grilled meatballs with romano cheese`,
  },
  {
    id: 6,
    title: "Tomato Penne",
    category: "Lunch",
    price: 10.99,
    img: "./images/tomato-penne.jpeg",
    desc: `Simple healthy tomato pasta`,
  },
  {
    id: 7,
    title: "Turkey Stuffed Peppers",
    category: "Lunch",
    price: 12.99,
    img: "./images/turkey-stuffed-peppers.jpeg",
    desc: `Light, healthy turkey-stuffed peppers`,
  },
  {
    id: 8,
    title: "Red Burrata Pasta",
    category: "Lunch",
    price: 10.99,
    img: "./images/tomato-burrata-pasta.jpeg",
    desc: `Classic tomato and burrata pasta`,
  },
  {
    id: 9,
    title: "Shrimp Kale Salad",
    category: "Salad",
    price: 14.99,
    img: "./images/shrimp-kale-caesar.jpeg",
    desc: `Fresh kale salad with grilled shrimp bites`,
  },
  {
    id: 10,
    title: "Maple BBQ Salmon",
    category: "Dinner",
    price: 16.99,
    img: "./images/maple-bbq-salmon.jpeg",
    desc: `Hickory maples salmon cooked to perfection`,
  },
  {
    id: 11,
    title: "Hot Ginger Salmon Salad",
    category: "Salad",
    price: 16.99,
    img: "./images/hot-ginger-salmon-salad.jpeg",
    desc: `Spicy ginger-glazed Atlantic salmon salad`,
  },
  {
    id: 12,
    title: "Garlic Butter Scallops",
    category: "Dinner",
    price: 30.99,
    img: "./images/garlic-butter-scallops.jpeg",
    desc: `Buttery grilled scallops with a hint of garlic and herbs`,
  },
];

const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

// load items 
window.addEventListener("DOMContentLoaded", function() {
  displayMenuItems(menu);
  displayMenuButtons();
});


function displayMenuItems(menuItems){
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);

    return `<article class="menu-item">
    <img src=${item.img} class="photo" alt=${item.title}>
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">${item.price}</h4>
      </header>
      <p class="item-text">
        ${item.desc}
      </p>
    </div>
  </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
} 

function displayMenuButtons() {
  const categories = menu.reduce(function (values, item) {
    if(!values.includes(item.category)) {
      values.push(item.category);
    }
    return values;
  },
  ['all']
  );
const categoryBtns = categories.map(function(category) {
   return `<button class="filter-btn" type="button"
    data-id=${category}>
            ${category}
          </button>`
}).join("");  
container.innerHTML = categoryBtns;
const filterBtns = container.querySelectorAll(".filter-btn");
// filter items 
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function(e) {

    const category = e.currentTarget.dataset.id;
    const menuCategory = menu.filter(function (menuItem) {
      // console.log(menuItems.category);
      if(menuItem.category === category){
        return menuItem;
      }
    });
    //console.log(menuCategory);
    if(category === "all") {
      displayMenuItems(menu);
    }else {
      displayMenuItems(menuCategory);
    }
  });
});
}