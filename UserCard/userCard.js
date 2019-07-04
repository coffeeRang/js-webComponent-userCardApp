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
            
            // shadowDOM 생성
            const shadowRoot = this.attachShadow({mode: 'open'});
            const instance = HTMLTemplate.content.cloneNode(true);
            shadowRoot.appendChild(instance);

            self.searchGitUser('coffeeRang');
        
            // const userId = this.getAttribute('user-id');
        
        };

        searchGitUser(userId) {
            let self = this;
            let sendUrl = `https://api.github.com/users/${userId}`;

            fetch(sendUrl)
            .then((res) => res.json())
            .then(function(res) {
                self.logFn(res);
                self.render(res);
            }).catch(function(error) {
                console.log(':: error : ', error)
            })
        }

        searchUserProfileByGitUserId(gitUserId) {
            let self = this;
            let sendUrl = `http://my-json-server.typicode.com/coffeeRang/demo-db/profile/${gitUserId}`;

            fetch(sendUrl)
            .then((res) => res.json())
            .then(function(res) {
                self.logFn('useJsonServer', res);

            }).catch(function(error) {
                self.errorFn(error);

            })
        }

        toggleCard() {
            let elem = this.shadowRoot.querySelector('.card__hidden-content');
            let btn = this.shadowRoot.querySelector('.card__details-btn');
            btn.innerHTML = elem.style.display == 'none' ? 'Less Details' : 'More Details';
            elem.style.display = elem.style.display == 'none' ? 'black' : 'none';
        }

        render({login, created_at, public_repos, public_gists, followers, avatar_url}) {
            this.logFn('render method run');
            this.shadowRoot.querySelector('.card__login-id').innerHTML = login;
            this.shadowRoot.querySelector('.card__created-date').innerHTML = created_at;
            this.shadowRoot.querySelector('.card__public-repos').innerHTML = public_repos;
            this.shadowRoot.querySelector('.card__public-gists').innerHTML = public_gists;
            this.shadowRoot.querySelector('#profile1').src = avatar_url;
        };

        logFn(msg, data) {
            let logText = '';
            if (data === undefined) {
                logText = msg;
            } else {
                logText = `[${msg}] = ${data}`;
            }
            console.log(':: logFn:', logText);
        };

        errorFn(error) {
            console.error(':: error : ', error);
        }

    }

    customElements.define('user-card', UserCard);
})();


