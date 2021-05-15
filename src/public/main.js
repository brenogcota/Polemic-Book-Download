(function() {
    var app = {
        baseUrl: 'https://plmcbks.amanoteam.com',
        data: [],

        async init() {
            console.log("%c App starter ✔", "background: #dc143c; color: #fff; padding: 0.75%;");
            console.log('https://github.com/brenogcota');

            let cat = document.querySelector('#cat');
            cat.addEventListener('mouseover', (e) => {
                    e.target.style.display = 'none';
                    console.log('kill smelly cat')
                    console.log('press smellyCat() to continue: ');
            });

            setTimeout(function(){ 
                cat.classList = 'down';
            }, 8000);

            setTimeout(function(){ 
                cat.classList = 'up';
            }, 12000);

            setTimeout(function(){ 
                cat.classList = '';
            }, 18000);

            const data = await localStorage.getItem('data');
            if(data) {
                this.render(JSON.parse(data));
            }
            
            this.filter();
            this.getBooks();
        },

        getBooks() {
            let filter = document.querySelector('#search');
            let button = document.querySelector('#search-button');
            let url = null;

            if(filter.value <= 0) {
                button.style.display = 'none';
            }

            filter.addEventListener('keyup', (e) => {
                e.target.value <= 0 ? button.style.display = 'none' : button.style.display = 'block'

                url = `${this.baseUrl}/search/books?query_name=${filter.value}&search_type=fast&page_number=0&max_items=1000`;
                if (e.key === 'Enter' || e.keyCode === 13) {
                    search(url);
                }
            })


            button.addEventListener('click', (e) => {
                search(url);
            })

            const search = (url) => {
                this.fetchBooks(url);
                filter.value = '';
            }


        },

        fetchBooks(url) {
            document.querySelector('#search-button').textContent = 'Loading..';
            fetch(url)
                    .then(res => res.json())
                    .then(async (data) => { 
                        this.data = data.results.items;

                        this.render(this.data);
                        document.querySelector('#search-button').textContent = 'Search';
                        await localStorage.setItem('data', JSON.stringify(this.data));
                    })
                    .catch(e => {
                        this.setError();
                    }) 
        },

        setError() {
            let $section = document.querySelector('#content');
            $section.innerHTML = '';
            $section.innerHTML = 'Houve um erro, tente novamente!'
        },

        render(data) {
            let $section = document.querySelector('#content');
            $section.innerHTML = '';

            data.forEach((item, index) => {

                const $div = document.createElement('div');
                $div.classList = 'card';

                const $a = document.createElement('a');
                $a.classList = 'card-link';

                const download = `https://plmcbks.amanoteam.com/download/${item.documents[0].id}`
                $a.href = download;
                $a.setAttribute('download',"download");

                const $img = document.createElement('img');
                $img.classList = 'card-image';
                const src = `https://plmcbks.amanoteam.com/view/${item.cover.id}`;
                $img.src = src;

                $a.appendChild($img);

                const $h5 = document.createElement('h5');
                $h5.classList = 'card-title';
                $h5.textContent = item.title;
                $a.appendChild($h5);

                $div.appendChild($a)

                $section.appendChild($div);
            });
        },

        filter() {
            const buttons = document.querySelectorAll('.filter-item');

            buttons.forEach(item => {
                item.addEventListener('click', (e) => {
                    const filter = e.target.dataset.filter;
                    let url = `${this.baseUrl}/search/books?query_name=${filter}&search_type=fast&page_number=0&max_items=1000`;
                    this.fetchBooks(url);
                });
            })
        }
    }

    app.init();
    
})();

var smellyCat = () => {
    document.querySelector('#cat').style.display = 'block';
}