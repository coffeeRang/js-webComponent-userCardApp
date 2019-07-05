(async () => {
    console.log('################');
    const res = await fetch('./profile/profile.html')
    const textTemplate = await res.text();
    const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html').querySelector('template');

    class Profile extends HTMLElement {
        constructor() {
            super();
            this.connectedCallback.bind(this);
            console.log('Profile run!!!');
        };

        connectedCallback() {
            const shadowRoot = this.attachShadow({mode: 'open'});
            const instance = HTMLTempalte.content.cloneNode(ture);
            console.log('>> instance : ', instance);
            shadowRoot.appendChild(instance);
        }

        searchUserProfileByGitUserId(gitUserId) {
            let self = this;
            let sendUrl = `http://my-json-server.typicode.com/coffeeRang/demo-db/profile/${gitUserId}`;

            fetch(sendUrl)
            .then((res) => res.json())
            .then(function(res) {
                self.logFn(res);
            })
            .catch(function(error) {
                self.errorFn(error);
            })
        }

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

    customElements.define('user-profile', Profile);


})();