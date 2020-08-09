let add=document.querySelector(".add")
let reset=document.querySelector(".reset")
let inputs=document.querySelectorAll(".inputs")
let main=document.querySelector(".main")
let inputDate=document.querySelector("#inputDate")
let objNote={}

// cleaning the inputs
function clean(arr) {
    for(let i=0;i<arr.length;i++)
    {
        arr[i].value=""
    }
}

reset.addEventListener("click",function (e) {
    clean(inputs)
})

add.addEventListener("click",function (e) {

    // checking that the date is in the future
    let taskDate= Date.parse(inputs[1].value)
    let today= new Date()
    let todayDate= today.getTime()
    
    // set today as min date attribute for a input warning message
    let dd = today.getDate()
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear()
    if(dd<10)
    {
        dd="0"+dd
    } 
    if(mm<10)
    {
        mm="0"+mm
    } 
    today = yyyy+"-"+mm+"-"+dd
    document.querySelector("#inputDate").setAttribute("min",today)

    if(inputs[0].value!=""&&inputs[1].value!=""&& taskDate>todayDate)
    {  
        // creating a new object with the input values
        objNote.className="note w3-animate-opacity shadow"
        objNote.trash={}
        objNote.trash.className="trash fa fa-trash-o"
        objNote.text={}
        objNote.text.className="text"
        objNote.text.innerText=inputs[0].value
        objNote.date={}
        objNote.date.className="date"
        objNote.date.innerText=inputs[1].value
        objNote.thereIsAhour=false
        objNote.id=todayDate
        
        // conecting the object to html 
        let note=document.createElement("div")
        note.className=objNote.className
        note.id=objNote.id
        let trash=document.createElement("i")
        trash.className=objNote.trash.className
        let text=document.createElement("p")
        text.className=objNote.text.className
        text.innerText=objNote.text.innerText
        let date=document.createElement("date")
        date.className=objNote.date.className
        date.innerText=objNote.date.innerText
        main.appendChild(note)
        note.appendChild(trash)
        note.appendChild(text)
        note.appendChild(date)

        // checking if there is any info about the hour and connecting to the object and to html
        if(inputs[2].value!="")
        {
            objNote.thereIsAhour=true
            objNote.hour={}
            objNote.hour.className="hour"
            objNote.hour.innerText=inputs[2].value
            let hour=document.createElement("p")
            hour.className= objNote.hour.className
            hour.innerText= objNote.hour.innerText
            note.appendChild(hour)
        }
        
        let objString=JSON.stringify(objNote)
        localStorage.setItem(note.id,objString)
        clean(inputs)   
    }
    else if(taskDate<todayDate && inputs[0].value=="")
    {
        console.log("the date you choose isn't in the future & you must choose name task, try again")
    }
    else if(taskDate<todayDate && inputs[0].value!="")
    {
        console.log("the date you choose isn't in the future, try again")
    }
    else
    {
        console.log("there isn't name for the task, try again")
    }

    // the deleting task action
    let notes=document.querySelectorAll(".note")
    for(let j=0; j<notes.length; j++)
    {
        notes[j].addEventListener("mouseenter",function (e) {
            e.target.children[0].style.display="flex"
                e.target.children[0].addEventListener("click",function (e) {
                    main.appendChild(notes[j])
                    main.removeChild(e.target.parentElement)
                    delete localStorage[e.target.parentElement.id]
                    })
            })
        notes[j].addEventListener("mouseleave",function (e) {
            e.target.children[0].style.display="none"
        })
    }
})
// when the web-page is refreshed, this for loop imports the saves from the local storage
let counter=0
for (const key in localStorage)
    {
        counter++
        if(counter<=localStorage.length)
        {
        let save=JSON.parse(localStorage[key])

        let note=document.createElement("div")
        note.className=save.className
        note.id=save.id
        let trash=document.createElement("i")
        trash.className=save.trash.className
        let text=document.createElement("p")
        text.className=save.text.className
        text.innerText=save.text.innerText
        let date=document.createElement("date")
        date.className=save.date.className
        date.innerText=save.date.innerText
        main.appendChild(note)
        note.appendChild(trash)
        note.appendChild(text)
        note.appendChild(date)

        if(save.thereIsAhour)
        {
            let hour=document.createElement("p")
            hour.className=save.hour.className
            hour.innerText=save.hour.innerText
            note.appendChild(hour)
        }

    let notes=document.querySelectorAll(".note")
    for(let j=0; j<notes.length; j++)
    {
        notes[j].addEventListener("mouseenter",function (e) {
            e.target.children[0].style.display="flex"
                e.target.children[0].addEventListener("click",function (e) {
                    main.appendChild(notes[j])
                    main.removeChild(e.target.parentElement)
                    delete localStorage[e.target.parentElement.id]
                })
        })
    notes[j].addEventListener("mouseleave",function (e) {
        e.target.children[0].style.display="none"
    })
    }
}
}