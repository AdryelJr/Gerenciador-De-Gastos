const tbody = document.querySelector("tbody");
		const descItem = document.querySelector("#desc");
		const amount = document.querySelector("#amount");
		const type = document.querySelector("#type");
		const btnNew = document.querySelector("#btnNew");
		const category = document.querySelector("#categoria");
		const incomes = document.querySelector(".incomes");
		const expenses = document.querySelector(".expenses");
		const total = document.querySelector(".total");

		let items;

		btnNew.onclick = () => {
			if (descItem.value === "" || amount.value === "" || type.value === "") {
				return alert("Preencha todos os campos!");
			}

			items.push({
				desc: descItem.value,
				category: category.value,
				amount: Math.abs(amount.value).toFixed(2),
				type: type.value,
			});

			setItensBD();

			loadItens();

			category.value = "";
			descItem.value = "";
			amount.value = "";
		};

		function deleteItem(index) {
			items.splice(index, 1);
			setItensBD();
			loadItens();
		}

		function insertItem(item, index) {
			let tr = document.createElement("tr");

			tr.innerHTML = `
    <td id="linhaback">${item.desc}</td>
    <td id="linhaback">${item.category}</td>
    <td id="linhaback">R$ ${item.amount}</td>
    <td id="linhaback" class="columnType">${item.type === "Entrada"
					? '<i class="bx bxs-chevron-up-circle"></i>'
					: '<i class="bx bxs-chevron-down-circle"></i>'
				}</td>
    <td id="linhaback" class="columnAction">
      <button class = "Dell" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

			tbody.appendChild(tr);
		}

		function loadItens() {
			items = getItensBD();
			tbody.innerHTML = "";
			items.forEach((item, index) => {
				insertItem(item, index);
			});

			getTotals();
		}

		function getTotals() {
			const amountIncomes = items
				.filter((item) => item.type === "Entrada")
				.map((transaction) => Number(transaction.amount));

			const amountExpenses = items
				.filter((item) => item.type === "Saída")
				.map((transaction) => Number(transaction.amount));

			const totalIncomes = amountIncomes
				.reduce((acc, cur) => acc + cur, 0)
				.toFixed(2);

			const totalExpenses = Math.abs(
				amountExpenses.reduce((acc, cur) => acc + cur, 0)
			).toFixed(2);

			const totalItems = (totalIncomes - totalExpenses).toFixed(2);

			incomes.innerHTML = totalIncomes;
			expenses.innerHTML = totalExpenses;
			total.innerHTML = totalItems;
		}

		const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
		const setItensBD = () =>
			localStorage.setItem("db_items", JSON.stringify(items));

		loadItens();

		// Selecione a caixa de seleção de categoria
		const categoriaSelect = document.querySelector('#categoria');

		// Adicione um ouvinte de eventos para o evento de alteração
		categoriaSelect.addEventListener('change', () => {
			// Selecione o tipo de categoria selecionado
			const categoria = categoriaSelect.value;

			// Selecione a lista correspondente
			const lista = document.querySelector(`#${categoria}-lista`);

			// Crie um novo item para a lista
			const item = document.createElement('div');
			item.textContent = 'Novo item';

			// Adicione o novo item à lista
			lista.appendChild(item);
		});