import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    set,
    remove
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js'

import {
    getStorage,
    uploadBytes,
    ref as storageRef,
    getDownloadURL
} from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js'

const firebaseConfig = {
    apiKey: "AIzaSyC46a7kxlPZfeKPwpzdtDNN8H-NtocgRAo",
    authDomain: "event-app-b57d8.firebaseapp.com",
    projectId: "event-app-b57d8",
    storageBucket: "event-app-b57d8.appspot.com",
    messagingSenderId: "513777219570",
    appId: "1:513777219570:web:44778508298524c7561d6b",
    measurementId: "G-0XK29GLKP1"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app)
const storage = getStorage(app)
// login, register form and slider start code

const registerBtn = document.getElementById('register_btn')
const loginBtn = document.getElementById('login_btn')
const registerForm = document.getElementById('register_form')
const loginForm = document.getElementById('login_form')
const formDisplay = document.getElementById('form_display')
const cancelRegisterBtn = document.getElementById('cancel_register_btn')
const cancelLoginBtn = document.getElementById('cancel_login_btn')
const registerNow = document.getElementById('register_now')
const loginNow = document.getElementById('login_now')
const carouselExampleFade = document.getElementById('carouselExampleFade')
const eventForm = document.getElementById('event_form')
const createEvent = document.getElementById('create_event')
const cancelEventForm = document.getElementById('cancel_event_form')
const logout = document.getElementById('logout')
const eventContainer = document.getElementById('event_container')
const event = document.getElementById('event')
// console.log(eventContainer);
// console.log(carouselExampleFade);

// const userImgInput = document.getElementById('user_img_input')
// let user_img_url = null
// let userInfo = null
// let anotherUser = null
// let userUid = null
// console.log(loginForm, registerForm);
// byDefult()
// function byDefult(){
//     registerForm.style.display = "none"
//     loginForm.style.display = "none"
// }



registerNow.addEventListener('click', () => {
    registerForm.style.display = "block"
    loginForm.style.display = "none"
})

loginNow.addEventListener('click', () => {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
})

cancelRegisterBtn.addEventListener('click', () => {
    registerForm.style.display = "none"
    carouselExampleFade.style.display = "block"
})

cancelLoginBtn.addEventListener('click', () => {
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "block"
})

formDisplay.addEventListener('click', () => {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
    carouselExampleFade.style.display = "none"
})


createEvent.addEventListener('click', () => {
    eventForm.style.display = "block"
    registerForm.style.display = "none"
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "none"
    eventContainer.style.display = "none"

})

cancelEventForm.addEventListener('click', () => {
    eventForm.style.display = "none"
    carouselExampleFade.style.display = "block"
    eventContainer.style.display = "block"
})

event.addEventListener('click', () => {
    eventForm.style.display = "none"
    registerForm.style.display = "none"
    loginForm.style.display = "none"
    carouselExampleFade.style.display = "none"
    eventContainer.style.display = "block"
})

// login, register form and slider end code

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        registerForm.style.display = "none"
        loginForm.style.display = "none"
        carouselExampleFade.style.display = "block"
        formDisplay.style.display = "none"
        logout.style.display = "block"
        // getUserInfo()
        // if (condition) {

        // }
        getEvents()
        getUserInfo()
        // ...
    } else {
        // registerForm.style.display = "block"
        // loginForm.style.display = "block"
        carouselExampleFade.style.display = "block"
        formDisplay.style.display = "block"
        logout.style.display = "none"
        //...
    }
});


function getUserInfo(uid) {
    const userRef = ref(db, 'users', auth.currentUser.uid)
    onValue(userRef, (snapshot) => {
        const datahai = snapshot.exists();
        // return datahai
        
        if (datahai) {
            // list_container.innerHTML = null
            snapshot.forEach(userdata => {
                const userinfo =  userdata.val()
                console.log(userinfo.name);
                // console.log(userdata.val());
                //  console.log(userinfo.name);
            })
                        
    };
})
// console.log(datahai);
}



registerBtn.addEventListener('click', () => {
    const userName = document.getElementById('user_name')
    const registerEmail = document.getElementById('register_email')
    const registerPassword = document.getElementById('register_password')
    console.log(userName.value, registerEmail.value, registerPassword.value);
    createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
        .then(userCredential => {
            const user = userCredential.user
            const obj = {
                name: userName.value,
                email: registerEmail.value,
                // image: user_img_url,
                id: user.uid
            }
            console.log('user--->', user)
            const userRef = ref(db, `users/${user.uid}`)
            console.log('userRef--->', userRef)
            set(userRef, obj)
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            // alert(errorMessage)
        })

})


loginBtn.addEventListener('click', () => {
    const loginEmail = document.getElementById('login_email')
    const loginPassword = document.getElementById('login_password')
    const comfirmLoginPassword = document.getElementById('comfirm_login_password')
    console.log(loginEmail.value, loginPassword.value);
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
        .then(userCredential => {
            const user = userCredential.user
            console.log('user--->', user)
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log('errorMessage--->', errorMessage)
        })
})


// function getUserInfo() {
//     get(child(ref(db), `users/${auth.currentUser.uid}`))
//         .then(snapshot => {
//             if (snapshot.exists()) {
//                 console.log(snapshot.val())
//                 userInfo = snapshot.val()
//                 document.getElementById('user_img_navbar').src = userInfo.userimg
//             } else {
//                 console.log('No data available')
//             }
//         })
//         .catch(error => {
//             console.error(error)
//         })
// }

// userImgInput.addEventListener('change', () => {
//     const imgRef = storageRef(storage, `users/${this.files[0].name}`)
//     uploadBytes(imgRef, this.files[0])
//         .then(snapshot => {
//             getDownloadURL(imgRef)
//                 .then(url => {
//                     const userimg = document.getElementById('user_img')
//                     userimg.src = url
//                     user_img_url = url
//                 })
//                 .catch(err => console.error(err))
//         })
// })



const submitEvent = document.getElementById("submitEvent");
// console.log(submitEvent);
submitEvent.addEventListener('click', () => {
    // const eventInput = document.getElementById("eventInput").value;
    const eventName = document.getElementById("eventName").value;
    const numOfPeople = document.getElementById("numOfPeople").value;
    const location = document.getElementById("location").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const startTime = document.getElementById("startTime").value;
    const endTime = document.getElementById("endTime").value;
    const eventDescription = document.getElementById("eventDescription").value;

    const EventRef = ref(db, `Events/${auth.currentUser.uid}`)
    const newEventRef = push(EventRef)
    console.log("eventref", EventRef)
    const obj = {
        // eventInput : eventInput,
        eventName: eventName,
        numOfPeople: numOfPeople,
        location: location,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        eventDescription: eventDescription,
    }
    set(newEventRef, obj)
    eventForm.style.display = "none"
    carouselExampleFade.style.display = "block"
    eventContainer.style.display = "block"
})



function getEvents() {
    const eventRef = ref(db, `Events/${auth.currentUser.uid}`)
    onValue(eventRef, snapshot => {
        const isDataExist = snapshot.exists()
        // console.log(isDataExist);
        if (isDataExist) {
            snapshot.forEach(childSnapshot => {
                // console.log(childSnapshot);
                const childData = childSnapshot.val()
                const childKey = childSnapshot.key
                // console.log("childKey==>", childKey);
                // console.log('childData=>', childData)
                let datebreak = childData.startDate
                const getYear = datebreak.slice(0, 4)
                const getMonth = datebreak.slice(5, 7)
                const getDate = datebreak.slice(8, 10)

                let timebreak = childData.startTime
                let hours = timebreak.slice(0, 2)
                // console.log(hours);
                const minutes = timebreak.slice(3, 5)
                if (hours > 12) {
                    hours = hours - 12 + " : " + minutes + " PM"
                    // console.log(hours);
                } else
                    if (hours == 12) {
                        hours = hours + " : " + minutes + " PM"
                        // console.log(hours);
                    } else
                        if (hours < 12) {
                            hours = hours + " : " + minutes + " AM"
                            // console.log(hours);
                        }

                let date = new Date()
                date.setDate(getDate)
                date.setFullYear(getYear)
                date.setMonth(getMonth - 1)
                date = date.getDay()
                if (date == 0) { var day = 'Sunday' } else
                    if (date == 1) { var day = 'Monday' } else
                        if (date == 2) { var day = 'Tuesday' } else
                            if (date == 3) { var day = 'Wednesday' } else
                                if (date == 4) { var day = 'Thursday' } else
                                    if (date == 5) { var day = 'Firday' } else
                                        if (date == 6) { var day = 'Saturday' }


                if (getMonth == 1) { var month = 'January' } else
                    if (getMonth == 2) { var month = 'February' } else
                        if (getMonth == 3) { var month = 'March' } else
                            if (getMonth == 4) { var month = 'April' } else
                                if (getMonth == 5) { var month = 'May' } else
                                    if (getMonth == 6) { var month = 'June' } else
                                        if (getMonth == 7) { var month = 'July' } else
                                            if (getMonth == 8) { var month = 'August' } else
                                                if (getMonth == 9) { var month = 'September' } else
                                                    if (getMonth == 10) { var month = 'October' } else
                                                        if (getMonth == 11) { var month = 'November' } else
                                                            if (getMonth == 12) { var month = 'December' }
                const eventCard = `<div class="eventCard ">  
                        <img src="data:image/jpeg;base64,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">
                        <span >This ${day}, ${getDate}, ${month}  At ${hours} </span>
                        <div class="fs-3 fw-bold">${childData.eventName}</div>
                        <span ><b>loction:</b> ${childData.location}</span>    <br>
                        <span ><b>Member:</b> ${childData.numOfPeople}</span>
                        <span class="deletBtn" id="${childKey}"><i class="fa-solid fa-trash"></i></span>
                </div>`
                // console.log("eventCard--->", eventCard);
                eventContainer.innerHTML += eventCard
                setTimeout(() => {
                    const deleteBtn = document.getElementById(childKey)
                    console.log(deleteBtn);
                    deleteBtn.addEventListener('click', deleteFunc)
                }, 1000)
            })
        }
    })
}
function deleteFunc() {
    const eventRef = ref(db, `Events/${auth.currentUser.uid}/${this.id}`)
    // console.log(eventRef);
    remove(eventRef)
}




logout.addEventListener('click', logoutFunc)
function logoutFunc() {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch(error => {
            // An error happened.
        })
}
