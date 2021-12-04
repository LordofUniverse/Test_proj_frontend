import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import bg from "./img/bg.jpg";

const Signup = () => {
	let navigate = useNavigate();

	const [name, setname] = useState("");
	const [email, setemail] = useState("");
	const [pwd, setpwd] = useState("");
	const [pwd2, setpwd2] = useState("");
	const [num, setnum] = useState("");

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

	const handleChangename = (e) => {
		setname(e.target.value);
	};

	const handleChangeemail = (e) => {
		setemail(e.target.value);
	};

	const handleChangepwd = (e) => {
		setpwd(e.target.value);
	};

	const handleChangepwd2 = (e) => {
		setpwd2(e.target.value);
	};

	const handleChangenum = (e) => {
		setnum(e.target.value.replace(/\D/g, ""));
	};

	const handleSignup = () => {
		if (
			!(
				email === "" ||
				pwd === "" ||
				pwd2 === "" ||
				num === "" ||
				name === ""
			)
		) {
			if (email.includes("@")) {
				if (pwd === pwd2) {
					if (num.length == 10) {
						axios
							.post("http://127.0.0.1:8000/api/signup/", {
								name: name,
								email: email,
								password: pwd,
								number: num,
							})
							.then((data) => {
								if (data.status === 201) {
									alert("sucess");
									navigate("/login");
								} else if (data.status === 226) {
									alert("This email id already exists!");
									setemail("");
									setpwd("");
									setpwd2("");
								} else {
									alert("Some error, please try again!");
									setemail("");
									setpwd("");
									setpwd2("");
								}
							});
					} else {
						alert("Number should be 10 digits!");
					}
				} else {
					alert("Passwords doesn't match");
				}
			} else {
				alert("Please write proper email!");
			}
		} else {
			alert("Please fill the boxes!");
		}
	};

	const handleLogin = () => {
		navigate("/login");
	};

	return (
		<Screen>
			<BG src={bg} />
			<Box>
				<IMGtag>
					<IMG src={bg} />
					<Text>
						<p>SIGNUP</p>
					</Text>
				</IMGtag>
				<Signupbox>
					<Name>
						<Title>
							<p>Name</p>
						</Title>
						<Input>
							<InputBox
								value={name}
								onChange={handleChangename}
							/>
						</Input>
					</Name>
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
					<Pwd2>
						<Title>
							<p>Confirm Password</p>
						</Title>
						<Input>
							<InputBox
								type="password"
								value={pwd2}
								onChange={handleChangepwd2}
							/>
						</Input>
					</Pwd2>
					<Num>
						<Title>
							<p>Phone Number</p>
						</Title>
						<Input>
							<InputBox
								// type="number"
								value={num}
								onChange={handleChangenum}
							/>
						</Input>
					</Num>
					<Send>
						<But onClick={handleSignup}>Submit</But>
					</Send>
				</Signupbox>
			</Box>
			<ButSignup onClick={handleLogin}>
				<Sign>LOGIN</Sign>
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
	height: 16.6%;
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

export default Signup;
