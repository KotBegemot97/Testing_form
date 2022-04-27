async function getCards() {
    const response = await fetch("http://mysite/form/db/db.json");
    const data = await response.json();

    const vid = data[3].id;
    const vcardImg = data[3].img;
    const vcardTitle = data[3].name;
    const hid = data[2].id;
    const hcardImg = data[2].img;
    const hcardTitle = data[2].name;

    const cards = document.querySelector('.vertical-cards');
    const cardsh = document.querySelector('.horizontal-cards');
    console.log(cards);
    // cards.innerHTML = `<div class="horizontal"><img src="${cardImg}"></div>`;
    
    let elem = `<div class="vertical"><img src="${vcardImg}"><span class="card-title">№${vid} ${vcardTitle}</span></div>`;
    cards.innerHTML = elem + elem + elem + elem + elem + elem + elem;
    elem = `<div class="horizontal"><img src="${hcardImg}"><span class="card-title">№${hid} ${hcardTitle}</span></div>`;
    cardsh.innerHTML = elem + elem + elem + elem +elem + elem + elem;
}

getCards();