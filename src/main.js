import animalsData from "./animalsData";

// Fetch images from Unsplash
const fetchAnimalImages = async (breed) => {
    const ACCESS_KEY = "FTV4NSSHX-luWC-LCwsiOaFPerCILNhJVxh9ZgN8cQI";
    const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${breed}&client_id=${ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    return data.results.length > 0 ? data.results[0].urls.small : "";
};

// Load data from localStorage
const loadDataFromLocalStorage = () => {
    const storedAnimals = localStorage.getItem("animalsData");
    return storedAnimals ? JSON.parse(storedAnimals) : animalsData;
};

const loadAdoptedAnimals = () => {
    const storedAdopted = localStorage.getItem("adoptedAnimals");
    return storedAdopted ? JSON.parse(storedAdopted) : [];
};

// Save updated available pets list
const saveAnimalsToLocalStorage = (data) => {
    localStorage.setItem("animalsData", JSON.stringify(data));
};

// Save adopted pets to localStorage
const saveAdoptedToLocalStorage = (data) => {
    localStorage.setItem("adoptedAnimals", JSON.stringify(data));
};

// Update animals with images and save to localStorage
const updateAnimalsWithImages = async () => {
    let animals = loadDataFromLocalStorage();

    for (let animal of animals) {
        if (!animal.image) {
            animal.image = await fetchAnimalImages(animal.breed);
        }
    }

    saveAnimalsToLocalStorage(animals);
    renderAnimals();
};

// Render available pets
const renderAnimals = () => {
    let text = "";
    let animalData = loadDataFromLocalStorage();

    for (let animal of animalData) {
        text += `
        <div class="p-4 lg:w-1/3 animal-card" data-name="${animal.name}">
            <a class="group relative block overflow-hidden rounded-3xl">
              <img
                src="${animal.image}" 
                alt="${animal.breed}"
                class="animal-image cursor-auto h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />
              <div class="relative border border-gray-100 bg-white p-6 cursor-auto">
                <div class="flex justify-between">
                  <span class="bg-gray-500 py-1 px-2 text-white rounded">${animal.breed}</span>
                  <span class="text-gray-700">${animal.age}</span>
                </div>
                <h3 class="mt-1.5 text-lg font-medium text-gray-900">${animal.name}</h3>
                <p class="mt-1.5 line-clamp-3 text-gray-700">
                  ${animal.description}
                </p>
                <form class="mt-4 flex gap-4 choose-me-button">
                  <div class="cursor-pointer hover:bg-gray-300 transition duration-400 flex border-2 border-gray-300 p-2 rounded-full items-center w-full justify-center">
                    <img width="25" src="src/images/pet-leg-icon.webp" alt="">
                    <p class="ms-[20px] text-black">Choose Me</p>
                  </div>
                </form>
              </div>
            </a>
        </div>`;
    }

    document.getElementById("cards-row").innerHTML = text;
    attachEventListeners();
};

// Render adopted pets
const renderAdoptedAnimals = () => {
    let adoptedData = loadAdoptedAnimals();
    let text = "";

    for (let animal of adoptedData) {
        text += `
        <div class="p-4 lg:w-1/3 animal-card" data-name="${animal.name}">
            <a class="group relative block overflow-hidden rounded-3xl">
              <img
                src="${animal.image}" 
                alt="${animal.breed}"
                class="animal-image cursor-auto h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />
              <div class="relative border border-gray-100 bg-white p-6 cursor-auto">
                <div class="flex justify-between">
                  <span class="bg-gray-500 py-1 px-2 text-white rounded">${animal.breed}</span>
                  <span class="text-gray-700">${animal.age}</span>
                </div>
                <h3 class="mt-1.5 text-lg font-medium text-gray-900">${animal.name}</h3>
                <p class="mt-1.5 line-clamp-3 text-gray-700">
                  ${animal.description}
                </p>
              </div>
            </a>
        </div>`;
    }

    document.getElementById("data-section").innerHTML = text;
};

// Attach event listeners
const attachEventListeners = () => {
    document.querySelectorAll(".choose-me-button").forEach(button => {
        button.addEventListener("click", (event) => {
            const card = event.currentTarget.closest(".animal-card");
            const name = card.querySelector("h3").textContent;
            const dataExtract = card.textContent.trim().split("\n").map(line => line.trim()).filter(line => line !== "");  
            my_modal_1.showModal();

            document.getElementById("pet-heading").innerHTML = dataExtract[2];
            document.getElementById("pet-subHeading").innerHTML = `Fill out the form below to adopt ${dataExtract[2]}`;
            document.getElementById("pets-name").value = dataExtract[2];
            document.getElementById("pets-age").value = dataExtract[1];
            document.getElementById("pets-desc").value = dataExtract[3];
            document.getElementById("pets-type").value = dataExtract[0];
            document.getElementById("pet-image").src = card.querySelector(".animal-image").src;
        });
    });
};

// Handle adoption
document.getElementById("submit-btn").addEventListener("click", () => {
    const username = document.getElementById("username");
    const emailAddress = document.getElementById("emailAddress");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");

    const inputs = [username, emailAddress, phone, address];
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            isValid = false;
            // input.classList.add("border-red-500");
            input.className = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-red-500 rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        } else {
            input.className = "block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        }
    });

    if (isValid) {
        document.getElementById("success-msg").classList.remove("hidden");

        const petName = document.getElementById("pets-name").value;
        const adoptedCard = document.querySelector(`.animal-card[data-name="${petName}"]`);
        
        if (adoptedCard) {
            let animals = loadDataFromLocalStorage();
            let adoptedAnimals = loadAdoptedAnimals();
            let adoptedPet = animals.find(animal => animal.name === petName);

            if (adoptedPet) {
                adoptedAnimals.push(adoptedPet);
                saveAdoptedToLocalStorage(adoptedAnimals);
                animals = animals.filter(animal => animal.name !== petName);
                saveAnimalsToLocalStorage(animals);
            }

            document.getElementById("data-section").appendChild(adoptedCard);
            adoptedCard.querySelector(".choose-me-button").remove();
            renderAnimals();
        }

        setTimeout(() => {
            document.getElementById("my_modal_1").close();
            document.getElementById("success-msg").classList.add("hidden");
            inputs.forEach(input => input.value = "");
        }, 1000);
    }
});

// Load data on page refresh
window.onload = () => {
    renderAnimals();
    renderAdoptedAnimals();
};

updateAnimalsWithImages();
