var apiKey = "IbaW8dTN1RMuvUDjDeWJ0ezUI3gDF3bGIt6COlj48Gi57bbvzt";
var apiSecret = "0ZZhQn3IwuGN76cO8lng1TrbgF3JrUB6QSpiye7Z";
const apiUrl = 'https://api.petfinder.com/v2/oauth2/token';


// Get current script
const script = document.currentScript;

// Get user liks
const likes = JSON.parse(script.getAttribute('currUser'));

// Create the request body as a JSON object
const requestBody = {
  grant_type: 'client_credentials',
  client_id: apiKey,
  client_secret: apiSecret
};

// Get Access Token
const getAccessToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error('Failed to fetch access token');
            }
            const body = await response.json();
            let accessToken = body.access_token;
            resolve(accessToken);
        } catch (err) {
            reject(err);
        }
    });
};

// Initialize variables
let accessToken = null;
let pets = null;

console.log('API call start.')
let accessTokenCall = getAccessToken();

// When the access token is fetched, make the API call
accessTokenCall.then(function(result) {
    accessToken = result;

    // When the API call is complete, set the pets variable
    
});


// Append a new card to the swiper
const appendNewCard = async () => {
    // If user already liked
    likes.forEach((like) => {
        if (pets[cardCount] != undefined && like[0].id == pets[cardCount].id) {
            console.log('already liked: ' + pets[cardCount].name)
            cardCount++;
        }
        // console.log("liked " + typeof like[0].id)
        // console.log("api " + typeof pets[cardCount].id)
    });

    if (pets[cardCount] === undefined) {
        // no more pets
        const card = new Card({
            imageUrl: "https://via.placeholder.com/300x300",
            fullname: "No more pets :(",
            onDismiss: () => {
                swiper.innerHTML = "No more pets :("; // reset
                cardCount = 0;
            }
        });
        
        swiper.append(card.element);
    } else if (pets[cardCount].photos[0] === undefined) {
        // no photo
        const card = new Card({
            imageUrl: "https://via.placeholder.com/300x300",
            fullname: pets[cardCount].name,
            pet: pets[cardCount],
            onDismiss: appendNewCard
        });
    } else {
        console.log(pets[cardCount])
        const card = new Card({
            imageUrl: pets[cardCount].photos[0].full,
            fullname: pets[cardCount].name,
            pet: pets[cardCount],
            onDismiss: appendNewCard,
            date: pets[cardCount].status_changed_at,
            gender: pets[cardCount].gender,
            size: pets[cardCount].size,
            environment: pets[cardCount].environment,
        });

        swiper.append(card.element);
        cardCount++;
    };
    const cards = swiper.querySelectorAll(".card:not(.dismissing)");
    cards.forEach((card, index) => {
        card.style.setProperty("--i", index);
    });
}

let filterForm = document.getElementById("filter-form");

filterForm.addEventListener('submit', function(event){
    event.preventDefault();

    let Stype = filterForm.querySelector("#type").value;
    let Sspecies = filterForm.querySelector("#species").value;
    let Ssize = filterForm.querySelector("#size").value;
    let Sage = filterForm.querySelector("#age").value;
    let Sgender = filterForm.querySelector("#gender").value;
    let Sdistance = filterForm.querySelector("#distance").value;

    const queryParams = {
        type: Stype,
        size: Ssize,
        age: Sage,
        gender: Sgender,
        breed: Sspecies,
        location: 'Charlotte, NC',
        distance: Sdistance,
        unit: 'Miles',
        status: 'adoptable'
    };
    let petsCall = callExternalApiUsingFetch();
    petsCall
    .then(function(result) {
        pets = result;
    })
    .then(function(result) {
        // When the pets variable is set, append the first card
        //appendNewCard();
    })
    appendNewCard();
});


// Wrap the API request in a promise
const callExternalApiUsingFetch = (queryParam) => {
return new Promise((resolve, reject) => {
const queryParams = {
    type: 'Dog',
    // breed: 'Pit Bull Terrier',
    size: 'Medium',
    age: 'young',
    gender: 'male',
    location: 'Charlotte, NC',
    distance: 10,
    unit: 'Miles',
    status: 'adoptable',
    attributes: 'neutered'
};

fetch(`https://api.petfinder.com/v2/animals?${new URLSearchParams(queryParams)}`, {
    headers: {
    Authorization: `Bearer ${accessToken}`
    }
})
    .then(response => response.json())
    .then(data => {
    resolve(data.animals);
    })
    .catch(error => {
    reject(error);
    });
});
};


class Card {
    constructor({ imageUrl, fullname, onDismiss, date, gender, size, environment, onLike, onDislike, pet }) {
        this.imageUrl = imageUrl;
        this.fullname = fullname;
        this.pet = pet;
        this.onDismiss = onDismiss;
        this.date = date.slice(0,10);
        this.gender = gender;
        this.size = size;
        this.environment = environment;
        this.onLike = onLike = () => {
                like.style.animationPlayState = "running";
                like.classList.toggle("trigger");

                // get form
                const form = document.querySelector('#like-form');

                // get the current pet
                const petObject = this.pet;

                // create input element
                const input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'pet');
                input.setAttribute('value', JSON.stringify(petObject));

                // append input to form
                form.appendChild(input);

                // submit form
                form.preventDefault();
                form.submit();
                form.submit((e) => {
                    e.preventDefault();
                });
            };
        this.onDislike = onDislike = () => {
                dislike.style.animationPlayState = "running";
                dislike.classList.toggle("trigger");
        };
        this.#init();
    }
    // private properties
    #startPoint;
    #offsetX;
    #offsetY;
    #isTouchDevice = () => {
        return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
        );
    };
    #init = () => {
        const card = document.createElement("div");
        card.classList.add("card");

        const fullname = document.createElement("p");
        fullname.innerHTML = "Name: " + this.fullname;
        fullname.classList.add("text-black");

        const date = document.createElement("p");
        date.innerHTML = "Date Posted: " + this.date;
        date.classList.add("text-black");

        const gender = document.createElement("p");
        gender.innerHTML = "Gender: " + this.gender;
        gender.classList.add("text-black");

        const size = document.createElement("p");
        size.innerHTML = "Size: " + this.size;
        size.classList.add("text-black");

        const environmentChild = document.createElement("p");
        if (this.environment.children === true) {
            this.environment.children = "Works great with them!"
        }
        else {
            this.environment.children = "Unfortunately, not great with them."
        }
        environmentChild.innerHTML = "Children: " + this.environment.children;
        environmentChild.classList.add("text-black");

        const environmentDog = document.createElement("p");
        if (this.environment.dogs === true) {
            this.environment.dogs = "Works great with them!"
        }
        else {
            this.environment.dogs = "Unfortunately, not great with them."
        }
        environmentDog.innerHTML = "Other dogs: " + this.environment.dogs;
        environmentDog.classList.add("text-black");

        const environmentCat = document.createElement("p");
        if (this.environment.cats === true) {
            this.environment.cats = "Works great with them!"
        }
        else {
            this.environment.cats = "Unfortunately, not great with them."
        }
        environmentCat.innerHTML = "Other cats: " + this.environment.cats;
        environmentCat.classList.add("text-black");

        const img = document.createElement("img");
        img.src = this.imageUrl;
        card.append(img);
        card.append(fullname);
        card.append((date));
        card.append(gender);
        card.append(size);
        card.append(environmentChild);
        card.append(environmentDog);
        card.append(environmentCat);
        this.element = card;
        if (this.#isTouchDevice()) {
        this.#listenToTouchEvents();
        } else {
        this.#listenToMouseEvents();
        }
    };
    #listenToTouchEvents = () => {
        this.element.addEventListener("touchstart", (e) => {
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#startPoint = { x: clientX, y: clientY };
        document.addEventListener("touchmove", this.#handleTouchMove);
        this.element.style.transition = "transform 0s";
        });
        document.addEventListener("touchend", this.#handleTouchEnd);
        document.addEventListener("cancel", this.#handleTouchEnd);
    };
    #listenToMouseEvents = () => {
        this.element.addEventListener("mousedown", (e) => {
        const { clientX, clientY } = e;
        this.#startPoint = { x: clientX, y: clientY };
        document.addEventListener("mousemove", this.#handleMouseMove);
        this.element.style.transition = "transform 0s";
        });
        document.addEventListener("mouseup", this.#handleMoveUp);
        // prevent card from being dragged
        this.element.addEventListener("dragstart", (e) => {
        e.preventDefault();
        });
    };
    #handleMove = (x, y) => {
        this.#offsetX = x - this.#startPoint.x;
        this.#offsetY = y - this.#startPoint.y;
        const rotate = this.#offsetX * 0.1;
        this.element.style.transform = `translate(${this.#offsetX}px, ${
        this.#offsetY
        }px) rotate(${rotate}deg)`;
        // dismiss card
        if (Math.abs(this.#offsetX) > this.element.clientWidth * 0.7) {
        this.#dismiss(this.#offsetX > 0 ? 1 : -1);
        }
    };
    // mouse event handlers
    #handleMouseMove = (e) => {
        e.preventDefault();
        if (!this.#startPoint) return;
        const { clientX, clientY } = e;
        this.#handleMove(clientX, clientY);
    };
    #handleMoveUp = () => {
        this.#startPoint = null;
        document.removeEventListener("mousemove", this.#handleMouseMove);
        this.element.style.transform = "";
    };
    // touch event handlers
    #handleTouchMove = (e) => {
        if (!this.#startPoint) return;
        const touch = e.changedTouches[0];
        if (!touch) return;
        const { clientX, clientY } = touch;
        this.#handleMove(clientX, clientY);
    };
    #handleTouchEnd = () => {
        this.#startPoint = null;
        document.removeEventListener("touchmove", this.#handleTouchMove);
        this.element.style.transform = "";
    };
    #dismiss = (direction) => {
        this.#startPoint = null;
        document.removeEventListener("mouseup", this.#handleMoveUp);
        document.removeEventListener("mousemove", this.#handleMouseMove);
        document.removeEventListener("touchend", this.#handleTouchEnd);
        document.removeEventListener("touchmove", this.#handleTouchMove);
        this.element.style.transition = "transform 1s";
        this.element.style.transform = `translate(${
        direction * window.innerWidth
        }px, ${this.#offsetY}px) rotate(${90 * direction}deg)`;
        this.element.classList.add("dismissing");
        setTimeout(() => {
        this.element.remove();
        }, 1000);
        if (typeof this.onDismiss === "function") {
        this.onDismiss();
        }
        if (typeof this.onLike === "function" && direction === 1) {
        this.onLike();
        }
        if (typeof this.onDislike === "function" && direction === -1) {
        this.onDislike();
        }
    };
}

const swiper = document.querySelector("#swiper");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");

// variables
let cardCount = 0;