document.addEventListener("DOMContentLoaded", function() {
    const numberOfPeopleInput = document.getElementById("numberOfPeople");
    const workList = document.getElementById("workList");
    const hoursPerPersonInput = document.getElementById("hoursPerPerson");
    const totalAmountAfterSpan = document.querySelector(".totalamountafter");
    const totalAmountSpan = document.querySelector(".totalamount");
    const tipInput = document.getElementById("tipAmount"); // cheat to let it be called by the reset
    const resetAllButton = document.getElementById("resetall");
  
    calculateTip();
  
    function calculateTip() {
      const tipInput = document.getElementById("tipAmount");
  
      tipInput.addEventListener("input", function() {
        const tipValue = tipInput.value.replace(/[^0-9.]/g, '');
        totalAmountSpan.textContent = "$" + tipValue;
  
        recalculateAmountPerHour();
      });
    }
  
  
    numberOfPeopleInput.addEventListener("input", function() {
      const numberOfPeopleValue = parseInt(numberOfPeopleInput.value.replace(/[^0-9]/g, ''), 10);
  
      if (!isNaN(numberOfPeopleValue) && numberOfPeopleValue > 0) {
        workList.innerHTML = '';
  
        for (let i = 0; i < numberOfPeopleValue; i++) {
          const listItem = document.createElement("li");
          const hoursInput = document.createElement("input");
          const listAmountSpan = document.createElement("span");
  
          hoursInput.type = "text";
          hoursInput.placeholder = "Enter hours";
          hoursInput.classList.add("hours-input");
  
          listAmountSpan.classList.add("listamount");
          listAmountSpan.textContent = "Cut: $0.00";
  
          listItem.textContent = "Person " + (i + 1);
          listItem.appendChild(hoursInput);
          listItem.appendChild(listAmountSpan);
  
          workList.appendChild(listItem);
        }
  
        recalculateAmountPerHour();
      } else {
        // Optionally clear the workList if the input is not valid
        workList.innerHTML = '';
      }
    });
  
    workList.addEventListener("input", function() {
      const hoursInputs = document.querySelectorAll('.hours-input');
      let totalHours = 0;
  
      hoursInputs.forEach(input => {
        const hoursValue = parseFloat(input.value) || 0;
        totalHours += hoursValue;
      });
  
      hoursPerPersonInput.value = totalHours.toFixed(2);
      recalculateAmountPerHour();
    });
  
    function recalculateAmountPerHour() {
      const totalAmountValue = parseFloat(totalAmountSpan.textContent.replace(/[^0-9.]/g, ''));
      const totalHoursValue = parseFloat(hoursPerPersonInput.value);
  
      if (!isNaN(totalAmountValue) && !isNaN(totalHoursValue) && totalHoursValue > 0) {
        const amountPerHour = totalAmountValue / totalHoursValue;
        totalAmountAfterSpan.textContent = "$" + amountPerHour.toFixed(2);
  
        updateListAmounts(amountPerHour);
      } else {
        totalAmountAfterSpan.textContent = "$0.00";
      }
    }
  
  
  
  
  
  
  
  
    document.addEventListener("input", function(event) {
      const inputElement = event.target;
      if (inputElement.type === "text") {
        const inputValue = parseFloat(inputElement.value);
        if (isNaN(inputValue) || inputValue < 0) {
          inputElement.value = '';
        }
      }
  
      // Recalculate amounts
      recalculateAmountPerHour();
    });
  
  
    
    document.addEventListener("input", function(event) {
      const inputElement = event.target;
  
      if (inputElement.type === "text") {
        const inputValue = inputElement.value.trim(); // Trim removes leading and trailing spaces
  
        inputElement.value = inputValue.replace(/[^0-9.]/g, '');
      }
  
      recalculateAmountPerHour();
    });
  
  
  
  
  
    
  
    function updateListAmounts(amountPerHour) {
      const listAmounts = document.querySelectorAll('.listamount');
  
      listAmounts.forEach(span => {
        const hoursInput = span.parentElement.querySelector('.hours-input');
        const hoursValue = parseFloat(hoursInput.value) || 0;
        const cutAmount = hoursValue * amountPerHour;
        span.textContent = "Cut: $" + cutAmount.toFixed(2);
      });
    }
  
    // Add event listener for the "Reset" button
    resetAllButton.addEventListener("click", function() {
      numberOfPeopleInput.value = '';
      workList.innerHTML = '';
      hoursPerPersonInput.value = '0.00';
      totalAmountSpan.textContent = '$0.00';
      totalAmountAfterSpan.textContent = '$0.00';
  
      tipInput.value = '0.00';
  
      // Set the value of all hours input fields to 0
      const hoursInputs = document.querySelectorAll('.hours-input');
      hoursInputs.forEach(input => {
        input.value = '0';
      });
    });
  
  });
  
  
  //NO longer needed
  // document.addEventListener("DOMContentLoaded", function() {
  //   const container = document.querySelector('.m-container');
  //   container.scrollTop = container.scrollHeight;
  // });