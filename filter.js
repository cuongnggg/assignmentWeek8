const data = [
    {
        id: 1,
        name: "Casio F91W-1 Classic",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UL480_FMwebp_QL65_.jpg",
        price: 17,
        cat: "Causal"
    },
    {
        id: 2,
        name: "SAMSUNG Galaxy Watch 5 Pro",
        img: "https://m.media-amazon.com/images/I/61Sl+xoVHoL._AC_UL480_FMwebp_QL65_.jpg",
        price: 449,
        cat: "Techn"
    },
    {
        id: 3,
        name: "Timex Men's Expedition Scout 40 Watch",
        img: "https://m.media-amazon.com/images/I/91APJ9+qs2L._AC_UL480_FMwebp_QL65_.jpg",
        price: 43,
        cat: "Casual"
    },
    {
        id: 4,
        name: "Michael Kors Men's Slim Runway Stainless Steel Quartz Watch",
        img: "https://m.media-amazon.com/images/I/51lb0UyOhSL._AC_UL480_FMwebp_QL65_.jpg",
        price: 112,
        cat: "Luxury"
    },
    {
        id: 5,
        name: "Amazfit Bip U Pro Smart Watch",
        img: "https://m.media-amazon.com/images/I/617RQK5jKDL._AC_UL480_FMwebp_QL65_.jpg",
        price: 50,
        cat: "Sport"
    },
    {
        id: 6,
        name: "Timex Easy Reader",
        img: "https://m.media-amazon.com/images/I/71UaIg8z3jL._AC_UL480_FMwebp_QL65_.jpg",
        price: 37,
        cat: "Causal"
    },
    {
        id: 7,
        name: "Fitbit Sense 2 Advanced",
        img: "https://m.media-amazon.com/images/I/61c1QC4lF-L._AC_UL480_FMwebp_QL65_.jpg",
        price: 249,
        cat: "Techn"
    },
    {
        id: 8,
        name: "GUESS US Men's Silver-Tone",
        img: "https://m.media-amazon.com/images/I/71gbWHZfmgL._AC_UL480_FMwebp_QL65_.jpg",
        price: 25,
        cat: "Causal"
    },
    {
        id: 9,
        name: "STAR WARS Adult Honor",
        img: "https://m.media-amazon.com/images/I/71fkCQNXGgL._AC_UL480_FMwebp_QL65_.jpg",
        price: 71,
        cat: "Sport"
    },
    {
        id: 10,
        name: "SAMSUNG Galaxy Watch 5 40mm",
        img: "https://m.media-amazon.com/images/I/41SZZ77TFFL._AC_UL480_FMwebp_QL65_.jpg",
        price: 269,
        cat: "Techn"
    },
    {
        id: 11,
        name: "Fossil Men's Townsman",
        img: "https://m.media-amazon.com/images/I/71xa+irvWZL._AC_UL480_FMwebp_QL65_.jpg",
        price: 90,
        cat: "Causal"
    },
    {
        id: 12,
        name: "Citizen Men's Eco-Drive Promaster",
        img: "https://m.media-amazon.com/images/I/81DeN+lEIsS._AC_UL480_QL65_.jpg",
        price: 309,
        cat: "Luxury"
    }
];

const productsContainer = document.querySelector(".products")
const searchInput = document.querySelector(".search")
const categoriesContainer = document.querySelector(".cats")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")

const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map(product =>
        `
        <div class="product">
            <img src=${product.img}
                alt=""
            />
            <span class="name">${product.name}</span>
            <span class="priceText">${product.price}</span>
        </div>
        `
        ).join("")
}

displayProducts(data);

searchInput.addEventListener("keyup",(e)=>{
    const value = e.target.value.toLowerCase();
    if(value){
        displayProducts(data.filter(item => item.name.toLowerCase().indexOf(value) !== -1));
    }else{
        displayProducts(data);
    }
})

const setCategories = () => {
    const allCats = data.map(item => item.cat); /*trả về giá trị cate*/ 
    const categories = [
        "All",
        ...allCats.filter((item,i)=>{ /*... là spread operator */
            return allCats.indexOf(item) === i;
        })
    ];
    //Dùng innerHTML để gán nội dung của categories.map() vào categoriesContainer 
    categoriesContainer.innerHTML = categories.map(cat =>
    `
        <span class="cat" >${cat}</span>
    `        
    ).join("") //Xuất danh sách categories 


    categoriesContainer.addEventListener("click",(e) => {
        const selectedCat = e.target.textContent; //.textContent để hiện ra nội dung object

        selectedCat === "All" ? displayProducts(data) //filter sẽ gọi thuộc trong array
                                : displayProducts(data.filter((item) => item.cat === selectedCat)); //check thuộc tính trong mảng có bằng thuộc tính đã click
    });
};

const setPrices = () => {
    const priceList = data.map(item => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;

    priceRange.addEventListener("input",(e)=>{
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter(item=>item.price <= e.target.value));
    })
};
setCategories();
setPrices();