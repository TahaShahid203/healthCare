const express = require("express");
const dbOperation = require('../dbFiles/dbOperation');
const app = express();
const cors = require("cors");
const { password } = require("../dbFiles/dbConfig");
const PORT = 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const database = [];
const generateID = () => Math.random().toString(36).substring(2, 10);

app.post("/register", async (req, res) => {
	const { username, email, password } = req.body;
	let user = {
		username: username,
		password: password,
		role: 'patient',
		Email: email
	};
	let existingAccount = await dbOperation.getUserByUserNameWithoutPassword(username);
	if (existingAccount.recordset[0]===undefined)
	{
		
		await dbOperation.createUser(user);
		return res.json({ message: "Account created successfully!" });
	}

	// if (result.length === 0) {
	// 	database.push({
	// 		id: generateID(),
	// 		username,
	// 		password,
	// 		email,
	// 		timezone: {},
	// 		schedule: [],
	// 	});
	// }
	res.json({ error_message: "User already exists!" });
});

app.post("/login", async (req, res) => {
	const { username, password } = req.body;
	let result = await dbOperation.getUserByUserName(username, password)
	if (result.recordset[0] === undefined){
		return res.json({
			error_message: "No such Account Exists",
		})
	}
	// console.log(result.recordset[0].role);
	return res.json({
		message: "Login successfully",
		data: {
			_id: result.recordset[0].PersonID,
			_email: result.recordset[0].Email,
			_role: result.recordset[0].role,
		},
	});
});

app.post("/schedule/create", (req, res) => {
	const { userId, timezone, schedule } = req.body;
	let result = database.filter((db) => db.id === userId);
	result[0].timezone = timezone;
	result[0].schedule = schedule;
	res.json({ message: "OK" });
});

app.get("/schedules/:id", (req, res) => {
	const { id } = req.params;
	let result = database.filter((db) => db.id === id);
	if (result.length === 1) {
		return res.json({
			message: "Schedules successfully retrieved!",
			schedules: result[0].schedule,
			username: result[0].username,
			timezone: result[0].timezone,
		});
	}
	return res.json({ error_message: "Sign in again, an error occured..." });
});

app.post("/schedules/:username", (req, res) => {
	const { username } = req.body;
	let result = database.filter((db) => db.username === username);
	if (result.length === 1) {
		const scheduleArray = result[0].schedule;
		const filteredArray = scheduleArray.filter((sch) => sch.startTime !== "");
		return res.json({
			message: "Schedules successfully retrieved!",
			schedules: filteredArray,
			timezone: result[0].timezone,
			receiverEmail: result[0].email,
		});
	}
	return res.json({ error_message: "User doesn't exist" });
});

// let user = {
// 	username: 'tahaShahid',
// 	password: 'dustbin12',
// 	role: 'patient',
// 	Email: 'tahashahid203@gmail.com'
// }

// dbOperation.createUser(user).then(console.log("DID IT"));
// // let Pam = new Employee(1002, 'Pam', 'Weasley', 29, 'Female')
// // console.log(Pam);

// // dbOperation.createEmployee(Pam).then(dbOperation.getEmployees().then(res => {
// // 	console.log(res);
// // }))


// const getUser = async()=>{
// 	let user = await dbOperation.getUserByUserName('tahaShahid89', 'dustbin12')
// 	console.log(user.recordset[0]===undefined);
// }
// getUser();


app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
