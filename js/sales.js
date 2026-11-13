export function attachSaleForm(onSale) {
  const form = document.querySelector("#sale-form");
  const message = document.querySelector("#sale-message");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    message.textContent = "";
    message.classList.remove("error");
    const data = new FormData(form);
    const quantity = Number(data.get("quantity"));
    const discount = Number(data.get("discount"));
    try {
      onSale({ productId: data.get("product"), quantity, discount });
      form.elements.quantity.value = "1";
      form.elements.discount.value = "0";
      message.textContent = "Sale recorded and dashboard updated.";
    } catch (error) {
      message.textContent = error.message;
      message.classList.add("error");
    }
  });
}
