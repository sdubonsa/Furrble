// DOM
const swiper = document.querySelector("#swiper");
const like = document.querySelector("#like");
const dislike = document.querySelector("#dislike");

// variables
let cardCount = 0;

function appendNewCard() {
  const card = new Card({
    imageUrl:
      "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
    fullname: users[cardCount % 5],
    onDismiss: appendNewCard,
    onLike: () => {
      like.style.animationPlayState = "running";
      like.classList.toggle("trigger");
    },
    onDislike: () => {
      dislike.style.animationPlayState = "running";
      dislike.classList.toggle("trigger");
    },
  });
  swiper.append(card.element);
  cardCount++;

  const cards = swiper.querySelectorAll(".card:not(.dismissing)");
  cards.forEach((card, index) => {
    card.style.setProperty("--i", index);
  });
}

// first 5 cards
for (let i = 0; i < 5; i++) {
  console.log("HI!");
  appendNewCard();
}
