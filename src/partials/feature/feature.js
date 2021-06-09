export const renderFeature = () => {
    const $features = document.querySelectorAll('.feature');
    /*
    for (let $f of $features) {
        const $card = $f.querySelector('.card');
        const color = window.getComputedStyle($f).backgroundColor;

        const $shadow = document.createElement('div');
        $shadow.classList.add('card__shadow');

        $card.append($shadow);

        window.addEventListener('mousemove', (e)=> {
            if (e.target.classList.contains('card')){
                $shadow.style.top = e.layerY + 'px';
                $shadow.style.left = e.layerX + 'px';
            }
        });
    }
    */
}
