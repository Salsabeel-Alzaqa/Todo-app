# Todo App

You should run this project : https://github.com/Salsabeel-Alzaqa/ExpressJS-Advanced 

and edit the app.js file : 

```javascript
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5500;
app.use(cors({
  origin: "*",
}));
app.use(express.static("public"));
// Parse JSON requests
app.use(express.json());
const todosRouter = require('./todos');
app.use(todosRouter);

// Handle not found routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`open http://localhost:${port}`);
});
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Screenshots

![image](https://github.com/Salsabeel-Alzaqa/Todo-app/assets/107882635/6407a214-88f5-49d0-8115-e88e6e06dd62)

![image](https://github.com/Salsabeel-Alzaqa/Todo-app/assets/107882635/53868b5c-2f81-4390-b686-b45fbeccd9f2)



