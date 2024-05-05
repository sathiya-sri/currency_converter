const btn = document.querySelector("button");
fetch("https://openexchangerates.org/api/currencies.json")
  .then((res) => res.json())
  .then((data) => {
    let index = Object.entries(data);
    for (let i = 0; i < index.length; i++) {
      let opt = `<option value=${index[i][0]}>${index[i][0]}</option>`;
      document.getElementById("from").innerHTML += opt;
      document.getElementById("to").innerHTML += opt;
    }
  });
btn.addEventListener("click", () => {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const amount = document.getElementById("in1").value;
  let sym = "0";
  if (amount.length != 0) {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i <= data.length; i++) {
          if (to === Object.entries(data[i].currencies)[0][0]) {
            sym = Object.entries(data[i].currencies)[0][1].symbol;
            break;
          }
        }
        fetch(`https://open.er-api.com/v6/latest/USD`)
          .then((result) => result.json())
          .then((data) => {
            let fromval = data.rates[from];
            let toval = data.rates[to];
            if (from != to) {
              let result = (amount / fromval) * toval;
              document.getElementById("inpu").value =
                result.toFixed(3) + " " + sym;
            } else {
              alert("from value and to value must be different...");
            }
          });
      });
  } else alert("Please fill out the amount field!!!");
});
