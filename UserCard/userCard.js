
(async () => {
    const res = await fetch('./UserCard/UserCard.html');
    const textTemplate = await res.text();
    const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html').querySelector('template');

    class UserCard extends HTMLElement {

        constructor() {
            super();
            this.addEventListener('click', e => {
                this.toggleCard();
            });
            this.connectedCallback.bind(this);
        };

        connectedCallback() {
            let self = this;
            const shadowRoot = this.attachShadow({mode: 'open'});
    
            const instance = HTMLTemplate.content.cloneNode(true);
            shadowRoot.appendChild(instance);
        
            const userId = this.getAttribute('user-id');
        
            const sendUrl = `https://api.github.com/users/coffeeRang`;
        
            fetch(sendUrl).then(function(res) {
                return res = res.json();
            }).then(function(res) {
                console.log(res);
                self.render(res);
            }).catch(function(error) {
                console.log(':: error : ', error);
        
            });
        };

        toggleCard() {
            console.log("Element was clicked!");
            let elem = this.shadowRoot.querySelector('.card__hidden-content');
            let btn = this.shadowRoot.querySelector('.card__details-btn');
            btn.innerHTML = elem.style.display == 'none' ? 'Less Details' : 'More Details';
            elem.style.display = elem.style.display == 'none' ? 'black' : 'none';
        }

        render(userData) {
            console.log('userData')
            const loginId = userData.login;
            const created_at = userData.created_at;
            const public_repos = userData.public_repos;
            const public_gists = userData.public_gists;
            const followers = userData.followers;
            this.shadowRoot.querySelector('.card__full-name').innerHTML = loginId;
            this.shadowRoot.querySelector('.card__user-name').innerHTML = created_at;
            this.shadowRoot.querySelector('.card__website').innerHTML = public_repos;
            this.shadowRoot.querySelector('.card__address').innerHTML = public_gists;
        };
        logFn(data) {
            console.log(':: logFn : ', data);
        };

    }

    customElements.define('user-card', UserCard);
})();


