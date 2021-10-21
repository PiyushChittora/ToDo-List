const task = document.getElementById("task");
const deadline = document.getElementById("deadline");
const add = document.getElementById("add");
const todoli = document.getElementById("todolist");
const filter = document.getElementById("filter");

window.onload=displaymem();
add.addEventListener("click", () => {
    if (task.value == "" || deadline.value == "") {
        alert("Input is required");
        return false;
    }
    const ro = document.createElement('div');
    ro.classList.add("row");

    const newtask = document.createElement('li');
    newtask.classList.add("todoitems");
    newtask.innerText = task.value;
    ro.appendChild(newtask);

    const newdeadline = document.createElement('li');
    newdeadline.classList.add("todoitems");
    newdeadline.innerText = deadline.value;
    ro.appendChild(newdeadline);

    var x=0;
    savememory(task.value, deadline.value,x);
    const deletecheck = document.createElement('div');
    deletecheck.classList.add("wraper");

    const check = document.createElement('button');
    check.classList.add("btn-check");
    check.innerText = "Done";
    deletecheck.appendChild(check);
    const del = document.createElement('button');
    del.classList.add("btn-del");
    del.innerText = "Delete";
    deletecheck.appendChild(del);

    ro.appendChild(deletecheck);
    todoli.appendChild(ro);
    task.value = "";
    deadline.value = "";
});

todoli.addEventListener("click", (event) => {
    const item = event.target;

    if (item.classList[0] === "btn-del") {
        const item1 = item.parentElement;
        const item2 = item1.parentElement;
        item2.classList.add("ded");
        removememory(item2);
        item2.addEventListener('transitionend', function () {
            item2.remove();
        });
    }
    if (item.classList[0] === "btn-check") {
        const item1 = item.parentElement;
        const item2 = item1.parentElement;
        item2.classList.toggle("check");
        checkmemory(item2);
    }
});

filter.addEventListener("click", (e) => {
    const todoitems = todoli.childNodes;
    todoitems.forEach(function (ro) {
        switch (e.target.value) {
            case "all":
                ro.style.display = "flex";
                break;
            case "checked":
                if (ro.classList.contains("check")) {
                    ro.style.display = "flex";
                }
                else {
                    ro.style.display = "none";
                }
                break;
            case "unchecked":
                if (!ro.classList.contains("check")) {
                    ro.style.display = "flex";
                }
                else {
                    ro.style.display = "none";
                }
                break;
        }
    });
})

function savememory(todo, todo2,x) {
    let initmem;
    if (localStorage.getItem("initmem") === null) {
        initmem = [];
    }
    else {
        initmem = JSON.parse(localStorage.getItem("initmem"));
    }
    initmem.push([todo, todo2,x]);
    localStorage.setItem("initmem", JSON.stringify(initmem));
}

function displaymem() {
    let initmem;
    if (localStorage.getItem("initmem") === null) {
        initmem = [];
    }
    else {
        initmem = JSON.parse(localStorage.getItem("initmem"));
    }
    initmem.forEach(function (todo) {
        const ro = document.createElement('div');
        ro.classList.add("row");
        if(todo[2]===1){
            ro.classList.add("check");
        }

        const newtask = document.createElement('li');
        newtask.classList.add("todoitems");
        newtask.innerText = todo[0];
        ro.appendChild(newtask);

        const newdeadline = document.createElement('li');
        newdeadline.classList.add("todoitems");
        newdeadline.innerText = todo[1];
        ro.appendChild(newdeadline);

        const deletecheck = document.createElement('div');
        deletecheck.classList.add("wraper");

        const check = document.createElement('button');
        check.classList.add("btn-check");
        check.innerText = "Done";
        deletecheck.appendChild(check);
        const del = document.createElement('button');
        del.classList.add("btn-del");
        del.innerText = "Delete";
        deletecheck.appendChild(del);

        ro.appendChild(deletecheck);
        todoli.appendChild(ro);
    });
}

function removememory(todo){
    let initmem;
    if (localStorage.getItem("initmem") === null) {
        initmem = [];
    }
    else {
        initmem = JSON.parse(localStorage.getItem("initmem"));
    }
    const todoIndex = Array.from(todoli.childNodes).indexOf(todo);
    initmem.splice(todoIndex, 1);
    localStorage.setItem("initmem", JSON.stringify(initmem));
}

function checkmemory(todo){
    let initmem;
    if (localStorage.getItem("initmem") === null) {
        initmem = [];
    }
    else {
        initmem = JSON.parse(localStorage.getItem("initmem"));
    }
    const todoIndex = Array.from(todoli.childNodes).indexOf(todo);
    if(initmem[todoIndex][2]===1){
        initmem[todoIndex][2]=0;
    }
    else{
        initmem[todoIndex][2]=1;
    }
    localStorage.setItem("initmem", JSON.stringify(initmem));
}