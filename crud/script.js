var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Fields
function clearFields(){
    document.querySelector("#modelMobil").value = "";
    document.querySelector("#tanggalPemesanan").value = "";
    document.querySelector("#Pemesan").value = "";
    document.querySelector("#ktpPemesan").value = "";
}

// Add Data

document.querySelector("#jenis-mobil").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Get Form Values
    const modelMobil = document.querySelector("#modelMobil").value;
    const tanggalPemesanan = document.querySelector("#tanggalPemesanan").value;
    const Pemesan = document.querySelector("#Pemesan").value;
    const ktpPemesan = document.querySelector("#ktpPemesan").value;

    // validate
    if(modelMobil == "" || tanggalPemesanan == "" || Pemesan == "" || ktpPemesan == ""){
        showAlert("Mohon Untuk Mengisi Semua Data!", "danger");
        return;
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#list-mobil");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${modelMobil}</td>
                <td>${tanggalPemesanan}</td>
                <td>${Pemesan}</td>
                <td>${ktpPemesan}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Data Pesanan Ditambahkan!", "success");
        }
        else{
            selectedRow.children[0].textContent = modelMobil;
            selectedRow.children[1].textContent = tanggalPemesanan;
            selectedRow.children[2].textContent = Pemesan;
            selectedRow.children[3].textContent = ktpPemesan;
            selectedRow = null; 
            showAlert("Data Pemesan Telah Perbaharui", "info");
        }

        clearFields();
    }
});

// Edit Data

document.querySelector("#list-mobil").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#modelMobil").value = selectedRow.children[0].textContent;
        document.querySelector("#tanggalPemesanan").value = selectedRow.children[1].textContent;
        document.querySelector("#Pemesan").value = selectedRow.children[2].textContent;
        document.querySelector("#ktpPemesan").value = selectedRow.children[3].textContent;
    }
});


// Delete Data
document.querySelector("#list-mobil").addEventListener("click", (e) =>{
    const target = e.target;
    if(target.classList.contains("delete")){
        const row = target.closest("tr");
        row.remove();
        showAlert("Data Pesanan Dihapus", "danger");
    }
});