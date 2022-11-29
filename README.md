# Social Network

* [GitHub repository](https://github.com/luizborges146/Social-Network-API) Link to the repository<br />
* [Video Link](https://drive.google.com/file/d/1OUi2RFas420mWW6Tdm6aaUoPfdzBriSj/view) This is the video showing the application<br />

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


    
## Table of Contents
    
1.  [Description](#description)
2.  [Instalation](#instalation)
3.  [Usage Infomration](#usage)
4.  [External support documentation](#externalDoc)
5.  [Tests](#tests)
6.  [Social](#social)
7.  [Plugins](#plugins)
8.  [License](#license)
    
## [Description](#description)
The idea of this application is to be able to manipulate the data using routes from express, with that in mind, the user can choose from checking Users, User by ID, Create, Update and Delete users, also add and delete friends, not only manipulate the users data, you can also Create, Read Update and Delete "thoughts" and "reactions" from the database. The idea is to create an easy Social Network.


![alt Create a new user](assets/images/mongoDb.gif)


## [Instalation](#instalation)
In order to use test this application, you will be able to run the NPM INSTALL and then NPM START.

    
## [Usage](#usage)
Simple to use.
 * Functionalities.
   * Check all User, Thought and Reaction.
   * Check for a specific User, Thought and Reaction.
   * Create a new User, Thought and Reaction.
   * Update User, Thought and Reaction.
   * Delete User, Thought and Reaction.



#### The route below is a get request to identify a specific user by ID
```
getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
```

#### Code below use regex to confirm if the email contain the required information
```
email: {
			type: String,
			required: true,
			unique: true,
			validate: {
                validator: function (email) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
                },
                message: props => `${props.value} is not a valid email!`
            }
		},
```

  

## [External support documentation](#externalDoc)
    

- [W3School](https://www.w3schools.com/)<br />
- [Mozilla](https://developer.mozilla.org)<br />
- [READ.me](https://docs.readme.com/docs/linking-to-pages")<br />
- [GitHub](https://pages.github.com/)<br />
- [npm inquirer GitHub link](https://github.com/SBoudrias/Inquirer.js/blob/master/README.md#installation)<br />
- [npm mongoose](https://mongoosejs.com/docs/validation.html)<br />
- [npm](https://www.npmjs.com/)<br />
- [Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)<br />


    
## [Tests](#tests)
N/A
    
## [Social](#social)
if you need any further information or support, please, send an email to: luiz.borges.146@gmail.com
    
[<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/github.svg' alt='github' height='40'>](https://github.com/luizborges146) [<img src='https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg' alt='linkedin' height='40'>](https://www.linkedin.com/in/luiz-borges-2377b7142/)
    
    
    
## [Plugins](#plugins)
N/A
    
## [License](#license)
License Information: [MIT](https://opensource.org/licenses/MIT);

Created by Luiz Borges
Please refer to the LICENSE in the repo.
