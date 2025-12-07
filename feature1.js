let balance = 0;

function addTransaction() {
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;

    if (description === "" || amount === "") {
        alert("Please fill in all fields");
        return;
    }

    amount = parseFloat(amount);

    if (type === "income") {
        balance += amount;
    } else {
        balance -= amount;
    }

    updateBalance();
    addTransactionToList(description, amount, type);
}

function updateBalance() {
    document.getElementById("balance").innerText = `₹${balance}`;
}

function addTransactionToList(description, amount, type) {
    let transactionList = document.getElementById("transaction-list");
    let listItem = document.createElement("li");

    listItem.innerHTML = `${description} <span class="${type}">₹${amount}</span>`;
    transactionList.appendChild(listItem);

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}
