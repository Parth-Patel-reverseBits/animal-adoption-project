import animalsData from "./animalsData";


const fetchAnimalImages = async (breed) => {
    const ACCESS_KEY = "FTV4NSSHX-luWC-LCwsiOaFPerCILNhJVxh9ZgN8cQI";
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${breed}&client_id=${ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    return data.results.length > 0 ? data.results[0].urls.small : "";
  };
  
  const updateAnimalsWithImages = async () => {
    for (let animal of animalsData) {
        // animal.image = "new image"
        animal.image = await fetchAnimalImages(animal.breed);
        // console.log(animal)
    }
    DOMDataFunction(animalsData)
    // console.log(animals); // Now includes image URLs
};
  
updateAnimalsWithImages()


// Text varibale for storing generated DOM in string
var text = ""

// looping threw the array from animalsData.js
// let counter = 0
const DOMDataFunction = (animalData) => {
    for(let animal of animalData) {
        // counter++
        // console.log(text)
        text += `
        <div class="p-4 lg:w-1/3">
                <a href="#" class="group relative block overflow-hidden">
                
                  <img
                    src="https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop"
                    src=${animal.image}
                    alt=""
                    class="cursor-auto h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
                  />
                
                  <div class="relative border border-gray-100 bg-white p-6 cursor-auto">
                    <div class="flex justify-between">
                      <span id="breed-name" class="bg-gray-500 py-1 px-2 text-white rounded">${animal.breed}</span>
                      <span id="age" class="text-gray-700">${animal.age}</span>
                    </div>
                
                    <h3 id="animal-name" class="mt-1.5 text-lg font-medium text-gray-900">${animal.name}</h3>
                
                    <p id="animal-description" class="mt-1.5 line-clamp-3 text-gray-700">
                      ${animal.description}
                    </p>
                
                    <form class="mt-4 flex gap-4">
                      <div class="cursor-pointer hover:bg-gray-300 transition duration-400 flex border-2 border-gray-300 p-2 rounded-full items-center w-full justify-center">
                        <img class="" width="25" src="src/images/pet-leg-icon.webp" alt="">
                        <p class="ms-[20px] text-black">Choose Me</p>
                      </div>
                    </form>
                  </div>
                  </a>
                  </div>`
    }
}

console.log("This is me:",text)

// getting cards row 
let cardsRow = document.getElementById("cards-row")
// cardsRow.innerHTML = text