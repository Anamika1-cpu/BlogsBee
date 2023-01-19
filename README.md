
# BlogsBee

![Logo](https://res.cloudinary.com/dcua2wckz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672762999/Blogs_Bee_vh2z1m.jpg)

BlogsBee is a web application  

• A BLOG web application in which there are 2 panels i.e Admin Panel and User Panel.

• In user panel user will be able to create a blog after registration and Login.

• Furthermore,the user can edit it’s blog (i.e. update or delete). User can see all the posts created by other user, user can
follow and unfollow other user and like dislike other user’s post.

• In Admin Panel,admin can do all the things but there are some aditional features like admin can create categories from
which user can select while creating post.

• Admin can block any user, if admin will find out the user’s unwanted behaviour
## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB



## Author

- [@Anamika](https://github.com/Anamika1-cpu)


## 🛠 Skills
MongoDB, ExpressJS, ReactJS, NodeJS, TailwindCSS, JWT


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

MONGODB_URI 

JWT_TOKEN_EXPIRE = "10d"

JWT_KEY

CLOUDINARY_CLOUD

CLOUDINARY_API_KEY 

CLOUDINARY_SECRET_KEY 

SMPT_MAIL 

SMPT_PASSWORD 

SMPT_SERVICE = "gmail"
## Screenshots
![App Screenshot](https://res.cloudinary.com/dcua2wckz/image/upload/v1672822715/pag1_wict89.jpg)

![App Screenshot](https://res.cloudinary.com/dcua2wckz/image/upload/v1672822707/page2_hhgzvd.jpg)

![App Screenshot](https://res.cloudinary.com/dcua2wckz/image/upload/v1672822703/page3_dxwbib.jpg)

![App Screenshot](https://res.cloudinary.com/dcua2wckz/image/upload/v1672822698/page4_ykksrm.jpg)

![App Screenshot](https://res.cloudinary.com/dcua2wckz/image/upload/v1672822614/page5_pkwjit.jpg)



## Run Locally (Backend)

Clone the project

```bash
  git clone https://github.com/Anamika1-cpu/BlogsBee
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```
Here, you have to replace the value of resetURL from 2 controllers (i.e.,resetPasswordToken and generateVerificationMail ) in controllers/user/userCntrl.js
```bash
    //generateVerificationMail
    const resetURL = `https://localhost:3000/${verificationToken}`;
    
    //resetPasswordToken
    const resetURL = `https://localhost:3000/${token}`;
    
    
```


Start the server

```bash
  npx nodemon
```


## Run Locally (Frontend)

Clone the project

```bash
  git clone https://github.com/Anamika1-cpu/BlogsBee
```

Go to the project directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Change the url from src/utils/baseUrl

```bash
export const baseUrl = "http://localhost:5000";
```

Start the server

```bash
  npm start
```
## Contributing
- Take a look at the existing [Issues](https://github.com/Anamika1-cpu/BlogsBee/issues) 
- Fork the Repo create a branch for any issue that you are working on and commit your work.
- Create a ** [Pull Request](https://github.com/Anamika1-cpu/BlogsBee/pulls), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes that are included in your commits.

## How to make a Pull Request?

**1.** Start by forking the [**BlogsBee**](https://github.com/Anamika1-cpu/BlogsBee) repository. Click on the <a href="https://github.com/Anamika1-cpu/BlogsBee/fork"><img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a> symbol at the top right corner.

**2.** Clone your forked repository:

```bash
git clone https://github.com/<your-github-username>/BlogsBee.git
```

**3.** Navigate to the new project directory:

```bash
cd BlogsBee
```

**4.** Set upstream command:

```bash
git remote add upstream https://github.com/Anamika1-cpu/BlogsBee.git
```

**5.** Create a new branch:

```bash
git checkout -b YourBranchName
```
<i>or</i>
```bash
git branch YourBranchName
git switch YourBranchName
``` 

**6.** Sync your fork or local repository with the origin repository:

- In your forked repository click on "Fetch upstream"
- Click "Fetch and merge".

### Alternatively, Git CLI way to Sync forked repository with origin repository:

```bash
git fetch upstream
```

```bash
git merge upstream/main
```

### [Github Docs](https://docs.github.com/en/github/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for Syncing

**7.** Make your changes to the source code.

**8.** Stage your changes and commit:

⚠️ **Make sure** not to commit `package.json` or `package-lock.json` file

⚠️ **Make sure** not to run the commands ```git add .``` or ```git add *```. Instead, stage your changes for each file/folder

```bash
git add file/folder
```

```bash
git commit -m "<your_commit_message>"
```

**9.** Push your local commits to the remote repository:

```bash
git push origin YourBranchName
```

**10.** Create a [Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)!

**11.** **Congratulations!** You've made your first contribution! 🙌🏼
