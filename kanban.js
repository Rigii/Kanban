document.addEventListener("DOMContentLoaded", function (event) {

// Table body and "add button"
    function renderTable() {
        let root=document.querySelector('.kanban');
        let but= document.createElement('span');
        but.id= 'button';
        but.innerText='CREATE TASK';
        let tree= document.createElement('table');
        tree.className='table';
<<<<<<< HEAD:kanban.js
        tree.innerHTML='<thead>' +
=======
        tree.innerHTML='<tr>' +
>>>>>>> cb201ce3bdfd6b2f0fbc3ce16b14c2af03476bcf:kanban.js
            '<th class="stage head">TO DO</th>' +
            '<th class="stage head">IN PROCESS</th>' +
            '<th class="stage head">DONE</th>' +
            '<th class="stage head">CANCELED</th>' +
<<<<<<< HEAD:kanban.js
            '</thead>'+
            '<tbody class="bodyTable">'+
=======
            '</tr>'+
            '<tr class="bodyTable">'+
>>>>>>> cb201ce3bdfd6b2f0fbc3ce16b14c2af03476bcf:kanban.js
            '<td id="initial" class="stage forSort"></td>' +
            '<td id="in_progress" class="stage forSort"></td>' +
            '<td id="done" class="stage forSort"></td>' +
            '<td id="aborted" class="stage forSort"></td>' +
<<<<<<< HEAD:kanban.js
            '</tbody>';
=======
            '</tr>';
>>>>>>> cb201ce3bdfd6b2f0fbc3ce16b14c2af03476bcf:kanban.js
            root.appendChild(but)
        root.appendChild(tree)
    }
    renderTable();


// Tasks creation function
    function renderTask() {
    	var root= document.querySelector('.kanban');
        var list = document.getElementsByClassName('forSort');
        var table = document.querySelector(".table");
        var initial = document.getElementById('initial');
        var in_progress = document.getElementById('in_progress');
        var done = document.getElementById('done');
        var aborted = document.getElementById('aborted');

// Task creation form
        function modalWind(props) {
            let headTask = props.headTask === undefined ? '' : props.headTask;
            let textTask = props.textTask === undefined ? '' : props.textTask;
            let modDiv = document.createElement('div');
            modDiv.className = 'galWind';
            let container = document.createElement('div');
            container.className = 'modContent';
            if (props.onlyPriority == false) {
                container.innerHTML =
                    '<h3>Enter a title for the task </h3><br>' +
                    '<input id="taskName" type="text" style="width:20vw" value="' + headTask + '"><br>' +
                    '<h3>Task description</h3><br>' +
                    '<textarea id="taskContent" rows="10" style="width:30vw" name="text">' + textTask + '</textarea><br>' +
                    '<input class="radio" id="333" type="radio" name="priority" value="red">First priority<br/>' +
                    '<input class="radio" id="332" type="radio" name="priority" value="yellow" checked>Medium priority<br/>' +
                    '<input class="radio" id="331" type="radio" name="priority" value="blue">Low priority<br/>' +
                    '<button id="createBut" style="display: '+props.create+'; float: left">Create task</button>' +
                    '<button id="redBut" style="display:'+props.redact+'; float: left">Redact</button>' +
                    '<button class="closeRed" style="float: right">Close</button>';
            } else {
                container.innerHTML = '<input class="radio" id="333" type="radio" name="priority" value="red">High priority<br/>' +
                    '<input class="radio" id="332" type="radio" name="priority" value="yellow" checked>Medium priority<br/>' +
                    '<input class="radio" id="331" type="radio" name="priority" value="blue">Low priority<br/>' +
                    '<button id="redBut" style="display:'+props.redact+'; float: left">Redact</button>' +
                    '<button class="closeRed" style="float: right">Close</button>';
            }
            modDiv.appendChild(container);
            root.appendChild(modDiv)
        }

// New task, body
function bodyTask(props){
 let taskForRender= document.createElement('div');
 console.log(props.color)
            taskForRender.id = props.id;
            taskForRender.className= props.class;
            taskForRender.style.background=props.color;
            taskForRender.innerHTML = '<div class="taskWindReady"><div class="tskName"><h4>' + props.name + '</h4></div><p>' + props.content + '</p>' +
                '<p>' + props.date + '</p>' +
                '<img class="delTask" src="img/ico/del.png" alt="del" style="display: none; cursor: pointer">' +
                '<img class="cancel" src="img/ico/cancel.png" alt="cancel" style="cursor: pointer">' +
                '<img class="redact" src="img/ico/redact.png" alt="redact" style="cursor: pointer">' +
                '<img class="pushRight" height="27" style="float:right; cursor: pointer" src="img/ico/right.png" alt="pushRight"></div>';
return taskForRender
}
        function taskBody() {
            let taskName = document.getElementById('taskName');
            let taskContent = document.getElementById('taskContent');
            let date = moment().format('MMMM Do YYYY, h:mm:ss a');
            let timeIndex = moment().format('DDMMYYYYHmmss');
            let radio = document.getElementsByClassName('radio');

            let taskArr={
                id: timeIndex,
                name: taskName.value,
                content: taskContent.value,
                date: date   
            };
            for (i in radio) {
                if (radio[i].checked) {
                    taskArr.color= radio[i].value;
                    taskArr.class = radio[i].id;
                }
            }
            localStorage.setItem('initial'+timeIndex, JSON.stringify(taskArr));
            let newTask=bodyTask(taskArr);
            initial.appendChild(newTask);
        }

        //Edit task function
        function redactTaskBody(props) {
            let taskName = document.getElementById('taskName');
            let taskContent = document.getElementById('taskContent');
            let date = moment().format('MMMM Do YYYY, h:mm:ss a');
            let radio = document.getElementsByClassName('radio');
            let taskId = props.taskId;
            let target = document.getElementById(taskId);
            let taskArr=JSON.parse(localStorage.getItem(props.parentClass+props.taskId));
            if (props.onlyPriority == true) {
                for (i in radio) {
                    if (radio[i].checked) {
                        taskArr.color = radio[i].value;
                        taskArr.class = radio[i].id;
                    }
                }
            } else {
                    taskArr.id=props.taskId, 
                    taskArr.name= taskName.value,
                    taskArr.content= taskContent.value,
                    taskArr.date= date
                for (i in radio) {
                    if (radio[i].checked) {
                        taskArr.color = radio[i].value;
                        taskArr.class = radio[i].id;
                    }
                }
            }
            console.log(taskArr)
                 target.outerHTML = bodyTask(taskArr).outerHTML;
                 
                 localStorage.setItem(props.parentClass+props.taskId, JSON.stringify(taskArr))
        }

// Button state
        function displayBut(props) {

            let delTask = props.getElementsByClassName('delTask');
            let cancel = props.getElementsByClassName('cancel');
            let pushRight = props.getElementsByClassName('pushRight');
            let redact = props.getElementsByClassName('redact');
            let parent = props.parentNode;

            if (parent == in_progress || parent == initial) {delTask[0].style.display = 'none'} ;
            if (parent == done ||  parent == aborted){ delTask[0].style.display = 'inline-block'};
            if (parent == done) {
                cancel[0].style.display = 'none';
                pushRight[0].style.display = 'none';
                redact[0].style.display = 'none';
            }
            if (parent == aborted) {
                cancel[0].style.display = 'none';
                pushRight[0].style.display = 'none';
                redact[0].style.display = 'none';
            }
        }

// Task-button action
        function buttonAction() {
            root.addEventListener('click',
                function replace_delete(event) {

                    let parentTd = (event.target.parentNode.parentNode).parentNode;
                    let parent = event.target.parentNode.parentNode;
                    let headTask = event.target.tagName=='IMG'? parent.querySelector('h4').innerText: '';
                    let textTask = event.target.tagName=='IMG'? parent.querySelector('p').innerText: '';
                    let galWind = document.querySelector(".galWind");
                
                if (event.target.className === "closeRed") {
                    	  root.removeChild(galWind) 
                    }
                      if (event.target.id === "button") {
                    	 modalWind({onlyPriority: false, create: 'inline-block', redact:'none'});   
                    }

                     if (event.target.id === "createBut") {
                    	 document.getElementById('taskName').value==''? alert('Input task name'):
                         taskBody();
                         displayBut(parent);
                         parentTd.removeChild(parent);
                         sortNodes();
                    }
                    
                    if (event.target.className === "pushRight") {
                        parentTd.nextElementSibling.appendChild(parent);
                        localStorage.setItem(parentTd.nextElementSibling.id+parent.id, localStorage[parentTd.id+parent.id]);
                        localStorage.removeItem(parentTd.id+parent.id)

                        displayBut(parent);
                        sortNodes();
                    }
                    if (event.target.className === "delTask") {
                      console.log(parentTd.className.replace('stage', '')+parent.id)
                        parentTd.removeChild(parent);
                        localStorage.removeItem(parentTd.id+parent.id)
                        sortNodes()
                    }
                    if (event.target.className === "cancel") {

                        aborted.appendChild(parent);
                        localStorage.setItem(aborted.id+parent.id, localStorage[parentTd.id+parent.id]);
                        localStorage.removeItem(parentTd.id+parent.id)
                        displayBut(parent);
                        sortNodes()  
                    }
                    if (event.target.className === "redact") {
                        let targObj = parent;
                        parentTd == initial ? modalWind({
                            onlyPriority: false,
                            headTask: headTask,
                            textTask: textTask,
                            create: 'none', 
                            redact:'inline-block'
                        }) 
                        : modalWind({onlyPriority: true, create:'none', redact:'inline-block'});
                        document.getElementById('redBut').onclick = function () {
                            parentTd == initial ? redactTaskBody({
                                    taskId: targObj.id,
                                    taskClass: targObj.className,
                                    onlyPriority: false,
                                    parentClass: 'initial'
                                }) :
                                redactTaskBody({taskId: targObj.id, taskClass: targObj.className, onlyPriority: true, parentClass: 'in_progress'});
                            sortNodes()
                        }
                    }
                })
        }
        buttonAction();

//Sorting tasks by date, priority and creating localStorage
        function sortNodes() {
            for (i = 0; i < list.length; i++) {
                var items = list[i].childNodes;
                var itemsArr = [];
                for (var n in items) {
                    if (items[n].nodeType === 1) { // get rid of the whitespace text nodes
                        itemsArr.push(items[n]);
                    }
                }
                let timeSort = itemsArr.sort(function (a, b) {
                    return +(a.id) == +(b.id) ? 0 : (+(a.id) < +(b.id) ? -1 : 1);
                });
                timeSort.sort(function (a, b) {
                    return +(a.className) == +(b.className) ? 0 : (+(a.className) > +(b.className) ? -1 : 1);
                });
                for (y = 0; y < itemsArr.length; ++y) {
                    list[i].appendChild(itemsArr[y]);
                }
            }
        }
// LocaleStorage render
function renderLocalStorage(){
           for (var key in localStorage) {
           let sortageKey= key.replace(/[0-9]/g, '')
           let sortageId= key.replace(/\D+/g,"");
           let json=JSON.parse(localStorage.getItem(key));
console.log(json)
if(json!= null){
          let taskForRender=bodyTask(json)

if(sortageKey==='initial'){initial.appendChild(taskForRender);
 displayBut(document.getElementById(sortageId))}
if(sortageKey==='in_progress'){in_progress.appendChild(taskForRender)
displayBut(document.getElementById(sortageId))}
if(sortageKey==='done'){done.appendChild(taskForRender)
displayBut(document.getElementById(sortageId))}
if(sortageKey==='aborted'){aborted.appendChild(taskForRender)
displayBut(document.getElementById(sortageId))}
sortNodes()
}
}
}
renderLocalStorage()
    }
    renderTask();

});

