document.getElementById("user-name").textContent=localStorage.getItem('name');
document.getElementById("update-Info-form").addEventListener("submit", validateUserInfoChange);


async function validateUserInfoChange(e){
    e.preventDefault()

    const name = document.getElementById("change-name").value;
    const nationality = document.getElementById("change-nationality").value;
    const _age = document.getElementById("change-age").value;
    const age = parseInt(_age)

    const jwt = sessionStorage.getItem('jwt');
    // alert(jwt)
    const userID = sessionStorage.getItem('user_id');
    // alert(userID)
    const signedIn = sessionStorage.getItem('signed-in')
    // alert(signedIn)
    
    if (!signedIn){
        alert('please sign in')
    }    

    const response = await fetch("http://localhost:3000/user", {
        method:'PATCH',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization':'Bearer ' + jwt,
        },
        body:JSON.stringify({
            name,
            nationality,
            age
        }),
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        
    });
    const data = await response.json();
    // alert(!(!data));
    alert(response.status)
    if (response.status === 200) {
        // alert(response.name)
        localStorage.setItem('name', name);
        window.location.href = '../profile.html';
        // const patchResponse = await fetch("http://localhost:3000/user/me", {
        
        // });
    } else if (response.status === 401){
        console.error(data.message);
    }
}

// document.getElementById("delete-account").addEventListener("click", (e) => deleteAcc(e))

document.getElementById("delete-account").addEventListener("click", deleteAcc)
async function deleteAcc(){
    // e.preventDefault()
    const jwt = sessionStorage.jwt
    const response = await fetch("http://localhost:3000/user", {
        method:'DELETE',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            // 'Content-Type' : 'application/json',
            'Authorization':'Bearer ' + jwt,
        },
        // body: {},
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        
    });
    // const data = await response.json();
    if(response.ok){
        window.location.href = '../home.html';
    }else{
        alert('wrong credentials')
        window.location.href = '../home.html';

    }
    // if (response.stat)
}

document.getElementById("log-out-button").addEventListener("click", logOut)
function logOut(){
    sessionStorage.clear()
    localStorage.clear()
    window.location.href = '../home.html';

}