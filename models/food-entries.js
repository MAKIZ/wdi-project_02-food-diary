const db = require('../db/config');

const foodEntry = {};

foodEntry.findAll = (date,userid) => {
	console.log(date);
	return db.query(`
		SELECT * FROM food_entries 
		WHERE date = $1 AND user_id = $2
		ORDER BY time 
	`, [date,userid]);
}

foodEntry.findById = (id,date,userid) => {
	return db.oneOrNone(`
		SELECT * FROM food_entries 
		WHERE id = $1 AND 
		date = $2 AND
		user_id = $3`
		,[id,date,userid]);
} 

foodEntry.create = (entry, userid) => {
	return db.one(`
		INSERT INTO food_entries
		(name, date, time, cals, details,user_id)
		VALUES ($1, $2, $3, $4,$5,$6)
		RETURNING *
	`, [entry.name, entry.date, entry.time, entry.cals, entry.details,userid]);	
}

foodEntry.update = (entry, id) => {
	return db.none(`
		UPDATE food_entries SET
			name = $1,
			date = $2,
			time = $3,
			cals = $4,
			details = $5
			WHERE id= $6
	`, [entry.name, entry.date, entry.time, entry.cals, entry.details,id]);
}

foodEntry.delete = id => {
	return db.none(`
		DELETE FROM food_entries
		WHERE id = $1
	`,[id]);
};

//gets total calories for day
foodEntry.dailyCals = (date,userid) => {
	return db.one(`
		SELECT SUM(cals) FROM food_entries 
		WHERE date = $1 AND user_id = $2
	`,[date,userid]);
}

module.exports = foodEntry;