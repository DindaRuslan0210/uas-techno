// ===== DATA =====
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ===== MODAL =====
function openModal() {
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("title").value = "";
    document.getElementById("course").value = "";
}

// ===== TAMBAH TUGAS =====
function addTask() {
    const title = document.getElementById("title").value.trim();
    const course = document.getElementById("course").value.trim();

    if (title === "" || course === "") {
        alert("Nama tugas dan mata kuliah wajib diisi!");
        return;
    }

    tasks.push({
        title,
        course,
        done: false
    });

    saveData();
    closeModal();
    renderTasks();
}

// ===== SIMPAN =====
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ===== TOGGLE SELESAI =====
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveData();
    renderTasks();
}

// ===== RENDER TUGAS =====
function renderTasks() {
    const list = document.getElementById("taskList");
    const filter = document.getElementById("filter").value;

    list.innerHTML = "";

    let filteredTasks = tasks;
    if (filter !== "all") {
        filteredTasks = tasks.filter(t => t.course === filter);
    }

    if (filteredTasks.length === 0) {
        list.innerHTML = "Belum ada tugas di kategori ini.";
        updateStats();
        return;
    }

    filteredTasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task" + (task.done ? " done" : "");

        div.innerHTML = `
            <span>${task.title} (${task.course})</span>
            <input type="checkbox" ${task.done ? "checked" : ""} 
                   onclick="toggleDone(${index})">
        `;

        list.appendChild(div);
    });

    updateStats();
    renderFilter();
}

// ===== FILTER MATA KULIAH =====
function renderFilter() {
    const filter = document.getElementById("filter");
    const courses = [...new Set(tasks.map(t => t.course))];

    filter.innerHTML = `<option value="all">Semua Mata Kuliah</option>`;

    courses.forEach(course => {
        const opt = document.createElement("option");
        opt.value = course;
        opt.textContent = course;
        filter.appendChild(opt);
    });
}

// ===== STATISTIK =====
function updateStats() {
    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;
    const pending = total - done;

    document.getElementById("total").innerText = total;
    document.getElementById("done").innerText = done;
    document.getElementById("pending").innerText = pending;

    const progress = total === 0 ? 0 : Math.round((done / total) * 100);
    document.getElementById("progressText").innerText = progress + "%";
}

// ===== INIT =====
renderTasks();
