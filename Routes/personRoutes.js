const express = require('express')
const router = express.Router() 
const Person = require('../models/Person')
const {jwtAuthMiddleware, generateToken} = require('./../jwt')

//----------------------- login route --------------------
router.post('/login', async (req, res) => { 
    try {
        console.log("data set process ")
      const {username,password} = req.body;
  
      const user =  await Person.findOne({username:username})
      
      if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json({error:'invalid username or password'})
      }

      // generate token
      const payload = {
          id:user.id,
          username:user.username
      }
      console.log(payload);
      
    // generate token
    const token = generateToken(payload)
    res.json({token});
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Internal server error'})
    }
  })

  // ------------ --   Sign Up route -----------------------
  router.post('/signup',async(req,res) => {

    try {
      const data=req.body;
      const newPerson = new Person(data);
      const response = await newPerson.save()
      console.log('data saved');
   
    const payload = {
      id: response.id, 
      username : response.username
    }
    console.log(JSON.stringify(payload))
    const token = generateToken(payload);

    console.log('token is',token);
    res.status(200).json({response:response,token:token});
    console.log(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error:'Data is not fetched:'})
    }
  })

  //-------------------- get all person---------------------
  router.get('/',jwtAuthMiddleware,async(req,res) => {
    try {
        const response = await Person.find();
        console.log('work');
        res.status(200).json(response); 
        console.log('data fetched successfully')
    } catch (error) {
      console.log(err)
      res.status(500).json({ error: 'Data is not fetched'})
    }
  })
  
router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType;
      if (workType == 'chef' || workType == 'manager' || workType == 'manager') {
           const response = await find.Person({work:workType});
           console.log('response fetched')
           res.status(200).json(response);
      }
      else {
        res.status(404).json({error : 'invalid workType'})
      }
    } catch (error) {
      console.log(err)
      res.status(500).json({error: 'Internal server error:'})
    }
  })
    
  router.put('/:id',async (req,res) => {
    try {
        const PersonId = req.params.id;
        const updatePersonData = req.body;

        const response = await Person.findByIdAndUpdate(PersonId,updatePersonData,{
        new: true, // Return the updated document;
        runValidators:true, //Run mongoose validation
        })

        if(!response) {
            return res.status(404).json({error:'Person not found:'})
        }
        console.log('data updated:'); 
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error:'});
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
        const PersonId = req.params.id;
        const response = await Person.findByIdAndDelete(PersonId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data removed:');
        res.status(200).json({ response });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' });
    }
});

module.exports = router; 