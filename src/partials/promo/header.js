export const renderHeader = () => {
    const $header = document.querySelector(".promo__content h1");
    const words = $header.textContent.split(" ");
    let newHeaderHtml = "";

    for (let w of words) {
        newHeaderHtml += `<span>${w}</span> `
    }

    $header.innerHTML = newHeaderHtml;
}
