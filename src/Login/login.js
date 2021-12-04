import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import bg from "./img/bg.jpg";

const Login = () => {
	const navigate = useNavigate();

	const [email, setemail] = useState("");
	const [pwd, setpwd] = useState("");

	useEffect(() => {
		let val = localStorage.getItem("gid");
		if (!(val === null)) {
			val = val.split(",");
			axios
				.post("http://127.0.0.1:8000/api/check/", {
					email: val[0],
					password: val[1],
				})
				.then((data) => {
					if (data.status === 200) {
						if (data.data.Data === "yes") {
							navigate("/");
						} else {
							localStorage.removeItem("gid");
						}
					} else {
						localStorage.removeItem("gid");
					}
				});
		}
	}, []);

	const handleChangeemail = (e) => {
		setemail(e.target.value);
	};

	const handleChangepwd = (e) => {
		setpwd(e.target.value);
	};

	const handleLogin = () => {
		if (!(email === "" || pwd === "")) {
			if (email.includes("@")) {
				axios
					.post("http://127.0.0.1:8000/api/login/", {
						email: email,
						password: pwd,
					})
					.then((data) => {
						if (data.status === 202) {
							alert("sucess");
							localStorage.setItem("gid", [
								data.data.Data.email,
								data.data.Data.password,
							]);
							navigate("/");
						} else {
							alert("Some error, please try again!");
						}
					});
			} else {
				alert("Please write proper email!");
			}
		} else {
			alert("Please fill the boxes!");
		}
	};

	const handleSignup = () => {
		navigate("/signup");
	};

	return (
		<Screen>
			<BG src={bg} />
			<Box>
				<IMGtag>
					<IMG src={bg} />
					<Text>
						<p>LOGIN</p>
					</Text>
				</IMGtag>
				<Signupbox>
					<Name></Name>
					<Email>
						<Title>
							<p>Email</p>
						</Title>
						<Input>
							<InputBox
								value={email}
								onChange={handleChangeemail}
							/>
						</Input>
					</Email>
					<Pwd2></Pwd2>
					<Pwd>
						<Title>
							<p>Password</p>
						</Title>
						<Input>
							<InputBox
								type="password"
								value={pwd}
								onChange={handleChangepwd}
							/>
						</Input>
					</Pwd>
					<Num></Num>
					<Send>
						<But onClick={handleLogin}>Submit</But>
					</Send>
				</Signupbox>
			</Box>
			<ButSignup onClick={handleSignup}>
				<Sign>SIGNUP</Sign>
			</ButSignup>
		</Screen>
	);
};

const Sign = styled.div`
	width: 120px;
	height: 60px;
	background-color: rgb(0, 98, 204);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

	&:hover {
		background-color: transparent;
		border: 1px solid rgb(0, 98, 204);
		cursor: pointer;
		color: white;
	}
`;

const ButSignup = styled.div`
	width: 100%;
	height: 60px;
	margin-top: 20px;
	z-index: 2;
	display: flex;
	justify-content: center;
`;

const But = styled.div`
	width: 120px;
	height: 60px;
	background-color: rgb(0, 98, 204);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;

	&:hover {
		background-color: transparent;
		border: 1px solid rgb(0, 98, 204);
		cursor: pointer;
		color: black;
	}
`;

const InputBox = styled.input`
	border-bottom: 1px solid black;
	border-left: none;
	border-right: none;
	border-top: none;
	background-color: rgb(225, 225, 225);
	margin-left: 10px;
	width: 85%;

	&:focus-visible {
		border-bottom: 1px solid black;
		outline: none;
	}
`;

const Input = styled.div`
	height: 50%;
	width: 100%;
`;

const Title = styled.div`
	height: 50%;
	width: 100%;
	margin-left: 10px;
`;

const Name = styled.div`
	height: 16.6%;
	width: 100%;
`;

const Email = styled.div`
	height: 16.6%;
	width: 100%;
`;

const Pwd = styled.div`
	height: 16.6%;
	width: 100%;
`;

const Pwd2 = styled.div`
	height: 7.6%;
	width: 100%;
`;

const Num = styled.div`
	height: 16.6%;
	width: 100%;
`;

const Send = styled.div`
	height: 16.6%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BG = styled.img`
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 0;
	filter: blur(8px);
`;

const Signupbox = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgb(225, 225, 225);
`;

const Text = styled.div`
	position: absolute;
	height: 50px;
	width: 145px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgb(40, 96, 144);
	top: 20%;
	color: white;
	font-size: 35px;
	left: 30%;
	font-family: "Roboto Mono", monospace;
	&:hover {
		cursor: pointer;
	}
`;

const IMGtag = styled.div`
	width: 50%;
	height: 100%;
`;

const IMG = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Box = styled.div`
	border: 1px solid black;
	width: 50%;
	height: 70%;
	display: flex;
	flex-direction: row;
	z-index: 1;
`;

const Screen = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export default Login;
