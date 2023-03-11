<div align="center">
  
# BlogsBee

![Logo](https://res.cloudinary.com/dcua2wckz/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1672762999/Blogs_Bee_vh2z1m.jpg)

 **BlogsBee is a web application**
 
</div>

• A BLOG web application in which there are 2 panels i.e Admin Panel and User Panel.

• In user panel user will be able to create a blog after registration and Login.

• Furthermore,the user can edit it’s blog (i.e. update or delete). User can see all the posts created by other user, user can
follow and unfollow other user and like dislike other user’s post.

• In Admin Panel,admin can do all the things but there are some aditional features like admin can create categories from
which user can select while creating post.

• Admin can block any user, if admin will find out the user’s unwanted behaviour

## Tech Stack

- **Client:** React, Redux, TailwindCSS

- **Server:** Node, Express

- **Database:** MongoDB

## 🛠 Skills
- MongoDB
- ExpressJS 
- ReactJS 
- NodeJS 
- TailwindCSS
- JWT


## Environment Variables

_To run this project, you will need to add the following environment variables to your .env file_

- Take a look at [Environment file](./env.md) and add it to your machine accordingly.
 
<br>


## BlogsBee in Action
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
## 💥 How to Contribute to Blogsbee?
- Take a look at the existing [Issues](https://github.com/Anamika1-cpu/BlogsBee/issues) 
- Fork the Repo create a branch for any issue that you are working on and commit your work.
- Create a ** [Pull Request](https://github.com/Anamika1-cpu/BlogsBee/pulls), which will be promptly reviewed and given suggestions for improvements by the community.
- Add screenshots or screen captures to your Pull Request to help us understand the effects of the changes that are included in your commits.

## How to make a Pull Request?
- Take a look at [Pull request guide](.github/Pull_request_guide.md)

##  Project Admin

<table>
	<tr>
		<td align="center">
			<a href="https://github.com/Anamika1-cpu">
				<img src="https://avatars.githubusercontent.com/u/65862556?v=4" width="100px" alt="" />
				<br /> <sub><b>Anamika1-cpu</b></sub>
			</a>
			<br /> <a href="https://github.com/Anamika1-cpu"> 
		👑 Admin
	    </a>
		</td>
	</tr>
</table>


## Miscellaneous
Do consider looking at other paradigms of this documentation
  - [License used](/LICENSE.md)
  - [Code Of Conduct](/.github/Code_of_Conduct.md)
  - [How to contribute?](.github/Pull_request_guide.md)
