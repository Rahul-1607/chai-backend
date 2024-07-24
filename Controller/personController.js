// const express = require('express')
// const router = express.Router() 
// const Person = require('../models/Person')

// router.post('/', async (req, res) => {
//     try {
//         console.log("data set process ")
//       const data = req.body;
//       const newPerson = new Person(data)
//       const response = await newPerson.save();
//       console.log('data saved')
//       res.status(200).json(response)
//       console.log(response)
//     } catch (err) {
//       console.log(err)
//       res.status(500).json({ error: 'Data is not fetched'})
//     }
//   })

//   router.get('/', async(req,res) => {
//     try {
//         const response = await Person.find();
//         console.log('work');
//         res.status(200).json(response);
//         console.log('data fetched successfully')
//     } catch (error) {
//       console.log(err)
//       res.status(500).json({ error: 'Data is not fetched'})
//     }
//   })
  
// router.get('/:workType', async (req, res) => {
//     try {
//       const workType = req.params.workType;
//       if (workType == 'chef' || workType == 'manager' || workType == 'manager') {
//            const response = await find.Person({work:workType});
//            console.log('response fetched')
//            res.status(200).json(response);
//       }
//       else {
//         res.status(404).json({error : 'invalid workType'})
//       }
//     } catch (error) {
//       console.log(err)
//       res.status(500).json({error: 'Internal server error:'})
//     }
//   })

// module.exports = router;