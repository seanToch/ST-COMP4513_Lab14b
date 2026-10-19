const express = require('express'); 
const supa = require('@supabase/supabase-js'); 
const app = express(); 

const supaUrl = 'https://yhwweiewrolhszbjzpbt.supabase.co'; 
const supaAnonKey = 'sb_publishable_Ag3gbrmRGF2S3PlJirrBVQ_Neanc5JR'; 

const supabase = supa.createClient(supaUrl, supaAnonKey);

app.get('/f1/status', async (req, res) => { 
const {data, error} = await supabase 
.from('status') 
.select(); 
res.send(data); 
}); 


app.get('/f1/seasons', async (req, res) => { 
const {data, error} = await supabase 
.from('seasons') 
.select(); 
res.send(data); 
}); 


app.get('/f1/races', async (req, res) => { 
const {data, error} = await supabase 
.from('races') 
.select(` raceId, year, round, name, circuits (name,location,country) `)
.eq('year',2020) 
.order('round', { ascending: false }); 
res.send(data); 
}); 


app.get('/f1/results/:race', async (req, res) => { 
const {data, error} = await supabase 
.from('results') 
.select(` 
raceId, resultId, positionOrder, races (year, name),  
drivers (forename,surname), constructors (name) 
`)    
.eq('raceId',req.params.race) 
.order('positionOrder', { ascending: true }); 
res.send(data); 
});



app.listen(8080, () => { 
console.log('listening on port 8080'); 
console.log('http://fuzzy-space-cod-qgxq56j57gw347qj-8080.app.github.dev/f1/status'); 
}); 