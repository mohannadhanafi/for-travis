const field = select('#field');
const submit = select('#submit');
const mainDiv = select('.main');
const result = create('div');
submit.addEventListener('click', (e) => {
  result.textContent = '';
  result.classList = 'result';
  mainDiv.appendChild(result);


  e.preventDefault();
  const fieldValue = field.value;
  if (fieldValue.trim() === '') {
    alert('The text filed is empty');
    return;
  }
  fetch('/weather', fieldValue, (res) => {
    const div1 = create('div');
    div1.classList = 'box1';
    result.appendChild(div1);
    if (res.cod === '404') {
      div1.textContent = res.message;
      return;
    }


    const heading = create('h3');
    heading.textContent = 'The tempreture : ';
    div1.appendChild(heading);


    const temp = create('span');
    temp.textContent = Math.round(res.main.temp - 273.15);
    div1.appendChild(temp);

    const div2 = create('div');
    div2.classList = 'box2';
    result.appendChild(div2);


    const heading2 = create('h3');
    heading2.textContent = 'Description';
    div2.appendChild(heading2);


    const desc = create('span');
    desc.textContent = res.weather[0].description;
    div2.appendChild(desc);
  });
});
