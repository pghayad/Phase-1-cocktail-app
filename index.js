document.querySelector('#drink-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const drinkInput = document.querySelector('#drinkInput').value;
    const drink = {
        name: drinkInput,
        likes: 0
    }
    addDrink(drink)
})

//drink is an object
function addDrink(drink){
    const configObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(drink)
    }
    fetch('http://localhost:3000/posts', configObj)
    .then(resp => resp.json())
  
    .then(drink => {
        console.log(drink)

        //slapping the drink name on the DOM
        const div = document.createElement('div');
        const p = document.createElement('p');
        const deleteBtn = document.createElement('button');
        const addBtn = document.createElement('button')
        const likes = document.createElement('b');
        drink.likes=0;
        likes.innerText = drink.likes;
        likes.id = 'b' + drink.id;
        
        deleteBtn.innerHTML = 'Delete';
        addBtn.innerText = '+'
        div.id = "div" + drink.id
        div.style.border = "5px solid black"

        if(drink.strDrink === undefined){
            div.append(drink.name)
        }else{
            div.append(drink.strDrink)
        }
        
        div.append(deleteBtn);
        div.append(addBtn)
        div.append(likes)
        deleteBtn.addEventListener('click', deleteDrink)

        addBtn.addEventListener('click', () => {
            drink.likes++
            document.querySelector(`#b${drink.id}`).innerHTML = drink.likes;
            updateDrink(drink)
        })

        document.querySelector('#cocktail').append(div);
    }) 
}


document.querySelector('#search-form').addEventListener('submit', function(e){
    e.preventDefault()
    const input = document.querySelector('#searchInput').value;
    searchDrink(input)
})

function searchDrink(drink){
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`
    fetch(url)
    .then(res => res.json())
    .then(drinks => {

        console.log(drinks)
        drinks.drinks.forEach(drink => {
            const li = document.createElement('li')
            const deleteBtn = document.createElement('button')
            const addBtn = document.createElement('button')
            deleteBtn.innerText = 'X'
            addBtn.innerText = '+'
            drink.likes=0;
            deleteBtn.addEventListener('click', function(e){

            })

            addBtn.addEventListener('click', function(e){
                addDrink(drink)
            })

            li.innerText = drink.strDrink
            li.append(deleteBtn)
            li.append(addBtn)
            document.querySelector('#results').appendChild(li)
        })
    })
}

function renderDOM(){

}



function deleteDrink(drink) {
    //console.log(drink.id)
    //console.log(this)
    console.log(this.parentElement)
    //this.remove()
    this.parentElement.remove()
    const id = this.parentElement.id.slice(3);
    
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(drink => console.log(drink))
}



function init(){
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(drinks => {
        console.log(drinks)
        drinks.forEach(drink => {
            const div = document.createElement('div');
            const deleteBtn = document.createElement('button');
            const addBtn = document.createElement('button')
            const likes = document.createElement('b');
            likes.innerText = drink.likes;
            console.log(drink.strDrink)
            console.log(drink.name)
            //can write if/else for .strDrink and .name
            if(drink.strDrink === undefined){
                div.append(drink.name)
            }else{
                div.append(drink.strDrink)
            }
            div.style.border = "5px solid black"
            likes.id = "b" + drink.id;
            div.id = "div" + drink.id
            deleteBtn.innerHTML = 'Delete';
            addBtn.innerHTML = '+';
            deleteBtn.addEventListener('click', deleteDrink)
            addBtn.addEventListener('click', () => {
                drink.likes++
                document.querySelector(`#b${drink.id}`).innerHTML = drink.likes;
                updateDrink(drink)
            })
            
            div.append(deleteBtn)
            div.append(addBtn)
            div.append(likes)
            document.querySelector('#cocktail').appendChild(div)
            //deleteDrink(drink)
            //console.log(drink)
            //
        })
    })
}


function updateDrink(drink){
    // const newDrink = document.querySelector('#newDrink').value;
    // drink.strDrink = newDrink;
  
    fetch(`http://localhost:3000/posts/${drink.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: drink.likes }),
    });
    
    document.querySelector(`#b${drink.id}`).innerHTML=drink.likes;
}

init();