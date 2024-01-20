class navBar extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.innerHTML = `
        <div id="mySidenav" class="sidenav flex flex-col p-3">
            <button href="javascript:void(0)" onclick="closeNav()"
                ><img
                    class="filter invert h-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/2048px-OOjs_UI_icon_close.svg.png"
            /></button>
            <ul class="flex flex-col list-none gap-2" id="question-ul">
            </ul>
        </div>
        `;
	}
}

customElements.define("side-bar", navBar);
