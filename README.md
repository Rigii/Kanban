# Kanban

Kanban is a SPA for the organization of current tasks. 
Its appearance is four columns and a button "create a task."
When you click on it, a window appears in which you should enter the name and essence of the task.
Also, you can choose the priority of the job displayed in color.
After pressing the button, a task appears in the "TO DO" column.
All tasks in the columns are sorted by priority and creation time.
At different stages of the task execution, you should move it using the dialog button.
The essence of the task can be edited only in the column "TO DO". In the column "IN PROGRESS" it is possible to change the priority.
The task can be canceled by pressing the "Cancel" button in this case it will appear in the "CANCELED" column.
In the columns "DONE" and "CANCELED", the task can be deleted.

### To use the application in other resources, be prepared for the most terrible difficulties in your career as a programmer. Drink a little valerian: 

1. Copy the folder to its root directory. 
2. In the HTML document, in body create a node with the class "kanban".
3. Connect the file "kanban.js" to the "head".

```html 
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>TaskManager</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src='kanban.js'></script>
	<script src="node_modules/moment/min/moment-with-locales.min.js"></script>
</head>
<body>
<div class='kanban'>
</div>
</body>
</html>
```
