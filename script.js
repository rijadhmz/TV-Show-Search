const form = document.querySelector('#searchForm');
const images = document.querySelector('#images');
const content = document.querySelector('#content');

// clear images when search

const clearImages = () => {
    while (images.firstChild) {
        images.removeChild(images.firstChild);
    }
};

form.addEventListener('submit', async function (event) {
    try {
        event.preventDefault();

        const searchTerm = form.elements.query.value.trim();
        // Check if value is empty
        if (!searchTerm) {
            return;
        }
        
        content.classList.add('afterMargin');
        const searchTerm = form.elements.query.value;
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

        clearImages();

        console.log(res.data);
        makeImages(res.data)
        form.elements.query.value = '';
    } catch (e) {
        console.log('Error', e)
    }
} )

//if show has an image - append it

const makeImages = shows => {
    for (let result of shows) {
        if (result.show.image) {
            const image = document.createElement('div');
            const img = document.createElement('IMG');
            const par = document.createElement('p');
            const date = result.show.premiered;
            const dateYear = date.slice(0,4);
            par.innerHTML = `<p>"${result.show.name}" - <span>${dateYear}</span></p>`;
            img.src = result.show.image.medium;
            image.appendChild(img);
            image.appendChild(par);
            images.appendChild(image);

            //transition
            setTimeout(() => {
                image.classList.add('loaded');
            }, 10);
        } 
    }
}



