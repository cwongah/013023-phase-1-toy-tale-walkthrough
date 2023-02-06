let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//get toy collection div that we want to append to
const toyCollectionDiv = document.querySelector("#toy-collection")

//Part 1 fetching data
//to run the HTML content first
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  //format it in some sort of readable format like JSON
  //this next line will always be used in fetch
  .then((res) => res.json())

  //Part 2
  .then((data) => {
    data.forEach(toy => {
     addNewToy(toy)
    });
  })
})

//Adding toy to list
//Adding event listener to the form
const form = document.querySelector(".add-toy-form")
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const newToyName = document.getElementsByClassName("input-text")[0].value
  const newToyImage = document.getElementsByClassName("input-text")[1].value
  console.log(newToyName, newToyImage)
  const newToy = {
    name: newToyName,
    image: newToyImage,
    likes: 0
  }

  //POST request
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newToy)
  })
  //for pessimistic rendering
  .then(res => res.json())
  .then(newToyData => addNewToy(newToyData))

  //for optimistic rendering
  //addNewToy(newToy)
})

function addNewToy(toy){
 //create a new div that holds the toy info
 const toyDiv = document.createElement("div")
 toyDiv.className = "card"
 //add info from JSON into toyDiv
 //create elements needed inside of divToy
 const toyName = document.createElement("h2")
 const toyImg = document.createElement("img")
 toyImg.className = "toy-avatar"
 const toyLikes = document.createElement("p")
 const toyButton = document.createElement("button")
 toyButton.className = "like-btn"
 toyButton.id = toy.id
 //set attributes for variables
 toyName.textContent = toy.name
 toyImg.src = toy.image
 toyLikes.textContent = `${toy.likes} Likes`
 //append the things
 toyDiv.append(toyName, toyImg, toyLikes, toyButton)
 toyCollectionDiv.appendChild(toyDiv)
}