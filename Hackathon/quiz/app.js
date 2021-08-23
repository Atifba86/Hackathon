let ressignup = () => {
    let name = document.getElementById("resname");
    let email = document.getElementById("resemail");
    let country = document.getElementById("rescountry");
    let city = document.getElementById("rescity");
    let password = document.getElementById("respass");

    let user = {
        name: name.value,
        email: email.value,
        country: country.value,
        city: city.value,
        password: password.value
    }


    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            alert("sucess")
            var user = {
                name: name.value,
                email: email.value,
                password: password.value

            }
            firebase.database().ref(`users/${userCredential.user.uid}`).set(user)
                .then(() => {
                    // alert("User register hogaya")
                    window.location = "login.html"
                })
            console.log(user)
            // ...
        })

        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            console.log(errorCode)
            // ..
        });
}

let Login = () => {
    var email = document.getElementById("useremail");
    var pass = document.getElementById("userpass");
    let data = {
        email: email.value,
        pass: pass.value
    }

    firebase.auth().signInWithEmailAndPassword(email.value, pass.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            firebase.database().ref(`users/${userCredential.user.uid}`).on('value', (data) => {
                console.log(data.val().name)
            })
            // localStorage.setItem("user",JSON.stringify(data.val()))
            location.href = "./dashboard/index.html"
            
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in, see docs for a list of available properties
                    // https://firebase.google.com/docs/reference/js/firebase.User
                    var uid = user.name
                    console.log(uid)
                    // ...
                } else {
                    // User is signed out
                    // ...
                }
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            console.log(errorCode)
        });
}
let logout = () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        localStorage.removeItem("user")
        location.href="login.html"
    }).catch((error) => {
        console.log(error)
        // An error happened.
    });
}

// let nowuser=()=>{

// }



let products = [
    {
        name: "Item1",
        price: 12,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrputZL2ItlxOH_6FhfLbIgM-H0_FGcFVIYQ&usqp=CAU"
    },
    {
        name: "Item2",
        price: 10,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXEflc3O1Sd9eJtTg0J9y6QG2pCCcexqWu6w&usqp=CAU"
    },
    {
        name: "Item3",
        price: 6,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToIV0R0LwA4gjCbRE-cXq6u45WNlmvU_Um-Q&usqp=CAU"
    },
    {
        name: "Item4",
        price: 6,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhKs9uPOEtQUIqC0Tq78wBBsE2GOdmoWaiA&usqp=CAU"
    },
   
    
]

let main = document.getElementById('products');

for (var i = 0; i < products.length; i++) { 
    main.innerHTML += `<div class="hidden" style="width: 18rem; padding:15px;" >
    <img src="${products[i].image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${products[i].name}</h5>
        <p class="card-text">${products[i].price} Ruppes per plate</p>
        <a href="#" onclick='addToCart("${products[i].name}","${products[i].price}","${products[i].image}")' class="btn btn-primary">ADD TO CART</a>
    </div>
</div>
    `
}

let allCarts = [];
let carts = localStorage.getItem('carts')

if (carts !== null) {
    allCarts = JSON.parse(carts)
    let cart_badge = document.getElementById('cart_badge');
    // cart_badge.innerHTML = allCarts.length
}

function addToCart(name, price, image) {
    let cart = {
        name,
        price,
        image
    }
    allCarts.push(cart)
    localStorage.setItem('carts', JSON.stringify(allCarts))
    let cart_badge = document.getElementById('cart_badge');
    cart_badge.innerHTML = allCarts.length
}

