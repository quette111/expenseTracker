const expenseName = document.getElementById("expenseNameInput");
const expenseAmount = document.getElementById("expenseAmountInput");
const outerDiv = document.getElementById("outerDiv");
const balanceInput = document.getElementById("balanceInput");
const balanceInput2 = document.getElementById("balanceInput2");

// Initialize balance value to 0
balanceInput.value = 0;

// Add event listener to flip button (for deposit section)
document.getElementById("flipButton").addEventListener("click", function() {
  document.getElementById("card").classList.add("flipped");
});

// Add event listener to flip back button
document.getElementById("flipButtonBack").addEventListener("click", function() {
  document.getElementById("card").classList.remove("flipped");
});

// Function to add a new expense
function sendInfo() {
  // Check if both fields have values
  if (expenseName.value === "" || expenseAmount.value === "") {
    return; // Don't proceed if fields are empty
  } else {
    // Create a new expense item div
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("output-items");
    // Create the inner elements for expense name and amount
    const expenseNameElem = document.createElement("h4");
    expenseNameElem.style.paddingLeft = "5px";
    expenseNameElem.textContent = expenseName.value;

    const expenseAmountElem = document.createElement("h4");
    expenseAmountElem.style.color = "red";
    expenseAmountElem.textContent = `-$${expenseAmount.value}`;

    const actionTextElem = document.createElement("h4");
    actionTextElem.textContent = "";

    const deleteButton = document.createElement("button");
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.height = "20px";
    deleteButton.style.position = "relative";
    deleteButton.style.top = "20px";
    deleteButton.style.right = "10px";
    deleteButton.textContent = "x";

    const editButton = document.createElement("button");
    editButton.style.backgroundColor = "blue";
    editButton.style.color = "white";
    editButton.style.height = "20px";
    editButton.style.position = "relative";
    editButton.style.top = "20px";
    editButton.style.right = "10px";
    editButton.textContent = "Edit";

    // Append inner elements to the expense item div
    expenseItem.appendChild(expenseNameElem);
    expenseItem.appendChild(expenseAmountElem);
    expenseItem.appendChild(actionTextElem);
    expenseItem.appendChild(deleteButton);
    expenseItem.appendChild(editButton);

    // Append the new expense item to outerDiv
    outerDiv.appendChild(expenseItem);

    // Update the balance after adding the expense
    balanceInput.value =
      parseFloat(balanceInput.value) - parseFloat(expenseAmount.value);

    // Clear input fields
    expenseAmount.value = "";
    expenseName.value = "";

    // Event listener for the delete button
    deleteButton.addEventListener("click", function() {
      outerDiv.removeChild(expenseItem); // Remove the expense item
      balanceInput.value =
        parseFloat(balanceInput.value) +
        parseFloat(
          expenseAmountElem.textContent.replace("$", "").replace("-", "")
        );
    });

    // Event listener for the edit button
    editButton.addEventListener("click", function() {
      // Turn the expense name and amount into editable fields
      const newExpenseNameInput = document.createElement("input");
      newExpenseNameInput.value = expenseNameElem.textContent; // Set current value as input value

      const newExpenseAmountInput = document.createElement("input");
      newExpenseAmountInput.value = expenseAmountElem.textContent
        .replace("$", "")
        .replace("-", ""); // Remove '$' before setting the value

      // Clear the expense item content
      expenseItem.innerHTML = "";

      // Create a save button to save the new values
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.style.backgroundColor = "green";
      saveButton.style.color = "white";
      saveButton.style.height = "20px";
      saveButton.style.position = "relative";
      saveButton.style.top = "20px";
      saveButton.style.right = "10px";

      // Create a cancel button to revert to the original values
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.style.backgroundColor = "gray";
      cancelButton.style.color = "white";
      cancelButton.style.height = "20px";
      cancelButton.style.position = "relative";
      cancelButton.style.top = "20px";
      cancelButton.style.right = "10px";

      // Append the input fields and buttons to the expense item
      expenseItem.appendChild(newExpenseNameInput);
      expenseItem.appendChild(newExpenseAmountInput);
      expenseItem.appendChild(saveButton);
      expenseItem.appendChild(cancelButton);

      // Event listener to save the changes
      saveButton.addEventListener("click", function() {
        expenseNameElem.textContent = newExpenseNameInput.value;
        expenseAmountElem.textContent = `-$${newExpenseAmountInput.value}`;

        // Update the balance after editing
        balanceInput.value =
          parseFloat(balanceInput.value) +
          parseFloat(
            expenseAmountElem.textContent.replace("$", "").replace("-", "")
          ) -
          parseFloat(newExpenseAmountInput.value);

        // Revert the buttons to the original state
        expenseItem.innerHTML = "";
        expenseItem.appendChild(expenseNameElem);
        expenseItem.appendChild(expenseAmountElem);
        expenseItem.appendChild(actionTextElem);
        expenseItem.appendChild(deleteButton);
        expenseItem.appendChild(editButton);
      });

      // Event listener to cancel the edit
      cancelButton.addEventListener("click", function() {
        // Revert to the original values
        expenseItem.innerHTML = "";
        expenseItem.appendChild(expenseNameElem);
        expenseItem.appendChild(expenseAmountElem);
        expenseItem.appendChild(actionTextElem);
        expenseItem.appendChild(deleteButton);
        expenseItem.appendChild(editButton);
      });
    });
  }
}

// Function to add money (deposit)
function addMoney() {
  if (balanceInput2.value === "") {
    return; // Don't proceed if input is empty
  } else {
    // Create a new paycheck item div
    const paycheckItem = document.createElement("div");
    paycheckItem.classList.add("output-items");

    // Create the inner elements for paycheck name and amount
    const paycheckNameElem = document.createElement("h4");
    paycheckNameElem.style.paddingLeft = "5px";
    paycheckNameElem.textContent = "Paycheck";

    const paycheckAmountElem = document.createElement("h4");
    paycheckAmountElem.style.color = "green";
    paycheckAmountElem.textContent = `$${balanceInput2.value}`;

    const actionTextElem = document.createElement("h4");
    actionTextElem.textContent = "";

    const deleteButton = document.createElement("button");
    deleteButton.style.backgroundColor = "red";
    deleteButton.style.color = "white";
    deleteButton.style.height = "20px";
    deleteButton.style.position = "relative";
    deleteButton.style.top = "20px";
    deleteButton.style.right = "10px";
    deleteButton.textContent = "x";

    // Append inner elements to the paycheck item div
    paycheckItem.appendChild(paycheckNameElem);
    paycheckItem.appendChild(paycheckAmountElem);
    paycheckItem.appendChild(actionTextElem);
    paycheckItem.appendChild(deleteButton);

    // Append the new paycheck item to outerDiv
    outerDiv.appendChild(paycheckItem);

    // Update the balance after adding the paycheck
    balanceInput.value =
      parseFloat(balanceInput.value) + parseFloat(balanceInput2.value);

    // Clear the deposit input
    balanceInput2.value = "";

    // Event listener for the delete button
    deleteButton.addEventListener("click", function() {
      outerDiv.removeChild(paycheckItem); // Remove the paycheck item
      balanceInput.value =
        parseFloat(balanceInput.value) -
        parseFloat(paycheckAmountElem.textContent.replace("$", ""));
    });
  }
}
