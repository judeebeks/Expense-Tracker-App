//Getting our DOM Element
const submitBtn = document.querySelector("#submit");
const addTrack = document.querySelector("#addTrack");
const submitEdit = document.querySelector("#submitEdit");
const setDate = document.querySelector("#setDate");

const itemName = document.querySelector("#itemName");
const itemPrice = document.querySelector("#itemPrice");
const itemDescription = document.querySelector("#itemDescription");
const dateAdded = document.querySelector("#dateAdded");

const totalSpent = document.querySelector(".totalSpent h3");
const highestSpent = document.querySelector(".highestSpent h3");
const lowestSpent = document.querySelector(".lowestSpent h3");
const averageTotal = document.querySelector(".averageTotal h3");
const clearAll = document.querySelector("#clearAll");

//Setting Copy Date
const date = new Date();
setDate.innerHTML = date.getFullYear();

//Defining our Function that display expense input
function display() {
    //get data if any from localstorage
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    const displaycont = document.querySelector(".displaycont");

    if (expenseStorage.length == 0) {
        clearAll.classList.add("inactive");
    } else {
        clearAll.classList.remove("inactive");
    }

    submitBtn.classList.add("inactive");

    let expenseList = expenseStorage;

    displaycont.innerHTML = "";

    expenseList.forEach((item, index) => {
        displaycont.innerHTML += `<div class="col-md-10 bg-warning rounded my-3 mx-auto p-3">
          <small><span class="badge bg-secondary mb-2">${item.datePurchased}</span></small>
          <div>
            <h4>${item.itemName}</h4>
            <h6>&#8358;${item.itemAmount}.00</h6>
            <div class="d-flex justify-content-between"><p>${item.itemDesc}</p> <span><a onclick="editBtn(${index})" href="#addTrack" class="btn btn-success mx-2"><i class="fa fa-pen-square"></i></a><button onclick="deletebtn(${index})" class="btn btn-danger"><i class="fa fa-trash"></i></button></span></div>
            </div>
          </div>
        </div>`;
    });
}

//Functions are been called when the page load or we refresh the page
display();
displayTotal();
displayMax();
displayMin();
displayAverage();

itemName.addEventListener("keyup", () => {
    //prevents user from submitting form if no input is entered
    if (
        itemName.value.trim() > 0 &&
        itemPrice.value.trim() > 0 &&
        itemDescription.value.trim() > 0
    ) {
        submitBtn.classList.add("inactive");
    } else {
        submitBtn.classList.remove("inactive");
    }
});

addTrack.addEventListener("submit", (e) => {
    //Add Expense button
    e.preventDefault();
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    const expense = {};
    let expenseList = expenseStorage;

    let item = itemName.value;
    let itemAmount = itemPrice.value;
    let itemDesc = itemDescription.value;
    let dateAdd = dateAdded.value;
    expense.itemName = item;
    expense.itemAmount = itemAmount;
    expense.itemDesc = itemDesc;
    expense.datePurchased = dateAdd;
    expenseList.unshift(expense);
    itemName.value = "";
    itemPrice.value = "";
    itemDescription.value = "";
    dateAdded.value = "";

    localStorage.setItem("expense", JSON.stringify(expenseList));

    displayTotal();
    displayMax();
    displayMin();
    displayAverage();

    display();

    submitBtn.classList.add("inactive");
});

function deletebtn(index) {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    expenseList.splice(index, 1);

    localStorage.setItem("expense", JSON.stringify(expenseList));

    displayTotal();
    displayMin();
    displayMax();
    displayAverage();
    display();
}

function displayTotal() {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    let sumTotal = expenseList.reduce((total, current, index, arr) => {
        return total + Number(current.itemAmount);
    }, 0);

    totalSpent.innerHTML = `&#8358;${sumTotal}.00`;

    if (expenseList.length == 0) {
        totalSpent.innerHTML = "&#8358;00.00";
    }
}

function displayMin() {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;
    let itemValue = [];

    expenseList.forEach((item) => {
        itemValue.push(item.itemAmount);
    });

    itemValue.sort(function(a, b) {
        return a - b;
    });

    lowestSpent.innerHTML = `&#8358;${itemValue[0]}.00`;

    if (expenseList.length == 0) {
        lowestSpent.innerHTML = "&#8358;00.00";
    }
}

function displayMax() {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    let itemValue = [];

    expenseList.forEach((item) => {
        itemValue.push(item.itemAmount);
    });

    itemValue.sort(function(a, b) {
        return b - a;
    });

    highestSpent.innerHTML = `&#8358;${itemValue[0]}.00`;

    if (expenseList.length == 0) {
        highestSpent.innerHTML = "&#8358;00.00";
    }
}

function displayAverage() {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    let sumTotal = expenseList.reduce((total, current) => {
        return total + Number(current.itemAmount);
    }, 0);

    let averageValue = sumTotal / expenseList.length;

    averageTotal.innerHTML = `&#8358;${averageValue.toFixed(2)}`;

    if (expenseList.length == 0) {
        averageTotal.innerHTML = "&#8358;00.00";
    }
}

function editBtn(index) {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    itemName.value = expenseList[index].itemName;
    itemPrice.value = expenseList[index].itemAmount;
    itemDescription.value = expenseList[index].itemDesc;
    dateAdded.value = expenseList[index].datePurchased;

    submitBtn.classList.add("inactive");
    submitEdit.style.display = "block";

    submitEdit.onclick = () => {
        expenseList[index].itemName = itemName.value;
        expenseList[index].itemAmount = itemPrice.value;
        expenseList[index].itemDesc = itemDescription.value;
        expenseList[index].datePurchased = dateAdded.value;

        itemName.value = "";
        itemPrice.value = "";
        itemDescription.value = "";
        dateAdded.value = "";
        localStorage.setItem("expense", JSON.stringify(expenseList));

        display();
        displayTotal();
        displayMax();
        displayMin();
        displayAverage();

        submitEdit.style.display = "none";
    };
}

clearAll.onclick = () => {
    const expenseStorage = JSON.parse(localStorage.getItem("expense")) || [];
    let expenseList = expenseStorage;

    expenseList = "";
    totalSpent.innerHTML = "&#8358;00.00";
    lowestSpent.innerHTML = "&#8358;00.00";
    highestSpent.innerHTML = "&#8358;00.00";
    averageTotal.innerHTML = "&#8358;00.00";

    if (expenseList.length == 0) {
        clearAll.classList.add("inactive");
    }

    localStorage.setItem("expense", JSON.stringify(expenseList));

    display();
};