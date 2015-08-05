var User = require('../user.js');

var Story = require('../story.js');

var config = require('../config');

var secretKey = config.secretKey;

var express = require('express');

var api = express.Router();

var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {
    return jsonwebtoken.sign({
        _id: user._id,
        username: user.username
    }, secretKey, {
        expiresInMins: 1200
    })
}

api.post('/signup',function(req,res) {

    var user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    user.save(function (err) {
        if (err) {
            res.send(err)
            return;
        }
        res.json({message: 'User has been created'})
    })
});

api.get('/users', function(req,res) {
    User.find({}, function(err,users) {
        if (err) {
            res.send(err);
            return;
        }
        res.json(users);
    })
})

api.post('/login', function(req,res) {
    User.findOne({
            username: req.body.username
        }).select('password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({message: "User does not exist"})
            }
            else {
                var validPassword = user.comparePasswords(req.body.password)
                if (validPassword) {
                    var token = createToken(user);
                    res.json(token);
                }
                else {
                    res.send('Invalid Password')
                }
            }
        })
    }
);

api.use(function(req,res,next) {
    console.log('Visitor entered site');

    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    if (token) {
        jsonwebtoken.verify(token,secretKey,function (err,decoded) {
            if (err) {
                res.status(403);
                res.send('Invalid token')
            }
            else {
                req.decoded = decoded;
                console.log(req.decoded)
                console.log('Valid token');
                next();
            }
        })

    }

    else {
        res.status(403);
        res.send('No token received')
    }
});


api.route('/story')
    .get(function(req, res) {
        Story.find({}, function(err,users) {
            if (err) {
                res.send(err);
                return;
            }
            res.json(users);
        })

    })
    .post(function(req, res) {
        var story = new Story({
            author: req.decoded._id,
            content: req.body.content
        });

        story.save(function (err) {
            if (err) {
                res.send(err);
                return;
            }
            res.json({message: 'Story has been created'})
        })
    })
;


module.exports = api;



