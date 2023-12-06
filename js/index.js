// const API_URL = "http://localhost:3000";
const API_URL = 'https://be-2-bandung-31-production.up.railway.app/' 

document.addEventListener("DOMContentLoaded", async () => {
	if (window.location.pathname.includes("index.html")) {
		await fetchAllProducts();
	} else if (window.location.pathname.includes("latest-news-html")) {
		await setupCatalogPage();
	}
});

// product api

const fetchAllProducts = async () => {
	try {
		// const response = await fetch(API_URL+"/products")
		const response = await fetch(`${API_URL}/beritas`);
		const berita = await response.json();
		console.log(berita);
		displayProducts(berita);
	} catch (error) {
		console.error("Error:", error);
	}
};

const displayProducts = (berita) => {
	const section = document.getElementsByClassName("headline")
	products.forEach((berita) => {
		const div = document.createElement("div");
		div.innerHTML = `
      <h3>${berita.judul}</h3>
      <p>Price: ${berita.penulis}, ${berita.createdAt} </p>
    `;
		section.appendChild(div);
	});
};

// catalog api

async function setupCatalogPage() {
	try {
		// 1. fetch catalogs, untuk mendapatkan list of catalog
		const response = await fetch(`${API_URL}/catalogs`);
		const catalogs = await response.json();

		// 2. menambahkan catalog dari api, masuk ke list of option
		const selector = document.getElementById("catalog-select");
		catalogs.forEach((ctlg) => {
			const anotherOption = document.createElement("option");
			anotherOption.value = ctlg.id;
			anotherOption.textContent = ctlg.name;
			selector.appendChild(anotherOption);
		});

		// 3. fetch product berdasarkan katalog yang dipilih dari option
		// 3.1 pilih catalognya
		document
			.getElementById("catalog-select")
			.addEventListener("change", async (event) => {
				console.log(event.target.value, "cek event ada apa aja");
				// 3.2 fetch si produknya
				const response = await fetch(
					`${API_URL}/products/${event.target.value}`
				);
				const productCatalogs = await response.json();

				// 3.3 display si product dari catalog yang dipilih di option
				const section = document.getElementById("product-catalog");
				productCatalogs.forEach((product) => {
					const div = document.createElement("div");
					div.innerHTML = `
            <h3>${product.name}</h3>
            <img src=${product.imageUrl} class="image-product"/>
            <p>Price: ${product.price} </p>
          `;
					section.appendChild(div);
				});
			});
	} catch (error) {
		console.error("Error:", error);
	}
}
