// async function validateSignUp(){
//     alert("signup")
// }
// sessionStorage.setItem('jwt', '');
//validate to sign up
async function validateSignUp(e){
    event.preventDefault();

    let password = document.getElementById('sign-up-password').value;
    let confirm = document.getElementById('confirm-password').value;
    
    let agreeToTerms = document.getElementById('agree-to-terms');
    if(password.length < 8){
        let pass_req = document.getElementById('password-requirement');
        pass_req.style.color='red';
        return
    }
    
    if (password !== confirm){
        let pass_err = document.getElementById('password-mismatch');
        pass_err.innerHTML='passwords do not match';
        pass_err.style.color='red';
        pass_err.style.fontSize='xx-small';      
        return;
    }
    let name = document.getElementById('sign-up-name').value;
    let email = document.getElementById('sign-up-email').value;
    if (!(agreeToTerms.checked)){
        let err = document.getElementById('error-output');
        err.innerHTML='please read and agree to terms of service';
        err.style.color='red';
        err.style.fontSize='xx-small';
        return
    }else{
        if (validateEmail(email)){
        
        const response = await fetch('http://localhost:3000/auth/signup', {
                method:'POST',
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                    'content-Type':'application/json'
                },
                redirect: 'follow', 
                referrerPolicy: 'no-referrer',
                body:JSON.stringify({
                    name:name,
                    email:email,
                    password:password
                })
            })
            const data = await response.json();
            if (response.status === 201) {
                // Store the JWT in a cookie
                //document.cookie = `jwt=${data.token}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/;`;
                // Redirect to the "home.html" page

                // store the JWT in sessionStorage
                sessionStorage.setItem('jwt', data.access_token)
                sessionStorage.setItem('user_id', data.user_id)
                sessionStorage.setItem('signed-in', false)
                console.log(data)

                localStorage.setItem('name', name);
                // console.log(data.access_token)
                // alert('You are successfully signed up');
                
                window.location.href = '../home.html';
            } else {
                console.error(data.message);
                alert('invalid credentials. Please try again')
                window.location.href = '../sign-in-Sign-up/sign-up.html'
            } 
            
              
        }
    }
    

}
document.getElementById("sign-in-form").addEventListener("submit", validateSignIn);



// helper function to validate email
function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

async function validateSignIn(e) {
    e.preventDefault();

    let email = document.getElementById('sign-in-email').value;
    // alert(email)
    let password = document.getElementById('sign-in-password').value;
    // alert(password)
    
    const response = await fetch('http://localhost:3000/auth/signin', {
        method:'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin',
        headers: {
            'content-Type':'application/json'
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer',
        body:JSON.stringify({
            email:email,
            password:password
        })
    })
    const data = await response.json();
    alert(response.status)
            if (response.status === 200) {
                // Store the JWT in a cookie
                //document.cookie = `jwt=${data.token}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/;`;
                // Redirect to the "home.html" page

                // store the JWT in sessionStorage
                sessionStorage.setItem('jwt', data.access_token)
                sessionStorage.setItem('user_id', data.user_id)
                sessionStorage.setItem('signed-in', true)
                // console.log(data)
                // console.log(data.access_token)
                alert('You are successfully signed up');
                window.location.href = '../destination.html';
            } else {
                console.error(data.message);
            } 
    

}
async function addProfilePicture() {

    const formData = new FormData();
    const d = document.getElementById('pfpic').files[0]
    formData.append("file", d);
    alert("here")
    alert(formData)
    const response = await fetch('http://localhost:3000/avatars/upload', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': "Bearer "+ sessionStorage.jwt,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData
    })
    alert("Response")
    alert(response)
    const data = await response.json();
}

async function updateProfilePicture() {

    const formData = new FormData();
    const d = document.getElementById('pfpic').files[0]
    formData.append("file", d);
    alert("here")
    alert(formData)
    const response = await fetch('http://localhost:3000/avatars/upload', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': "Bearer "+ sessionStorage.jwt,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: formData
    })
    alert("Response")
    alert(response)
    const data = await response.json();
}

async function getProfilePicture() {

    const response = await fetch('http://localhost:3000/avatars', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': "Bearer " + sessionStorage.jwt,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    const data = await response.json();
    console.log(data)

    // tag = "<img src=''>"
    document.getElementById('profilePic').src = "../uploads/" + data.imagePath
    // alert(data)
}

async function deleteProfilePicture() {
    const response = await fetch('http://localhost:3000/avatars', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': "Bearer " + sessionStorage.jwt,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    const data = await response.json();
}



