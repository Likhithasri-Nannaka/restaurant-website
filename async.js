document.getElementById("orderForm").addEventListener("submit", Submit);
async function Submit(e) {
  e.preventDefault();
  // get type, name, date, and amount
  let table = document.getElementById("table").value;
  let dish = document.getElementById("dish").value;
  let amount = document.getElementById("amount").value;
  if (table != "chooseOne" && dish.length > 0 && amount > 0) {
    const order = {
      table,
      dish,
      amount,
    };
    try {
      await axios.post(
        "https://crudcrud.com/api/c03672aed50246208aed9ee4ea72f8b8/expenseData",
        order
      );
    } catch (error) {
      console.log(error);
    }
  }
  document.getElementById("orderForm").reset();
  showOrders();
}

async function showOrders() {
  const orderTable = document.getElementById("orderTable");
  orderTable.innerHTML = "";
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/c03672aed50246208aed9ee4ea72f8b8/expenseData"
    );
    for (let i = 0; i < response.data.length; i++) {
      orderTable.innerHTML += `
            <tr>
                <td>${response.data[i].table}</td>
                <td>${response.data[i].dish}</td>
                <td>₹ ${response.data[i].amount}</td>
                <td><button class="btn btn-danger" onclick="deleteOrder('${response.data[i]._id}')">
                  Delete</button></td>
            </tr>
        `;
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteOrder(_id) {
  try {
    await axios.delete(
      `https://crudcrud.com/api/c03672aed50246208aed9ee4ea72f8b8/expenseData/${_id}`
    );
  } catch (error) {
    console.log(error);
  }
  showOrders();
}
showOrders();