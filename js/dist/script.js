let PokemonRepository = (function () {
	let t = [],
		e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	const n = (t) => {
		return void 0 !== t.name;
	};
	function o(e) {
		if (!n(e)) throw 'item must be an object, it was not included on the list';
		t.push(e);
	}
	const i = (t, e) =>
		t.addEventListener('click', function () {
			!(function (t) {
				a(t).then(function (t) {
					console.log(t), l(t);
				});
			})(e);
		});
	function a(t) {
		let e = t.detailsUrl;
		return fetch(e)
			.then(function (t) {
				return t.json();
			})
			.then(function (e) {
				return (
					(t.imageUrlFront = e.sprites.front_default),
					(t.imageUrlBack = e.sprites.back_default),
					(t.height = e.height),
					(t.types = e.types),
					t
				);
			})
			.catch(function (t) {
				console.error(t);
			});
	}
	function l(t) {
		let e = $('.modal-body'),
			n = $('.modal-title'),
			o = $('.modal-header');
		o.empty(), n.empty(), e.empty();
		let i = $('<h1>' + t.name + '</h1>'),
			a = $('<img class="modal-img" style="width:50%">');
		a.attr('src', t.imageUrlFront),
			a.attr('sr-only', 'Front image of ' + t.name + '</p>');
		let l = $('<img class="modal-img" style="width:50%">');
		l.attr('src', t.imageUrlBack),
			l.attr('sr-only', 'Back image of ' + t.name + '</p>');
		let r = $('<p>Height : ' + t.height + '</p>'),
			s = ' ';
		t.types.map(({ type: t }) => (s = s + ' ' + t.name));
		let c = $('<p>Types : ' + s + '</p>');
		c.attr('src', t.types),
			o.append(i),
			e.append(a),
			e.append(l),
			e.append(r),
			e.append(c);
	}
	return {
		add: o,
		getAll: function () {
			return t;
		},
		addListItem: function (t) {
			let e = document.querySelector('.pokemon-list'),
				n = document.createElement('li');
			n.classList.add('group-list-item');
			const o = document.createElement('button');
			(o.innerText = t.name),
				o.classList.add('buttonStyle', 'group-list-item', 'btn-light'),
				o.setAttribute('data-toggle', 'modal'),
				o.setAttribute('data-target', '#modal-container'),
				i(o, t),
				n.appendChild(o),
				e.appendChild(n);
		},
		loadList: function () {
			return fetch(e)
				.then(function (t) {
					return t.json();
				})
				.then(function (t) {
					t.results.forEach(function (t) {
						let e = {
							name: t.name,
							detailsUrl: t.url,
							height: t.height,
							types: t.types,
						};
						o(e), console.log(e);
					});
				})
				.catch(function (t) {
					console.error(t);
				});
		},
		loadDetails: a,
		showModal: l,
	};
})();
console.log(PokemonRepository.getAll()),
	PokemonRepository.loadList().then(function () {
		PokemonRepository.getAll().forEach(function (t) {
			PokemonRepository.addListItem(t);
		});
	});
