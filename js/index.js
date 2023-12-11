// const API_URL = "http://localhost:3000";
const API_URL = 'https://be-2-bandung-31-production.up.railway.app' 

document.addEventListener("DOMContentLoaded", async () => {
	if (window.location.pathname.includes("index.html")) {
		await fetchAllProducts();
	} else if (window.location.pathname.includes("news-pages.html")) {
		await fetchBerita();
	} else if (window.location.pathname.includes("contact.html")) {
		await setupContactForm();
	} else if (window.location.pathname.includes("category.html")) {
		await fetchPageCategory();
	} 
});

// berita api
const fetchAllProducts = async () => {
	try {
		// const response = await fetch(API_URL+"/products")
		const response = await fetch(`${API_URL}/beritas`);
		const berita = await response.json();
		berita.map(item => {
			return(displayProducts(item))
		})
	} catch (error) {
		console.error("Error:", error);
	}
};
// fetchAllProducts ()

const displayProducts = (berita) => {
	const section = document.getElementById("slider-news")
		const div = document.createElement("div");
	    div.classList.add('card-trending')
		div.innerHTML = `
		<img src=${berita.imageUrl} alt=${berita.title} class="mySlide-item">
		<a href="news-pages.html?id=${berita.id}"><h4 class="judul">${berita.judul}</h4></a>
		<p>${berita.penulis}</p>
    `;
		section.appendChild(div);
};

// bagian lates news
// product lates news
const fetchAllLatenews = async () => {
    try {
        const response = await fetch(`${API_URL}/beritas`);
        const berita = await response.json();

        // Shuffle the array randomly
        const shuffledBerita = shuffleArray(berita);

        shuffledBerita.map(item => {
            return displayLatesnews(item);
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

const displayLatesnews = (berita) => {
    const section = document.getElementById("latesnews-slider");
    const div = document.createElement("div");
    div.classList.add('card-latest');
    div.innerHTML = `
        <img src=${berita.imageUrl} alt=${berita.title} class="mySlide-item">
        <a href="news-pages.html?id=${berita.id}"><h4 class="judul">${berita.judul}</h4></a>
        <p>${berita.penulis}</p>
    `;
    section.appendChild(div);
};

// Function to shuffle an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
// Call the fetchHeader function
fetchAllLatenews();


// berita page
const fetchBerita = async () => {
    try {
		let params = (new URL(document.location)).searchParams
		let id = params.get("id")

        const response = await fetch(`${API_URL}/beritas/${id}`);
        const berita = await response.json();
    
        // Bersihkan isi section sebelum menambahkan berita baru
        const section = document.getElementById("page-berita");
        section.innerHTML = "";
        displayBerita(berita[0]);
    } catch (error) {
        console.error("Error:", error);
    }
};
// fetchBerita();

const displayBerita = (berita) => {
    const section = document.getElementById("page-berita");
    const div = document.createElement("div");
    div.classList.add('news-pages-content1-text1');
    div.innerHTML = `
        <img src=${berita.imageUrl} style="width: 100%;">
        <h1>${berita.judul}</h1>
        <p style="font-size: 24px">${berita.isi}</p>   
    `;
    section.appendChild(div);
};

const dropdownCategory = async() => {
	try {
		const response = await fetch(`${API_URL}/categorys`);
        const categorys = await response.json();

		const dropdown = document.getElementById("categoryDropdown")

		categorys.forEach(item => {
			dropdown.innerHTML += `<a href="category.html?id=${item.id}">${item.name}</a>`
		})
		
	} catch (error) {
		console.error(error)
	}
}

dropdownCategory()

//politik
const fetchPageCategory = async () => {
  try {
	let params = (new URL(document.location)).searchParams
	let id = params.get("id")

	const response = await fetch(`${API_URL}/categorys/${id}`);


	// Bersihkan isi section sebelum menambahkan kategori baru
	const section = document.getElementById("category");
	section.innerHTML = "";

	// Ambil satu berita terkait kategori
	const beritaResponse = await fetch(`${API_URL}/beritas/category/${id}`);
	const berita = await beritaResponse.json();

	berita.forEach(item => {
		displaypageBerita(item)
	})
	
  } catch (error) {
	console.error("Error:", error);
  }
};
// fetchPageCategory()

const displayCategory = (category) => {
  const section = document.getElementById("category");
  const div = document.createElement("div");
  div.classList.add('wrap-category');
  div.innerHTML = `
  	<h1>Categori: ${category.name}</h1>
	<img>${berita.imageUrl}</img>
	<h2>${berita.judul}</h2>
	<p>${berita.headlina}</p>
	<p>${berita.createdAt}</p>
  `;
  section.appendChild(div);
};

const displaypageBerita = (berita) => {
	const section = document.getElementById("category");
	const div = document.createElement("div");
	div.classList.add('title-category');
	// Membuat objek Date dari createdAt
	const createdDate = new Date(berita.createdAt);
	// Mendapatkan tanggal, bulan, dan tahun
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	const formattedDate = createdDate.toLocaleDateString('en-US', options);
	div.innerHTML = `
	  <center>
		<img src="${berita.imageUrl}" alt="">
		<a href="news-pages.html?id=${berita.id}" class="link-category">
		<h2 class="judul-category">${berita.judul}</h2>
		<p class="isi-category">${berita.headline}</p>
		<p class="time-category">${formattedDate}</p>
		</a>
	  </center>
	`;
	section.appendChild(div);
  };

// POST MESSAGE
function setupContactForm(){
	const form = document.getElementById("contact-form");
	form.addEventListener("submit", async function(event) {
		event.preventDefault();
		const formData = new FormData(form);
		const formProps = Object.fromEntries(formData);
		try {
			const response = await fetch(`${API_URL}/contacts`,{
				method: "POST",
				headers: {
					"Content-Type" : "application/json",
				},
				body: JSON.stringify(formProps),
			});
			const data = await response.json();
		} catch (error) {
			console.error("error", error);
		}
	
	});
}
function myFunction() {
	alert("Data Berhasil Dikirimkan");
  }
// setupContactForm();

