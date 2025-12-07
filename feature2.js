let expenses = [];

function addExpense() {
  const name = document.getElementById("expenseName").value.trim();
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (!name || isNaN(amount) || amount <= 0) {
    alert("Please enter valid expense name and amount.");
    return;
  }

  expenses.push({ name, amount });
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";

  updateExpenseList();
}

function updateExpenseList() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  expenses.forEach((exp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${exp.name} - ₹${exp.amount.toFixed(2)}
      <button class="remove-btn" onclick="removeExpense(${index})">Remove</button>
    `;
    expenseList.appendChild(li);
  });
}

function removeExpense(index) {
  expenses.splice(index, 1);
  updateExpenseList();
  drawCharts(expenses);
}

function calculateBudget() {
  const salary = parseFloat(document.getElementById("salary").value);
  const savings = parseFloat(document.getElementById("savingsGoal").value);

  if (isNaN(salary) || isNaN(savings) || salary <= 0 || savings < 0) {
    alert("Please enter valid salary and savings goal.");
    return;
  }

  drawCharts(expenses);
  drawPlanCharts(salary, savings);
}

// --- Chart Logic ---

let actualPieChart, actualBarChart, planPieChart, planBarChart;

function drawCharts(data) {
  const labels = data.map(d => d.name);
  const values = data.map(d => d.amount);

  if (actualPieChart) actualPieChart.destroy();
  if (actualBarChart) actualBarChart.destroy();

  const pieCtx = document.getElementById("actualPieChart").getContext("2d");
  actualPieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Actual Expenses (Pie Chart)'
        }
      }
    }
  });

  const barCtx = document.getElementById("actualBarChart").getContext("2d");
  actualBarChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: 'Amount (₹)',
        data: values,
        backgroundColor: '#3498db'
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Actual Expenses (Bar Chart)'
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

function drawPlanCharts(salary, savings) {
  const planData = [
    { category: 'Needs (50%)', amount: salary * 0.5 },
    { category: 'Wants (30%)', amount: salary * 0.3 },
    { category: 'Savings Goal', amount: savings }
  ];

  const labels = planData.map(p => p.category);
  const values = planData.map(p => p.amount);

  if (planPieChart) planPieChart.destroy();
  if (planBarChart) planBarChart.destroy();

  const pieCtx = document.getElementById("planPieChart").getContext("2d");
  planPieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: ['#2ecc71', '#f39c12', '#8e44ad']
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Planned Budget (Pie Chart)'
        }
      }
    }
  });

  const barCtx = document.getElementById("planBarChart").getContext("2d");
  planBarChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: 'Amount (₹)',
        data: values,
        backgroundColor: '#2ecc71'
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Planned Budget (Bar Chart)'
        }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
