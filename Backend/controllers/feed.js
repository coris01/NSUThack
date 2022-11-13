const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Expense = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
    Expense.find()
        .then(posts => {
            res.status(200).json({
                message: 'Fetched posts successfully!',
                posts: posts
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    // const currentPage = req.query.page || 1;
    // const perPage = 2;
    // let totalItems;
    // Expense.find()
    //     .countDocuments()
    //     .then(count => {
    //         totalItems = count;
    //         return Expense.find()
    //             .skip((currentPage - 1) * perPage)
    //             .limit(perPage);
    //     })
    //     .then(posts => {
    //         res.status(200).json({
    //             message: 'Fetched posts successfully!',
    //             posts: posts,
    //             totalItems: totalItems
    //         });
    //     })
    //     .catch(err => {
    //         if (!err.statusCode) {
    //             err.statusCode = 500;
    //         }
    //         next(err);
    //     });
};

exports.createPosts = (req, res, next) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Entered data is incorrect!, Validation failed');
        error.statusCode = 422;
        throw error;
    }
    // const year = req.body.year;
    // const month = req.body.month;
    // const day = req.body.day;
    // console.log(typeof req.body.date);
    const date = req.body.date;
    const amount = req.body.amount;
    const title = req.body.title;
    // const imageUrl = req.file.path.replace("\\" ,"/");
    let creator;
    const post = new Expense({
        // year: year,
        // month: month,
        // day: day,
        date: date,
        amount: amount,
        title: title,
        creator: req.userId
    });
    // console.log(post);
    post.save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.posts.push(post);
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                "Message": "Post Added successfully!",
                post: post,
                creator: {
                    _id: creator._id,
                    name: creator.name
                }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

