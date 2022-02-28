console.log('good');
fetch('')
.then(res => res.json())
.then(data=> console.log(data));