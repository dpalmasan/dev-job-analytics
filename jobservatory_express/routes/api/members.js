const express = require('express');

const router = express.Router();
const members = [{ id: 1, name: 'juanito', age: 40 }];

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const data = members.filter((v) => v.id === Number(req.params.id));
  if (data.length > 0) {
    res.json(data);
  } else {
    res.status(400).json({ message: 'Member not found' });
  }
});

router.post('/', (req, res) => {
  const newMember = {
    id: Math.floor(Math.random() * 1000),
    name: req.body.name,
    age: req.body.age,
    status: 'active',
  };
  if (!newMember.name || !newMember.age) {
    res.status(400).json({ message: 'Please fill data correctly' });
  } else {
    members.push(newMember);
    res.send(members);
  }
});

router.put('/:id', (req, res) => {
  const dataIndex = members.findIndex((v) => v.id === Number(req.params.id));
  if (dataIndex) {
    const newValue = req.body;
    members[dataIndex] = { ...members[dataIndex], ...newValue };
    res.json(members);
  } else {
    res.status(400).json({ message: 'Member not found' });
  }
});

router.delete('/:id', (req, res) => {
  const dataIndex = members.findIndex((v) => v.id === Number(req.params.id));
  if (dataIndex) {
    members.splice(dataIndex, 1);
    res.json(members);
  } else {
    res.status(400).json({ message: 'Member not found' });
  }
});

module.exports = router;
