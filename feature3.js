const categoriesDiv = document.getElementById('categories');
  const form = document.getElementById('categoryForm');
  const salaryInput = document.getElementById('salary');

  const defaultCategories = [
    { name: 'Food', percent: 30 },
    { name: 'Rent', percent: 40 },
    { name: 'Transportation', percent: 10 },
    { name: 'Entertainment', percent: 10 }
    // Savings will be calculated
  ];

  function autoDistribute() {
    const salary = parseFloat(salaryInput.value);
    if (!salary || salary <= 0) {
      alert('Please enter a valid salary.');
      return;
    }

    salaryInput.setAttribute('data-original', salary);
    form.style.display = 'block';
    categoriesDiv.innerHTML = '';

    let totalPercent = 0;
    defaultCategories.forEach(cat => {
      const amount = ((salary * cat.percent) / 100).toFixed(2);
      categoriesDiv.innerHTML += `
        <label>${cat.name} (${cat.percent}%):</label>
        <input type="number" value="${amount}" data-category="${cat.name}" oninput="updateSavings()" required>
      `;
      totalPercent += cat.percent;
    });

    categoriesDiv.innerHTML += `
      <label>Savings (${100 - totalPercent}%):</label>
      <input type="number" id="savingsField" data-category="Savings" readonly>
    `;

    updateSavings();
  }

  function manualEntry() {
    const salary = parseFloat(salaryInput.value);
    if (!salary || salary <= 0) {
      alert('Please enter a valid salary.');
      return;
    }

    salaryInput.setAttribute('data-original', salary);
    form.style.display = 'block';
    categoriesDiv.innerHTML = '';

    const userCategories = ['Food', 'Rent', 'Transportation', 'Entertainment'];
    userCategories.forEach(cat => {
      categoriesDiv.innerHTML += `
        <label>${cat}:</label>
        <input type="number" placeholder="Enter amount for ${cat}" data-category="${cat}" oninput="updateSavings()" required>
      `;
    });

    categoriesDiv.innerHTML += `
      <label>Savings:</label>
      <input type="number" id="savingsField" data-category="Savings" readonly>
    `;

    updateSavings();
  }

  function updateSavings() {
    const originalSalary = parseFloat(salaryInput.getAttribute('data-original')) || 0;
    let total = 0;

    const inputs = categoriesDiv.querySelectorAll('input[data-category]');
    inputs.forEach(input => {
      const cat = input.dataset.category;
      const val = parseFloat(input.value);
      if (!isNaN(val) && cat !== "Savings") total += val;
    });

    const savingsField = document.getElementById("savingsField");
    const savings = originalSalary - total;

    if (savings < 0) {
      alert("Total exceeds salary. Please reduce some category.");
      savingsField.value = "";
    } else {
      savingsField.value = savings.toFixed(2);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const inputs = categoriesDiv.querySelectorAll('input[data-category]');
    let data = {};
    inputs.forEach(input => {
      const value = parseFloat(input.value);
      const cat = input.dataset.category;
      data[cat] = value;
    });

    localStorage.setItem('budgetData', JSON.stringify(data));
    alert("Data saved! Now click 'Visualize Data' to see results.");
  }

  salaryInput.addEventListener('input', function () {
    salaryInput.setAttribute('data-original', salaryInput.value);
    updateSavings();
  });