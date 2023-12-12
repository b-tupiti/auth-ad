signInBtn = document.getElementById('sign-in');

signInBtn.addEventListener('click', function(e){
    e.preventDefault();
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()  
        },
        body: JSON.stringify({
            'username': username,
            'password': password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if(data['status'] == 200){
            console.log(data['user']);
        }
        else if(data['status'] == 403){
            console.log('Unauthorized');
        }
    })
    .catch(error => {
        console.error('Error during request:', error);
    });

})


// Function to get CSRF token from cookies
function getCSRFToken() {
    token = document.querySelector("input[name='csrfmiddlewaretoken']").value;
    return token;
}


const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}