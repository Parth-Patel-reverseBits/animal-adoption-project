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

const DOMDataFunction = (animalData) => {
    let text = ""; 
    for (let animal of animalData) {
        text += `
        <div class="p-4 lg:w-1/3 animal-card">
            <a  class="group relative block overflow-hidden">
              <img
                src="${animal.image}" 
                alt="${animal.breed}"
                class="animal-image cursor-auto h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
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
                <form class="mt-4 flex gap-4 choose-me-button">
                  <div class="cursor-pointer hover:bg-gray-300 transition duration-400 flex border-2 border-gray-300 p-2 rounded-full items-center w-full justify-center">
                    <img class="" width="25" src="src/images/pet-leg-icon.webp" alt="">
                    <p class="ms-[20px] text-black">Choose Me</p>
                  </div>
                </form>
              </div>
            </a>
        </div>`;
    }

    
    let cardsRow = document.getElementById("cards-row");
    if (cardsRow) {
        cardsRow.innerHTML = text;
    } else {
        console.error("Element with id 'cards-row' not found");
    }

    // Add event listener after the DOM is updated
    // document.querySelectorAll(".choose-me-button").forEach(button => {
    //     button.addEventListener("click", (event) => {
    //         my_modal_1.showModal(); // Trigger the modal
    //         const target = event.currentTarget; // Get clicked button
    //         document.getElementById("pets-name").value = target.dataset.name;
    //         document.getElementById("modal-breed").textContent = target.dataset.breed;
    //         document.getElementById("modal-age").textContent = target.dataset.age;
    //         document.getElementById("modal-description").textContent = target.dataset.description;
    //         document.getElementById("modal-image").src = target.dataset.image;

    //     });
    // });

    // Add event listener to dynamically set modal content
    document.querySelectorAll(".choose-me-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const card = event.currentTarget.closest(".animal-card"); // Find the closest parent card
            const dataExtract = card.textContent.trim().split("\n").map(line => line.trim()).filter(line => line !== "");     
            

            if (card) {
                my_modal_1.showModal(); // Show modal
                document.getElementById("pets-name").value = dataExtract[2];
                document.getElementById("pets-type").value = dataExtract[0];
                document.getElementById("pets-age").value = dataExtract[1];
                document.getElementById("pets-desc").value = dataExtract[3];
                document.getElementById("pet-image").src = card.querySelector(".animal-image").src;

            } else {
                console.error("Animal card not found!");
            }
        });
    });
    
};


