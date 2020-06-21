

export const signup = user => {
    //console.log(name, email, password);
   return fetch(`http://localhost:8000/api/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json', 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};

export const signin = user => {
    //console.log(name, email, password);
   return fetch(`http://localhost:8000/api/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json', 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    });
};


//save data in local storage
export const authenticate = (data, next) => {
    //check for window object, coz local storage is a property of window object, if we have window object then only we can access local storage
    if(typeof window !== "undefined") {
//to save anything in localstorage, we can use method setItem(key, what is it want to save(json object) in localstorage with this key)
        localStorage.setItem('jwt', JSON.stringify(data));
        //next() is redirect to home, update the state
        next();
    }
};


//when we click signout, 1st we remove token from local storage and then we make request to backend that we are logged out, 
//and we also need to redirect the user to home page
//this call back is used for redirect
export const signout = (next) => {
    if(typeof window !== "undefined") {
        //to remove anything in localstorage, we can use method setItem(key)
                localStorage.removeItem('jwt');
                //next() is redirect to home, update the state(callback)
                next();
                //request to backend so that user is logged out
                //fetch is used to make request
                return fetch(`http://localhost:8000/api/signout`,{
                    method: "GET",
                })
                //then we get response
                .then(response => {
                    console.log("signout", response);
                })
                //or catch the error
                .catch(err => console.log(err));
            }
};


//conditionally show and hide signup, signout, signin links
// for this we need to access user from local storage, for this we need to create helper method in auth index.js
//helper method= isauthenticated, it will return true and return the user if user is authenticated or it will return false
//jwt has token + user information, we can use user info in menu.js, to conditionally show and hide signup, signout, signin links
//if not authenticated show signin and signout
export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false
    }
    //if it is present in local storage we want to get itemwith key "jwt"
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem("jwt"));
    }
    else{
        return false;
    }
};