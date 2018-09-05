const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
const validStatus = {
  New:true,
  Open:true,
  Assigned:true,
  Fixed:true,
  Verified:true,
  Closed:true
};
const issueFieldType={
  id:'required',
  status:'required',
  owner:'required',
  effort:'optional',
  created:'required',
  completionDate:'optional',
  title:'required'
};

function validIssue(issue){
  for (const field in issueFieldType) {
    const type = issueFieldType[field];
    if(!type){
      delete issue[field]
    }else if(type === 'required' && !issue[field]){
      return `${field} is required!`;
    }
  }

  if(!validStatus[issue.status]){
    return `${issue.status} is not a valid status`;
  }
  return null;
}

const issues = [
  {
    id: 1,
    status: 'Open',
    owner: 'Test1',
    created: new Date('2018-6-21'),
    effort: 5,
    completionDate: undefined,
    title: 'Error in console when  clicking Add'
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Test2',
    created: new Date('2018-6-21'),
    effort: 5,
    completionDate: new Date('2018-6-21'),
    title: 'Missing bottom border and panel'
  }
];

app.all('*',(req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.method=="OPTIONS") res.send(200);/* */
  else  next();
});
app.get('/api/issues', (req, res) => {
  const metadata = { total_count: issues.length };
  res.json({ _metadata: metadata, records: issues });
});
app.post('/api/issues',(req,res)=>{
  const newIssue = req.body;
  newIssue.id = issues.length+1;
  if(!newIssue.status){
    newIssue.status = 'New';
  }
  const err = validIssue(newIssue);
  if(err){
    res.status(422).json({message:`Invalid request : ${err}`});
    return;
  }
  issues.push(newIssue);
  res.json(newIssue);
});

app.listen(3001, () => {
  console.log('App listen at port 3001');
});
