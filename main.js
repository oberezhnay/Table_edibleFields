let table = $(`<table>`);
let tableBody = $(`<tbody>`);

fetch("https://jsonplaceholder.typicode.com/users")
  .then(function (response) {
    return response.json();
  })
  .then(loadTable)
  .catch(alert);


function loadTable(data) {
  $.each(data[0], function (key, value) {
    if (typeof value !== 'object') {
      th = $(`<th>`);
      th.append(`${key}`).css({
        'border': '1px solid black',
        'font-size': '22px',
        'background-color': 'rgba(0,0,0, 0.1)',
        'position': 'relative',
        'min-width': '55px'
      });
    }
    table.append(th);
  });
let counter=1;
  $('body').append(table);
  $.each(data, function (key, elem) {
    tr = $(`<tr>`);
    $.each(elem, function (index, value) {
      if (typeof value !== 'object') {
        let td=document.createElement('td');
        td.innerHTML = localStorage.getItem(counter)||value;
        tr.append(td);
        counter+=1;
      }
    });
    tableBody.append(tr);
    table.append(tableBody);
    
  });
  $('body').append(table);
  
  function sortRows(index, thName) {
    return function (a, b) {
      let userA = $(a)
        .children("td")
        .eq(index)
        .text();
      let userB = $(b)
        .children("td")
        .eq(index)
        .text();
      return $.isNumeric(userA) && $.isNumeric(userB) ?
        userA - userB :
        userA.toString().localeCompare(userB);
    };
  }
  let titles = Array.from(document.getElementsByTagName("TH"));

  document.addEventListener("click", function (event) {
    if (event.target.tagName === "TH") {
      let target = event.target;
      let thName = target.textContent;
      var thNumb = titles.findIndex(obj => obj.textContent === thName);
      let rows = table
        .find("tr")
        .toArray()
        .sort(sortRows(thNumb, thName));
      $("th").removeClass();
      target.classList.remove("desc");
      target.classList.add("asc");
      target.asc = !target.asc;
      if (!target.asc) {
        rows = rows.reverse();
        target.classList.remove("asc");
        target.classList.add("desc");
      }
      table.append(...rows);
      sortRows(thNumb, thName);
    }
  });

function getPosition(target){
  let columnNumber=target.cellIndex+1;
  let rowNumber=target.parentNode.rowIndex+1;
  let totalColumnNumber=target.parentNode.childElementCount;
 return (totalColumnNumber*(rowNumber-1)+columnNumber);
}

  document.addEventListener('click', function (event) {
    if (event.target.tagName === 'TD') {
      let target = event.target;
      let position= getPosition(target);
      target.innerHTML = `<input type="text" value=''>`;
      target.classList.add('editable');
      const nodeInput = target.querySelector('input');
      nodeInput.focus();
      nodeInput.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
          nodeInput.blur();
          localStorage[position] = nodeInput.value
          nodeInput.parentNode.classList.remove('editable');
        }
      })
    }
  })
}